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
	let p5Ref = 3

	const setup = (p5, canvasParentRef) => {
		p5Ref = p5
		p5.createCanvas(500, 200).parent(canvasParentRef)

		system = require('./sketchSystems/disturbedLinesSystem').default

		setTimeout(() => {
			system.init(p5)
		}, delay * 1000)
	}

	const draw = (p5) => {}

	useImperativeHandle(ref, () => ({
		generate() {
			console.log('generate')
			system.generate(p5Ref)
		},
	}))

	return (
		<Container>
			<Sketch setup={setup} draw={draw} />
		</Container>
	)
})
export default P5Sketch
