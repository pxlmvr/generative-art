const canvasSketch = require('canvas-sketch')
const palettes = require('nice-color-palettes')
const random = require('canvas-sketch-util/random')

const { lerp } = require('canvas-sketch-util/math')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const palette = random.pick(palettes)

  const createGrid = () => {
    const points = []
    const count = 40

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // UV space coordinates for each point - between 0 and 1
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)

        const radius = Math.abs(random.noise2D(u, v)) * 0.02

        points.push({
          color: random.pick(palette),
          position: [u, v],
          radius,
        })
      }
    }

    return points
  }

  //random.setSeed(512)
  const points = createGrid().filter(() => random.value() > 0.5)
  const margin = 300

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach((point) => {
      const [u, v] = point.position

      // Linear interpolation allowing for margin
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, point.radius * width, 0, Math.PI * 2, false)
      context.fillStyle = point.color
      context.fill()
    })
  }
}

canvasSketch(sketch, settings)
