import React, { forwardRef, useImperativeHandle } from 'react'
import Sketch from 'react-p5'
import styled from 'styled-components'

const Container = styled.div`
	width: 100%;
	height: 100%;
	.react-p5 {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

const P5Sketch = forwardRef(({ delay }, ref) => {
	let system
	let p5Ref

	const setup = (p5, canvasParentRef) => {
		system = require('./sketchSystems/disturbedLinesSystem').default

		p5Ref = p5
		p5.createCanvas(system.canvasWidth, system.canvasHeight).parent(canvasParentRef)

		setTimeout(() => {
			system.init(p5)
		}, delay * 1000)
	}

	const draw = (p5) => {}

	useImperativeHandle(ref, () => ({
		generate() {
			system.generate(p5Ref)
		},

		updateValue(varName, value) {
			system.updateValue(varName, value)
		},
	}))

	return (
		<Container>
			<Sketch setup={setup} draw={draw} />
		</Container>
	)
})
export default P5Sketch
