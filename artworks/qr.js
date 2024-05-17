const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const PALETTE = [
    '#0442BF',
    '#049DD9',
    '#97BF04',
    '#F2CB05',
    '#F21905',
    '#BE18D6',
  ]

  const createGrid = () => {
    const points = []
    const count = 40

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // UV space coordinates for each point - between 0 and 1
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)

        points.push([u, v])
      }
    }

    return points
  }

  const points = createGrid().filter(() => Math.random() > 0.5)
  const margin = 400

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach(([u, v]) => {
      // lerp for linear interpolation allowing for margin
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, 4, 0, Math.PI * 2, false)
      context.strokeStyle = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      context.lineWidth = 25
      context.stroke()
    })
  }
}

canvasSketch(sketch, settings)
