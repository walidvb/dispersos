import * as d3 from 'd3'

function getEdges(rect){
  const x = rect.x.baseVal.value
  const y = rect.y.baseVal.value
  const width = rect.width.baseVal.value
  const height = rect.height.baseVal.value

  return [
    [[x, y], [x+width, y]],
    [[x+width, y], [x+width, y+height]],
    [[x+width, y+height], [x, y+height]],
    [[x, y+height], [x, y]],

  ]
}

function extendEdges(edges){

  return edges.map((edge) => {
    const isHorz = edge[0][1] === edge[1][1]
    if(isHorz){
      return [
        [0, edge[0][1]], 
        [100, edge[1][1]]
      ]
    }
    return [
      [edge[0][0], 0],
      [edge[1][0], 100]
    ]
  })
}

export default function computeLines(ref){

  const rects = d3.select(ref).selectAll('rect').nodes()
  const edgesGrouped = rects.map(getEdges)
  const edges = edgesGrouped.reduce((acc, curr) => [...acc, ...curr], [])
  const infiniteEdges = extendEdges(edges)
  
  return infiniteEdges

}