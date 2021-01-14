import React, { useRef } from 'react'
import styled from 'styled-components'

import Sketch from './Sketch'
import Title from './Title'
import Cursor from './Cursor'

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`

export default function SplashScreen() {
	let holdValue = useRef(0)

	return (
		<Container>
			<Sketch holdValue={holdValue}></Sketch>
			<Title></Title>
			<Cursor holdValue={holdValue}></Cursor>
		</Container>
	)
}
