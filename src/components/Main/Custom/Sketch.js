import React from 'react'
import Sketch from 'react-p5'
import styled from 'styled-components'

const Container = styled.div`
	width: 100%;
	height: 100%;
	.react-p5 {
		width: 100%;
		height: 100%;
	}
`

export default (props) => {
	let x = 0
	let y = 100
	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(canvasParentRef.clientWidth, canvasParentRef.clientHeight).parent(canvasParentRef)
	}

	const draw = (p5) => {
		p5.background(5)
		p5.ellipse(x, y, 70, 70)
		x++
	}

	return (
		<Container>
			<Sketch setup={setup} draw={draw} />
		</Container>
	)
}
