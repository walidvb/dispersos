import React, { useEffect, useRef, useState } from "react";

// http://bl.ocks.org/mccannf/1629464
// https://observablehq.com/@d3/click-vs-drag?collection=@d3/d3-drag

import "./styles.css";
import * as d3 from "d3";
import { event as currentEvent } from "d3";
import Rect from "./Rect";
import mondrian from './mondrian';
import computeLines from './linesAdder/index';

const width = 600, height = 600

const constraints = [
  {
    w: .2,
    h: .1,
    color: 'blueviolet'
  },
  {
    w: .2,
    h: .4,
    color: 'yellow',
  },
  {
    w: .3,
    h: .3,
    color: '#F7D842',
  },
  {
    w: .2,
    h: .1,
    color: 'red'
  },
  {
    w: .2,
    h: .4,
    color: '#1356A2',
  },
  {
    w: .3,
    h: .3,
    color: '#F7D842',
  },
]


const STROKE_WIDTH = 1

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
        // F2F5F1
        enableBackground
        background={"#F20000"}
      >
        <rect width="100" height="100" fill="#F2F5F1"/>
        {lines.map(l => (
          <line 
            x1={l[0][0]}
            y1={l[0][1]}
            x2={l[1][0]}
            y2={l[1][1]}
            strokeWidth={STROKE_WIDTH}
            stroke={"#000"}
          />
        ))}
        {constraints.map(({ w, h, color }, i) => (
          <Rect
            className="movable"
            width={w/2*100}
            height={h/2*100}
            color={color}
            x={100/i - w*100}
            y={100/i - h*100}
            strokeWidth={STROKE_WIDTH}
            onChange={recomputeLines}
          />
          )
          )}
      </svg>
      <div>
        {JSON.stringify(lines)}
      </div>
    </>
  );
};
