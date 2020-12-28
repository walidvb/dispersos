import React, { useEffect, useRef, useState } from "react";

// http://bl.ocks.org/mccannf/1629464
// https://observablehq.com/@d3/click-vs-drag?collection=@d3/d3-drag

import "./styles.css";
import * as d3 from "d3";
import { event as currentEvent } from "d3";
import Rect from "./Rect";
import mondrian from './mondrian';
import computeLines from './linesAdder/index';

const width = 310, height = 310

const constraints = [
  {
    w: .2,
    h: .1,
    color: '#D40920'
  },
  // {
  //   w: .2,
  //   h: .4,
  //   color: '#1356A2',
  // },
  // {
  //   w: .3,
  //   h: .3,
  //   color: '#F7D842',
  // }
]


export default () => {
  const ref = useRef();
  // const [isClicked, setIsClicked] = useState(false)
  const [lines, setLines] = useState([])

  const recomputeLines = () => setLines(computeLines(ref.current))
  useEffect(() => {
    setLines(computeLines(ref.current))
  }, [])
  return (
    <>
      <svg 
        ref={ref} 
        viewBox="0 0 100 100"
        width={width}
        height={height}
      >
        {constraints.map(({ w, h, color }, i) => (
          <Rect 
            width={w*100}
            height={h*100}
            color={color}
            x={100/i - w*100}
            y={100/i - h*100}
            onChange={recomputeLines}
          />
          )
          )}
          {lines.map(l => (
            <line 
              x1={l[0][0]}
              y1={l[0][1]}
              x2={l[1][0]}
              y2={l[1][1]}
              strokeWidth={2}
              stroke={"#00FF00"}
            />
          ))}
      </svg>
      <div>
        {JSON.stringify(lines)}
      </div>
    </>
  );
};
