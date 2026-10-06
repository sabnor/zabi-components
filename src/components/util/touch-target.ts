/**
 * Touch targets: 44 by 44px on a coarse pointer, nothing changed on a fine one.
 *
 * There are two ways to get there, and which one a control takes depends on
 * what stands beside it.
 *
 * 1. The control itself grows: `pointer-coarse:min-h-11` (and `min-w-11` for a
 *    square one), written where the size is. Button, IconButton, Input and
 *    Select do this at `sm` and `md`, so a row of them still lines up; so does
 *    any control that has a neighbour close by (the handle and the move
 *    buttons of a SortableList row). `scripts/check-control-geometry.js` holds
 *    the shared controls to it.
 *
 * 2. The control keeps its size and an invisible layer around it takes the
 *    touch: `TOUCH_HIT_AREA` below. Only for a control that stands alone, with
 *    nothing pressable within about 10px: a close button in the corner of an
 *    Alert or in the header of a Modal, the switch of a Toggle. The layer
 *    reaches past the visible box, so beside another control it would cover
 *    that control's edge and a tap there would fire the wrong one. An `xs`
 *    IconButton had such a layer and lost it for that reason. A Toggle is
 *    stacked in settings lists, so its row is 44px tall on a coarse pointer:
 *    the layer of one switch then never reaches the switch above or below.
 */

/**
 * An invisible hit area of at least 44 by 44px, centred on the element, on a
 * coarse pointer only. The element must be positioned (`relative`, `absolute`
 * or `fixed`; `pointer-coarse:relative` where it was not positioned before, so
 * a fine pointer sees no change) and must not clip its overflow.
 */
export const TOUCH_HIT_AREA =
    "pointer-coarse:before:absolute pointer-coarse:before:top-1/2 pointer-coarse:before:left-1/2 pointer-coarse:before:size-full pointer-coarse:before:min-h-11 pointer-coarse:before:min-w-11 pointer-coarse:before:-translate-x-1/2 pointer-coarse:before:-translate-y-1/2 pointer-coarse:before:content-['']";
