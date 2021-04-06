let disturbedLinesSystem = {
	canvasWidth: 500,
	canvasHeight: 200,

	// SYSTEM PROPERTIES
	numberOfLines: 23,
	stepBetweenLines: 23,
	factorIncrementation: 20,
	lineWeight: 2,

	timeInterval: 100,

	// SYSTEM VAR
	origin: { x: 10, y: -2 },
	xMax: 0,
	point: {},
	tempPoint: {},

	// GENERATION FUNCTION VAR
	lineCounter: 0,
	finishToGenerate: true,

	// REVERS OPTION VAR
	reverse: true,
	lines: [],
	finishToGenerateReverse: true,
	reverseColor: '#ff0000',

	// NOISE PROPERTIES
	noiseSeed: '',
	previousSeed: '',
	noiseScale: 0.008,
	noiseFactor: 0,

	init(p5) {
		p5.pixelDensity(2.0)

		// this.generate(p5)
	},

	generate(p5) {
		if (this.finishToGenerate && this.finishToGenerateReverse) {
			this.finishToGenerate = false

			// RESET VALUES
			this.noiseSeed === '' ? p5.noiseSeed(p5.random(99999)) : p5.noiseSeed(this.noiseSeed)
			this.point = {}
			this.tempPoint = {}
			this.origin = { x: 10, y: -2 }
			this.noiseFactor = 0
			p5.background(0)

			// SET GENERATION INTERVAL
			this.timeInterval = this.previousSeed === this.noiseSeed ? 0 : 50
			this.previousSeed = this.noiseSeed

			// RESET REVERSE VALUE
			this.lines = []

			p5.resizeCanvas(this.canvasWidth, this.canvasHeight)

			// REDRAW LINES
			this.drawLines(p5)
		}
	},

	drawLines(p5) {
		this.lineCounter = 0
		let drawLineInterval = () => {
			if (this.lineCounter < this.numberOfLines) {
				setTimeout(() => {
					this.drawLine(p5)
					this.origin.x += this.stepBetweenLines
					this.noiseFactor += this.factorIncrementation
					this.lineCounter++
					drawLineInterval()
				}, this.timeInterval)
			} else {
				this.finishToGenerate = true
				// if(this.reverse)
				// {
				//     this.finishToGenerateReverse = false
				//     this.drawReverse()
				// }
			}
		}
		drawLineInterval()
	},

	drawLine(p5) {
		p5.noFill()
		p5.stroke(255)
		p5.strokeWeight(this.lineWeight)

		let tab = []

		p5.beginShape()
		for (let i = 0; i < this.canvasHeight; i = i + 5) {
			this.point.y = i + this.origin.y
			this.point.x = p5.noise(i * this.noiseScale) * this.noiseFactor + this.origin.x

			p5.curveVertex(this.tempPoint.x, this.tempPoint.y, this.point.x, this.point.y)

			// SAVE LINE FOR REVERSE OPTION
			tab.push(this.point.x)

			this.tempPoint.x = this.point.x
			this.tempPoint.y = this.point.y
		}
		p5.endShape()

		// PUSHING LINE IN THE LINES ARRAY
		this.lines.push(tab)
	},

	drawReverse(p5) {
		p5.noFill()
		p5.stroke(this.reverseColor)
		p5.strokeWeight(this.lineWeight)

		let i = this.lines.length - 1
		// let step = 0
		let drawLineInterval = () => {
			if (i >= 0) {
				setTimeout(() => {
					// Draw lines
					p5.beginShape()
					for (let j = 0; j < this.canvasHeight; j++) {
						this.point.x = this.lines[i][j] + this.origin.x
						this.point.y = j * 5 + this.origin.y

						p5.curveVertex(this.tempPoint.x, this.tempPoint.y, this.point.x, this.point.y)

						this.tempPoint.x = this.point.x
						this.tempPoint.y = this.point.y
						// curveVertex()
					}
					p5.endShape()

					// Update values
					this.origin.x += this.stepBetweenLines
					this.noiseFactor -= this.factorIncrementation
					i--
					// step++
					drawLineInterval()
				}, this.timeInterval)
			} else {
				this.finishToGenerateReverse = true
			}
		}
		drawLineInterval()
	},

	updateValue(varName, value) {
		this[varName] = parseFloat(value)
	},

	save(p5) {
		p5.saveCanvas('disturbedLines', 'png')
	},
}
export default disturbedLinesSystem
