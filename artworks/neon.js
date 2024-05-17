const canvasSketch = require('canvas-sketch')

const settings = {
  dimensions: [2048, 2048],
  pixelsPerInch: 72,
}

const sketch = () => {
  const POINT_COUNT = 4
  const PALETTE = [
    '#FF53cd',
    '#9461fd',
    '#9461fd',
    '#2dd9fe',
    '#00fe9b',
    '#ffdb4e',
    '#AAFF00',
    '#FFE100',
    '#FF9200',
    '#FF00DC',
    '#00FFD0',
  ]

  const getPoints = () => {
    let points = []

    for (let i = 0; i < POINT_COUNT; i++) {
      points.push({
        x: Math.floor(Math.random() * (settings.dimensions[0] - 200) + 100),
        y: Math.floor(Math.random() * (settings.dimensions[0] - 200) + 100),
      })
    }

    return points
  }

  const fillCirclePoint = (context, point) => {
    context.beginPath()
    context.arc(point.x, point.y, 5, 0, Math.PI * 2, false)
    context.fill()
    context.closePath()
  }

  const strokeCirclePoint = (context, point, radius) => {
    context.beginPath()
    context.arc(point.x, point.y, radius, 0, Math.PI * 2, false)
    context.stroke()
    context.closePath()
  }

  return ({ context, width, height }) => {
    const currentColor = PALETTE[Math.floor(Math.random() * PALETTE.length)]

    context.fillStyle = '#010D00'
    context.fillRect(0, 0, width, height)

    const points = getPoints()

    context.fillStyle = currentColor
    context.strokeStyle = currentColor

    points.forEach((point) => {
      fillCirclePoint(context, point)
      strokeCirclePoint(context, point, 20)
    })

    points.forEach((sourcePoint) => {
      for (let j = 0; j < points.length; j++) {
        context.beginPath()
        context.moveTo(sourcePoint.x, sourcePoint.y)
        const targetPoint = points[j]

        context.lineTo(targetPoint.x, targetPoint.y)
        context.stroke()
        context.closePath()
      }
    })
  }
}

canvasSketch(sketch, settings)
