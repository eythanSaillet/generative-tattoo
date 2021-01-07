import React from 'react'
import styled from 'styled-components'

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

function SplashTitle() {
	return <Title>GENERATIVE</Title>
}

export default SplashTitle
