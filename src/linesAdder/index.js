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

  const rects = d3.select(ref).selectAll('rect').nodes()
  const rectDims = rects.map(getRectDimensions)
  const edges = rectDims.map(getEdges).reduce((acc, curr) => [...acc, ...curr], [])
  const infiniteEdges = extendEdges(edges)
  return infiniteEdges

  function getEdges(rect) {
    const { x, y, width, height } = rect
    // TODO: don't use transform on the rects
    return [
      [[x, y], [x + width, y], rect],
      [[x + width, y], [x + width, y + height], rect],
      [[x + width, y + height], [x, y + height], rect],
      [[x, y + height], [x, y], rect],
    ]
  }

  function extendEdges(edges) {
    return edges.map((edge) => {
      const isHorz = edge[0][1] === edge[1][1]
      let newEdge
      const rdm = Math.random()
      const cut = rdm < .25 ? 'top' : (rdm < .5 ? 'left' : false) 
      if (isHorz) {
        newEdge = [
          [0, edge[0][1]],
          [100, edge[1][1]],
        ]
        return cutIfIntersectX(newEdge, edge[2])
      }
      else{
        newEdge = [
          [edge[0][0], 0],
          [edge[1][0], 100],
        ]
        return cutIfIntersectY(newEdge, edge[2])
      }
    })
  }

  function cutIfIntersectX(edge, self){
    const [[, y1], [, y2]] = edge
    if(y1 !== y2){
      throw Error('is not horizontal', edge)
    }

    rectDims.forEach((r) => {
      if (r !== self && y1 > r.y && y1 < r.y + r.height ){
        const position = relativePosition(r, self)
        if(position.x === 'left'){
          edge[0][0] = r.x + r.width
        }
        else{
          edge[1][0] = r.x
        }
      }
    })
    return edge
  }

  function cutIfIntersectY(edge, self){
    const [[x1], [x2]] = edge
    if (x1 !== x2) {
      throw Error('is not vert', edge)
    }
    rectDims.forEach((r) => {
      if (r !== self && x1 > r.x && x1 < r.x + r.width) {
        const position = relativePosition(r, self)
        if (position.y === 'top') {
          edge[0][1] = r.y + r.height
        }
        else {
          edge[1][1] = r.y
        }
      }
    })
    return edge
  }

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