const canvasSketch = require('canvas-sketch')

const settings = {
  dimensions: [2048, 2048],
  pixelsPerInch: 72,
}

const getPoints = () => {
  let points = []

  for (let i = 0; i < 20; i++) {
    points.push({
      x: Math.floor(Math.random() * (settings.dimensions[0] - 200) + 100),
      y: Math.floor(Math.random() * (settings.dimensions[0] - 200) + 100),
    })
  }

  return points
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#010D00'
    context.fillRect(0, 0, width, height)

    const points = getPoints()

    context.fillStyle = '#F0F2A7'
    points.forEach((point) => {
      context.beginPath()
      context.arc(point.x, point.y, 5, 0, Math.PI * 2, false)
      context.fill()
    })

    context.strokeStyle = '#F0F2A7'

    for (let i = 0; i < points.length; i++) {
      const sourcePoint = points[i]

      context.beginPath()
      context.moveTo(sourcePoint.x, sourcePoint.y)

      for (let j = 0; j < points.length; j++) {
        const targetPoint = points[j]

        context.lineTo(targetPoint.x, targetPoint.y)
        context.stroke()
      }
    }
  }
}

canvasSketch(sketch, settings)
