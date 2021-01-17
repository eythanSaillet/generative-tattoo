import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import AnimatedText from '../utils/AnimatedText'

const Container = styled.div`
	position: absolute;
	top: 62%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* mix-blend-mode: difference; */
`

export default function Title() {
	let splashTitleTop = useRef(null)
	let splashTitleBottom = useRef(null)
	useEffect(() => {
		setTimeout(() => {
			splashTitleTop.current.remove()
			splashTitleBottom.current.remove()
		}, 3000)
	})
	return (
		<Container>
			<AnimatedText text="GENERATIVE" type="splashTitleTop" stagger={0.05} delay={500} ref={splashTitleTop}></AnimatedText>
			<AnimatedText text="TATTOO" type="splashTitleBottom" stagger={0.05} delay={750} ref={splashTitleBottom}></AnimatedText>
		</Container>
	)
}
