import React from 'react'
import Sketch from 'react-p5'

import fontSource from '../assets/fonts/made-outer-sans/made-outer-sans-medium.otf'

export default (props) => {
	let particleFont
	let systemWidth = 500
	let systemHeight = 200
	let particles = []
	let particleSize = 3
	let backgroundColor = 240

	function preload(p5) {
		particleFont = p5.loadFont(fontSource)
	}

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(1080, 720).parent(canvasParentRef)
		p5.background(backgroundColor)

		p5.textSize(100)
		p5.textFont(particleFont)
		p5.textAlign(p5.CENTER, p5.CENTER)
		p5.noStroke()
		p5.text('NOISE', p5.width / 2, p5.height / 2)

		createParticles(p5)
	}

	const draw = (p5) => {
		p5.background(backgroundColor)
		updateParticles(p5)
	}

	function mouseMoved(p5) {
		for (const _particle of particles) {
			if (p5.dist(p5.mouseX, p5.mouseY, _particle.pos.x, _particle.pos.y) < 100 && _particle.type === 'free') {
				let acc = p5.createVector(p5.mouseX, p5.mouseY).sub(_particle.pos)
				_particle.acc = acc.setMag(1).mult(-1)
			}
		}
	}

	function createParticles(p5) {
		let upperLeft = p5.createVector(p5.width / 2 - systemWidth / 2, p5.height / 2 - systemHeight / 2)
		let upperRight = p5.createVector(p5.width / 2 + systemWidth / 2, p5.height / 2 - systemHeight / 2)
		let downLeft = p5.createVector(p5.width / 2 - systemWidth / 2, p5.height / 2 + systemHeight / 2)
		let downRight = p5.createVector(p5.width / 2 + systemWidth / 2, p5.height / 2 + systemHeight / 2)

		p5.stroke('black')
		p5.strokeWeight(particleSize)
		p5.point(upperLeft.x, upperLeft.y)
		p5.point(upperRight.x, upperRight.y)
		p5.point(downLeft.x, downLeft.y)
		p5.point(downRight.x, downRight.y)

		let step = 6
		for (let i = p5.width / 2 - systemWidth / 2; i <= p5.width / 2 + systemWidth / 2; i += step) {
			for (let j = p5.height / 2 - systemHeight / 2; j <= p5.height / 2 + systemHeight / 2; j += step) {
				let color = p5.get(i, j)
				let type
				if (color[0] === backgroundColor) {
					p5.stroke('blue') //
					type = 'free'
				} else {
					p5.stroke('red') //
					type = 'fixed'
				}
				particles.push(new Particle(p5, p5.createVector(i, j), type))
				p5.point(i, j) //
			}
		}
	}

	function updateParticles(p5) {
		p5.strokeWeight(particleSize)
		p5.stroke('black')
		for (const _particle of particles) {
			_particle.applyForce()
			_particle.draw(p5)
		}
	}

	class Particle {
		constructor(p5, pos, type) {
			this.pos = pos
			this.acc = p5.createVector()
			this.vel = p5.createVector()

			this.type = type
		}

		applyForce() {
			this.vel.add(this.acc)
			this.vel.limit(5)
			this.pos.add(this.vel)
		}

		draw(p5) {
			p5.point(this.pos.x, this.pos.y)
		}
	}

	return <Sketch preload={preload} setup={setup} draw={draw} mouseMoved={mouseMoved} />
}
