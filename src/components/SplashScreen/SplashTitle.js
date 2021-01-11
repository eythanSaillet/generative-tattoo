import React from 'react'
import styled from 'styled-components'

import AnimatedText from '../utils/AnimatedText'

const Title = styled.h1`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #444444;
	font-family: 'Made Outer Sans Regular';
	font-size: 3vw;
	letter-spacing: 70px;
`

export default function SplashTitle() {
	return <Title>{/* <AnimatedText text="INFOS" type="navLink" stagger={-0.05} delay={500} hover={true}></AnimatedText>
			<AnimatedText text="INFOS" type="navLink" stagger={-0.05} delay={500} hover={true}></AnimatedText> */}</Title>
}
