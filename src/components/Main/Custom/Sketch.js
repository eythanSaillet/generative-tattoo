import React from 'react'
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

export default function P5Sketch(props) {
	let system

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(500, 200).parent(canvasParentRef)

		system = require('./sketchSystems/disturbedLinesSystem').default
		system.init(p5)
	}

	const draw = (p5) => {}

	return (
		<Container>
			<Sketch setup={setup} draw={draw} />
		</Container>
	)
}
