import { interpolateRgbBasis } from "../../d3-interpolate/src/index.js";

export default scheme => interpolateRgbBasis(scheme[scheme.length - 1]);
