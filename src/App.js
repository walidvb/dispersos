import React, { useEffect, useRef } from "react";

// http://bl.ocks.org/mccannf/1629464
// https://observablehq.com/@d3/click-vs-drag?collection=@d3/d3-drag

import "./styles.css";
import * as d3 from "d3";
import { event as currentEvent } from "d3";
import Rect from "./Rect";
import mondrian from './mondrian';

const width = 600, height = 600

const constraints = [
  {
    w: .2,
    h: .1,
  },
  {
    w: .2,
    h: .4,
  },
  {
    w: .3,
    h: .3,
  }
]


export default () => {
  const ref = useRef();
  //const [isClicked, setIsClicked] = useState(false)
  const squares = mondrian({ width: 100, height: 100 }, constraints)

  return (
    <>
      <svg 
        ref={ref} 
        viewBox="0 0 100 100"
        width={width}
        height={height}
      >
        {squares.map((s) => <Rect {...s} />)}
      </svg>
      {/* <div>
        {JSON.stringify(squares)}
      </div> */}
    </>
  );
};
