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

export default function computeLines(ref){

  const rects = d3.select(ref).selectAll('rect').nodes()

  const edges = rects.map(getEdges)
  console.log(rects)
  return edges.reduce((acc, curr) => [...acc, ...curr], [])

}