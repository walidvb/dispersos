import React, { useEffect, useRef } from "react";

// http://bl.ocks.org/mccannf/1629464
// https://observablehq.com/@d3/click-vs-drag?collection=@d3/d3-drag

import "./styles.css";
import * as d3 from "d3";
import { event as currentEvent } from "d3";
import Rect from "./Rect";
import mondrian from './mondrian';

const width = 310, height = 260

export default () => {
  const ref = useRef();
  //const [isClicked, setIsClicked] = useState(false)
  const squares = mondrian({ width: 300, height: 250 })
  console.log(squares)
  return (
    <svg 
      ref={ref} 
      viewBox="0 0 300 250"
      width={width}
      height={height}
    >
      {squares.map((s) => <Rect {...s} />)}
    </svg>
  );
};
