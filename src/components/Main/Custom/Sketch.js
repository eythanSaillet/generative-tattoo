import React, { useRef, forwardRef, useImperativeHandle } from 'react'
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
	const system = useRef(null)
	const p5Ref = useRef(null)

	const setup = (p5, canvasParentRef) => {
		system.current = require('./sketchSystems/disturbedLinesSystem').default

		p5Ref.current = p5
		p5.createCanvas(system.current.canvasWidth, system.current.canvasHeight).parent(canvasParentRef)

		setTimeout(() => {
			system.current.init(p5)
		}, delay * 1000)
	}

	const draw = (p5) => {}

	useImperativeHandle(ref, () => ({
		generate() {
			system.current.generate(p5Ref.current)
		},

		updateValue(varName, value) {
			system.current.updateValue(varName, value)
		},
	}))

	return (
		<Container>
			<Sketch setup={setup} draw={draw} />
		</Container>
	)
})
export default P5Sketch
