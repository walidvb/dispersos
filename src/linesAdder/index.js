import * as d3 from 'd3'


function getRectDimensions(rect){
  let transform = [0, 0]
  try {
    transform = /\((.*)\)/.exec(rect.attributes.transform.value)[1].split(',').map(parseFloat)
  }
  catch (err) {}
  const [dx, dy] = transform

  return {
    x: rect.x.baseVal.value + dx,
    y: rect.y.baseVal.value + dy,
    width: rect.width.baseVal.value,
    height: rect.height.baseVal.value,
    color: rect.attributes.fill.value,
  }
}

export default function computeLines(ref){

  const d3Rects = d3.select(ref).selectAll('rect.movable').nodes()
  const rectDims = d3Rects.map(getRectDimensions)
  const edges = rectDims.map(getEdges)
  const infiniteEdges = extendEdges(edges)
  return infiniteEdges.reduce((acc, curr) => [...acc, ...curr], [])

  function getEdges(rect) {
    const { x, y, width, height } = rect
    return {
      rect,
      edges: [
        [[x, y], [x + width, y], rect],
        [[x + width, y], [x + width, y + height], rect],
        [[x, y + height], [x + width, y + height], rect],
        [[x, y], [x, y + height], rect],
      ]
    }
  }

  function extendEdges(rects) {
    const cuts = ['left', 'right', 'top', 'bottom', 'vert', 'horz']
    // let cutCounts = 0
    return rects.map(({ rect, edges }) => {
      const otherRects = rects.filter(r => r.rect !== rect)
      // set whether or not to extend the edges
      const chance = .4
      const allowCut = Math.random() > chance // + .5 * (cutCounts / rects.length*4 )); // reduce chance to cut as you add more cuts
      // choose one of the cut direction
      const cut = allowCut ? cuts[Math.floor(Math.random() * cuts.length)] : undefined
      // if(cut){ cutCounts++ }

      return [...edges].map((edge) => {
        const isHorz = edge[0][1] === edge[1][1]
        return isHorz ? cutIfIntersectX([...edge]) : cutIfIntersectY([...edge])
      })

      function cutIfIntersectX(edge){
        if(cut === 'horz'){ return edge }
        const [[, y1]] = edge

        // extend to svg edges
        edge[0][0] = 0
        edge[1][0] = 100

        // TODO: handle having 2 neighbours
        otherRects.forEach(function checkIntersections({ rect: r }){
          if (y1 > r.y && y1 < r.y + r.height ){
            const pos = relativePosition(r, rect)
            if(pos.x === 'left'){
              edge[0][0] = r.x + r.width
            }
            else{
              edge[1][0] = r.x
            }
          }
        })
        // if cut, reset to rectangle
        if(cut === 'left'){ edge[1][0] = rect.x }
        if(cut === 'right'){ edge[1][0] = rect.x + rect.width }

        return edge
      }
    
      function cutIfIntersectY(edge){
        if (cut === 'vert') { return edge }
        const [[x1]] = edge
        // make infinite

        edge[0][1] = 0
        edge[1][1] = 100

        otherRects.forEach(function checkIntersections({ rect: r }) {
          if (x1 > r.x && x1 < r.x + r.width) {
            const pos = relativePosition(r, rect)
            if (pos.y === 'top') {
              edge[0][1] = r.y + r.height
            }
            else {
              edge[1][1] = r.y
            }
          }
        })
        if (cut === 'top') { edge[1][1] = rect.y }
        if (cut === 'bottom') { edge[1][1] = rect.y + rect.height }

        return edge
      }
    })
  }
  

  // this doesn't account for rectangle size
  // as they shouldn't overlap anyways
  function relativePosition(
    { x: x1, y: y1, w1, h1}, 
    { x: x2, y: y2, w2, h2}, 
  ){
    return{
      x: x1 < x2 ? 'left' : 'right',
      y: y1 < y2 ? 'top' : 'bottom',
    }
  }
}