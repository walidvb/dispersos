import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

let cursorPos;
export default ({ 
  width, 
  height, 
  x, 
  y,
  color = "#F2F5F1",
  className,
  strokeWidth,
  onChange,
}) => {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const rect = d3.select(ref.current);
    const drag = d3
      .drag()
      .on("start", function (event) {
        const t = d3.pointers(event, this);
        const pointerposition = [
          d3.mean(t, (d) => d[0]),
          d3.mean(t, (d) => d[1])
        ];
        cursorPos = pointerposition;
      })
      .on("drag", function (d) {
        const dx = d.x - cursorPos[0];
        const dy = d.y - cursorPos[1];
        d3.select(this).raise().attr("transform", `translate(${dx}, ${dy})`);
        // d3.select(this).raise().attr("x", d.x + dx);
        // d3.select(this).raise().attr("y", d.y + dy);
        onChange()
      })
      .on("end", () => (cursorPos = null));
    drag(rect);
  }, []);

  return <rect 
    ref={ref}
    className={className}
    strokeWidth={strokeWidth} 
    stroke={'black'} 
    x={x} 
    y={y} 
    width={width} 
    height={height} 
    fill={color} 
  />;
};
