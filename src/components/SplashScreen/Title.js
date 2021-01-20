import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

import AnimatedText from '../utils/AnimatedText'

const Container = styled.div`
	position: absolute;
	height: 105px;
	top: 62%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	/* mix-blend-mode: difference; */
`

const Title = forwardRef(({}, ref) => {
	let splashTitleTop = useRef(null)
	let splashTitleBottom = useRef(null)

	// Unmount animation
	useImperativeHandle(ref, () => ({
		remove(delay) {
			splashTitleTop.current.remove(delay)
			splashTitleBottom.current.remove(delay)
		},
	}))

	return (
		<Container>
			<AnimatedText text="GENERATIVE" type="splashTitleTop" stagger={0.05} delay={500} ref={splashTitleTop}></AnimatedText>
			<AnimatedText text="TATTOO" type="splashTitleBottom" stagger={0.05} delay={750} ref={splashTitleBottom}></AnimatedText>
		</Container>
	)
})
export default Title
