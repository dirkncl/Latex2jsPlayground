import { selection } from "../../../d3-selection/src/index.js";

import selection_interrupt from "./interrupt.js";
import selection_transition from "./transition.js";

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;
