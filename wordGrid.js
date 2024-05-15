const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const createGrid = () => {
    const points = []
    const count = 5

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

  const points = createGrid()
  const margin = 400

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach(([u, v]) => {
      // lerp for linear interpolation allowing for margin
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, 20, 0, Math.PI * 2, false)
      context.strokeStyle = '#000'
      context.lineWidth = 20
      context.stroke()
    })
  }
}

canvasSketch(sketch, settings)