import * as React from 'react'
import { Shape } from './types'

const add = (a: number[], b: number[]) => [a[0] + b[0], a[1] + b[1]]
const sub = (a: number[], b: number[]) => [a[0] - b[0], a[1] - b[1]]

export default function App() {
  const [shapes, setShapes] = React.useState<Record<string, Shape>>({
    a: {
      id: 'a',
      point: [200, 200],
      size: [100, 100]
    },
    b: {
      id: 'b',
      point: [320, 200],
      size: [100, 100]
    },
    c: {
      id: 'c',
      point: [50, 70],
      size: [100, 100]
    }
  })

  const rDragging = React.useRef<{
    shape: Shape;
    origin: number[]
  } | null>(null)

  function onPointerDown(e: React.PointerEvent<SVGElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)

    const id = e.currentTarget.id
    const point = [e.clientX, e.clientY]

    rDragging.current = {
      shape: {...shapes[id]},
      origin: point
    }
  }

  function onPointerMove(e: React.PointerEvent<SVGElement>) {
    const dragging = rDragging.current

    if (!dragging) return;

    const shape = shapes[dragging.shape.id]
    const point = [e.clientX, e.clientY]
    const delta = sub(point, dragging.origin)

    let restShapes: any = {}
    Object.values(shapes).forEach(s => {
      if (s.id === shape.id) return
      restShapes[s.id] = s
    })

    setShapes({
      ...restShapes,
      [shape.id]: {
        ...shape,
        point: add(dragging.shape.point, delta)
      }
    })
  }

  function onPointerUp(e: React.PointerEvent<SVGElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId)
    rDragging.current = null
  }

  return (
    <svg className='canvas'>
      {Object.values(shapes).map(shape => (
        <rect
          key={shape.id}
          id={shape.id}
          x={shape.point[0]}
          y={shape.point[1]}
          width={shape.size[0]}
          height={shape.size[1]}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      ))}
    </svg>
  )
}
