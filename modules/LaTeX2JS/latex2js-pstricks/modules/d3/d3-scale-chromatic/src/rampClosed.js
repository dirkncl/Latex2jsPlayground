import { scaleSequential } from "../../d3-scale/src/index.js";
import { interpolateRgbBasisClosed } from "../../d3-interpolate/src/index.js";

import colors from "./colors.js";

export default function(range) {
  var s = scaleSequential(interpolateRgbBasisClosed(colors(range))).clamp(true);
  delete s.clamp;
  return s;
}
