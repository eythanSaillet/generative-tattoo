import React, { useRef } from 'react'
import styled from 'styled-components'

import Sketch from './Sketch'
import Title from './Title'
// import Cursor from './Cursor'

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	cursor: pointer;
`

export default function SplashScreen() {
	let title = useRef(null)

	return (
		<Container>
			<Sketch titleRef={title} />
			<Title ref={title} />
			{/* <Cursor holdValue={holdValue}></Cursor> */}
		</Container>
	)
}
