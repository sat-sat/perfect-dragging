# Simple example of dragging svg rect elements

Inspired by [steveruizok's "Perfect Dragging"](https://www.steveruiz.me/posts/perfect-dragging)


## Dragging
- Mouse down event will determine if you're about to drag an element.
- Mouse move event will set state of currently dragging element. This also renders the dragged element last in the DOM tree so the "z-index" will always be the "highest".
- Mouse up event will release the dragging state