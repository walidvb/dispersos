import React, { useEffect, useRef } from "react";

// http://bl.ocks.org/mccannf/1629464
// https://observablehq.com/@d3/click-vs-drag?collection=@d3/d3-drag

import "./styles.css";
import * as d3 from "d3";
import { event as currentEvent } from "d3";
import Rect from "./Rect";

export default () => {
  const ref = useRef();
  //const [isClicked, setIsClicked] = useState(false)

  return (
    <svg ref={ref} viewBox="0 0 300 250">
      <Rect />
      <Rect fill="#001100"/>
    </svg>
  );
};
