import React from 'react'
import Sketch from 'react-p5'

import fontSource from '../assets/fonts/made-outer-sans/made-outer-sans-medium.otf'

export default (props) => {
	let particleFont
	let systemWidth = 500
	let systemHeight = 200
	let particles = []
	let particleSize = 2
	let backgroundColor = 255
	let mouse

	function preload(p5) {
		particleFont = p5.loadFont(fontSource)
	}

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(1000, 500).parent(canvasParentRef)
		p5.background(backgroundColor)
		// p5.frameRate(30)

		// Draw the text we are going to use to create the particles
		p5.textSize(100)
		p5.textFont(particleFont)
		p5.textAlign(p5.CENTER, p5.CENTER)
		p5.noStroke()
		p5.text('NOISE', p5.width / 2, p5.height / 2)

		mouse = p5.createVector()

		createParticles(p5)
	}

	const draw = (p5) => {
		p5.background(backgroundColor)
		updateMouseVector(p5)
		updateParticles(p5)
	}

	function updateMouseVector(p5) {
		mouse.x = p5.mouseX
		mouse.y = p5.mouseY
	}

	function createParticles(p5) {
		// Every *step pixels, create a particle. Its type depends on the pixel color.
		let step = 5
		for (let i = p5.width / 2 - systemWidth / 2; i <= p5.width / 2 + systemWidth / 2; i += step) {
			for (let j = p5.height / 2 - systemHeight / 2; j <= p5.height / 2 + systemHeight / 2; j += step) {
				let color = p5.get(i, j)
				let type
				if (color[0] === backgroundColor) {
					type = 'free'
				} else {
					type = 'fixed'
				}
				particles.push(new Particle(p5, p5.createVector(i, j), type))
			}
		}
	}

	function updateParticles(p5) {
		p5.strokeWeight(particleSize)
		p5.stroke('black')
		for (const _particle of particles) {
			if (_particle.type === 'free') {
				_particle.applyForce(p5)
			}
			_particle.draw(p5)
		}
	}

	class Particle {
		constructor(p5, pos, type) {
			this.origin = p5.createVector(pos.x, pos.y)
			this.pos = pos
			this.acc = p5.createVector()
			this.vel = p5.createVector()

			this.type = type

			this.maxSpeed = 10
			this.maxForce = 0.5
			this.brakeRadius = 100
			this.mouseForceRadius = 75
			this.mouseForce = 0.04
		}

		originAttraction(p5) {
			// Define target
			let target = p5.createVector(this.origin.x, this.origin.y).sub(this.pos)

			// Reduce speed when the particle come near its origin
			let dist = target.mag()
			let factor = this.maxSpeed
			if (dist < this.brakeRadius) {
				factor = p5.map(dist, 0, this.brakeRadius, 0, this.maxSpeed)
			}
			target.setMag(factor)

			// Return force
			let steering = p5.createVector(target.x, target.y).sub(this.vel)
			steering.limit(this.maxForce)
			return steering
		}

		applyForce(p5) {
			this.acc.add(this.originAttraction(p5))
			this.acc.add(this.mouseRepulsion(p5))

			this.vel.add(this.acc)
			this.acc.mult(0)
			this.pos.add(this.vel)
		}

		mouseRepulsion(p5) {
			// Define target
			let target = p5.createVector(mouse.x, mouse.y).sub(this.pos)

			// Apply the force within a certain distance
			let dist = target.mag()
			if (dist < this.mouseForceRadius) {
				let steering = p5.createVector(target.x, target.y).sub(this.vel)
				steering.mult(-this.mouseForce)
				return steering
			}
			return p5.createVector(0, 0)
		}

		draw(p5) {
			p5.point(this.pos.x, this.pos.y)
		}
	}

	return <Sketch preload={preload} setup={setup} draw={draw} />
}
