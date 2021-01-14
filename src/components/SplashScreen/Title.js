import React from 'react'
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
	return (
		<Container>
			<AnimatedText text="GENERATIVE" type="splashTitleTop" stagger={0.05} delay={500}></AnimatedText>
			<AnimatedText text="TATTOO" type="splashTitleBottom" stagger={0.05} delay={750}></AnimatedText>
		</Container>
	)
}
