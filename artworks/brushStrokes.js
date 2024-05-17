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
    const count = 70

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)

        const radius = Math.abs(random.noise2D(u, v)) * 0.1
        const rotation = random.noise2D(u, v)

        points.push({
          color: random.pick(palette),
          position: [u, v],
          radius,
          rotation,
          symbol: '=',
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

      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.save()

      context.fillStyle = point.color
      context.font = `${point.radius * width}px "Helvetica"`
      context.translate(x, y)
      context.rotate(point.rotation)
      context.fillText(point.symbol, 0, 0)

      // Restore previous state to get rid of rotation
      context.restore()
    })
  }
}

canvasSketch(sketch, settings)
