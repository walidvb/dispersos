

function splitSquaresWith(coordinates, squares){
  const { x, y } = coordinates

  return squares.reduce((acc, square) => {
    let sq = square
    if(Math.random() > .5){
      if(x && x > sq.x && x < sq.x + sq.width) {
        sq = splitOnX(sq, x)
      }
      if(y && y > sq.y && y < sq.y + sq.height){
        sq = splitOnY(sq, y)
      }
    }
    sq = Array.isArray(sq) ? sq : [sq]
    return [...acc, ...sq]
  }, [])
}

function splitOnX(square, splitAt){
  return [
    {
      x: square.x,
      y: square.y,
      width: square.width - (square.width - splitAt + square.x),
      height: square.height
    },
    {
      x: splitAt,
      y: square.y,
      width: square.width - splitAt + square.x,
      height: square.height
    }
  ]
}

function splitOnY(square, splitAt){
  return [
    {
      x: square.x,
      y: square.y,
      width: square.width,
      height: square.height - (square.height - splitAt + square.y)
    },
    {
      x: square.x,
      y: splitAt,
      width: square.width,
      height: square.height - splitAt + square.y
    }
  ]
}

function addColors(squares){
  const white = "#F2F5F1"
  const colors = ['#D40920', '#1356A2', '#F7D842']
  const colored = [...squares]
  colors.forEach((c) => {
    colored[Math.floor(Math.random() * colored.length)].color = c;
  })
  return colored
}

const createSquares = ({ width, height }) => {
  const step = width / 6
  let squares = [{
    x: 0, 
    y: 0,
    width: width,
    height: height,
  }]
  for(let i = 0; i < width; i += step){
    squares = splitSquaresWith({
      x: i,
    }, squares)
    squares = splitSquaresWith({
      y: i,
    }, squares)
  }

  squares = addColors(squares)
  return squares
}

export default createSquares