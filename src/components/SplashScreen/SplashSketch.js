import React from 'react'
import Sketch from 'react-p5'

import fontSource from '../../assets/fonts/made-outer-sans/made-outer-sans-medium.otf'

export default function SplashSketch() {
	let particleFont
	let systemWidth = 550
	let systemHeight = 150
	let particles = []
	let particleSize = 2
	let backgroundColor = 0
	let mouse

	function preload(p5) {
		particleFont = p5.loadFont(fontSource)
	}

	const setup = (p5, canvasParentRef) => {
		// p5.createCanvas(1000, 500).parent(canvasParentRef)
		p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
		p5.background(backgroundColor)
		// p5.frameRate(30)

		// Draw the text we are going to use to create the particles
		p5.textSize(100)
		p5.textFont(particleFont)
		p5.textAlign(p5.CENTER, p5.CENTER)
		p5.noStroke()
		p5.text('TATTOO', p5.width / 2 - 25, p5.height / 2 - 15)

		mouse = p5.createVector()

		createParticles(p5)
	}

	let index = 0
	let fps = 0
	const draw = (p5) => {
		p5.background(backgroundColor)
		updateMouseVector(p5)
		updateParticles(p5)

		// Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
		if (index === 10) {
			fps = p5.frameRate()
			index = 0
		}
		p5.fill(255)
		p5.stroke(0)
		p5.textSize(20)
		p5.text('FPS: ' + fps.toFixed(2), 100, 100)
		index++
	}

	function updateMouseVector(p5) {
		mouse.x = p5.mouseX
		mouse.y = p5.mouseY
	}

	function createParticles(p5) {
		// Every *step pixels, create a particle. Its type depends on the pixel color.
		let step = 6
		for (let i = p5.width / 2 - systemWidth / 2; i <= p5.width / 2 + systemWidth / 2; i += step) {
			for (let j = p5.height / 2 - systemHeight / 2; j <= p5.height / 2 + systemHeight / 2; j += step) {
				let color = p5.get(i, j)
				let type
				if (color[0] === backgroundColor) {
					type = 'free'
				} else {
					type = 'fixed'
				}
				particles.push(new Particle(p5, { x: i, y: j }, type))
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
			this.origin = {
				x: pos.x,
				y: pos.y,
			}
			this.pos = pos
			this.acc = {
				x: 0,
				y: 0,
			}
			this.vel = {
				x: 0,
				y: 0,
			}

			this.type = type

			this.maxSpeed = 10
			this.maxForce = 0.5
			this.brakeRadius = 100
			this.mouseForceRadius = 85
			this.mouseForce = 0.04

			this.color = 255
		}

		originAttraction(p5) {
			// Define target
			let target = {
				x: this.origin.x - this.pos.x,
				y: this.origin.y - this.pos.y,
			}

			// Reduce speed when the particle come near its origin
			let dist = Math.sqrt(Math.pow(target.x, 2) + Math.pow(target.y, 2))
			let factor = this.maxSpeed
			if (dist < this.brakeRadius) {
				// Map factor from dist
				let temp = (dist - 0) / (this.brakeRadius - 0)
				factor = 0 + temp * (this.maxSpeed - 0)
			}

			// Set new mag with the target
			if (dist !== 0) {
				target.x = (target.x * factor) / dist
				target.y = (target.y * factor) / dist
			}

			// Define steering force
			let steering = {
				x: target.x - this.vel.x,
				y: target.y - this.vel.y,
			}

			// Limit the magnitude of the force
			let mag = Math.sqrt(Math.pow(steering.x, 2) + Math.pow(steering.y, 2))
			if (mag > this.maxForce) {
				steering.x = (steering.x * this.maxForce) / mag
				steering.y = (steering.y * this.maxForce) / mag
			}

			return steering
		}

		applyForce(p5) {
			// Add attraction force to acceleration
			let attractionForce = this.originAttraction(p5)
			this.acc.x += attractionForce.x
			this.acc.y += attractionForce.y

			// Add repulsion force to acceleration
			let repulsionForce = this.mouseRepulsion(p5)
			this.acc.x += repulsionForce.x
			this.acc.y += repulsionForce.y

			// Add acceleration to velocity
			this.vel.x += this.acc.x
			this.vel.y += this.acc.y

			// Reset acceleration
			this.acc.x = 0
			this.acc.y = 0

			// Add velocity to position
			this.pos.x += this.vel.x
			this.pos.y += this.vel.y
		}

		mouseRepulsion(p5) {
			// Define target
			let target = {
				x: mouse.x - this.pos.x,
				y: mouse.y - this.pos.y,
			}

			// Calculate and apply the force within a certain distance
			let dist = Math.sqrt(Math.pow(target.x, 2) + Math.pow(target.y, 2))
			if (dist < this.mouseForceRadius) {
				// Define steering force
				let steering = {
					x: target.x - this.vel.x,
					y: target.y - this.vel.y,
				}
				steering.x *= -this.mouseForce
				steering.y *= -this.mouseForce
				return steering
			}
			return { x: 0, y: 0 }
		}

		draw(p5) {
			p5.stroke(this.color)
			p5.point(this.pos.x, this.pos.y)
		}
	}

	return <Sketch preload={preload} setup={setup} draw={draw} />
}
