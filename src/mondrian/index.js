const constraints = [
  {
    w: .1,
    h: .1,
  },
  {
    w: .2,
    h: .2,
  },
  {
    w: .3,
    h: .3,
  }
]

function mondrian({ width, height }){
  function pointIsInSquare({ x, y }, sq){
    const xIn = x && x >= sq.x && x <= sq.x + sq.width
    const yIn = y && y >= sq.y && y <= sq.y + sq.height

    return {
      x: x && xIn,
      y: y && yIn,
    }
  }

  function splitSquaresWith(coordinates, squares){
    const { x, y } = coordinates
    return squares.reduce((acc, square) => {
      let sq = square
      const isIn = pointIsInSquare({ x, y }, sq)
      if(isIn.x) {
        sq = splitOnX(sq, x)
      }
      if(isIn.y){
        sq = splitOnY(sq, y)
      }
      sq = Array.isArray(sq) ? sq : [sq]
      return [...acc, ...sq]
    }, [])
  }

  function splitOnX(square, splitAt){
    return [
      {
        ...square,
        width: +(square.width - (square.width - splitAt + square.x)).toFixed(4),
      },
      {
        ...square,
        x: splitAt,
        width: +(square.width - splitAt + square.x).toFixed(4),
      }
    ]
  }

  function splitOnY(square, splitAt){
    return [
      {
        ...square,
        height: +(square.height - (square.height - splitAt + square.y)).toFixed(4),
      },
      {
        ...square,
        y: splitAt,
        height: +(square.height - splitAt + square.y).toFixed(4)
      }
    ]
  }

  function addColors(squares, constraints){
    const white = "#F2F5F1"
    const colors = ['#D40920', '#1356A2', '#F7D842']
    return squares.map(sq => {
      const isInConstraint = constraints.reduce((acc, { w, h }) => (
        acc ||
        (sq.width === w && sq.height === h)
      ), false)
      if(isInConstraint){
        return {
          ...sq,
          color: colors.pop()
        }
      }
      return {
        ...sq,
        color: white,
      }
    })
  }

  const createSquares = () => {
    let stepWitoutConstraints = {
      w: +(1 - constraints.reduce((acc, b) => acc + b.w, 0)).toFixed(4),
      h: +(1 - constraints.reduce((acc, b) => acc + b.h, 0)).toFixed(4),
    }
    let steps = [...constraints, stepWitoutConstraints]
    let squares = [{
      x: 0, 
      y: 0,
      width: 1,
      height: 1,
    }]
    let currPos = {
      x: 0,
      y: 0,
    }

    for(let i = 0; i < steps.length - 1; ++i){
      currPos.x += steps[i].w
      currPos.y += steps[i].h
      squares = splitSquaresWith({
        x: +(currPos.x.toFixed(4)),
      }, squares)
      squares = splitSquaresWith({
        y: +(currPos.y.toFixed(4)),
      }, squares)
    }

    squares = addColors(squares, constraints)
    return squares
  }

  return createSquares().map(sq => ({
    ...sq,
    x: sq.x*width,
    y: sq.y*width,
    width: width*sq.width,
    height: height*sq.height,
  }))
}

export default mondrian



/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}