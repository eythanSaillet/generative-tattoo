import React from 'react'
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
	return (
		<Container>
			<Sketch></Sketch>
			<Title></Title>
			{/* <Cursor holdValue={holdValue}></Cursor> */}
		</Container>
	)
}
