import React, { useRef } from 'react'
import styled from 'styled-components'

import Sketch from './Sketch'
import Title from './Title'
import CallToAction from './CallToAction'

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	cursor: pointer;
`

export default function SplashScreen() {
	let title = useRef(null)
	let callToAction = useRef(null)

	return (
		<Container>
			<Sketch titleRef={title} callToActionRef={callToAction} />
			<Title ref={title} />
			<CallToAction ref={callToAction} />
		</Container>
	)
}
