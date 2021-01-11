import React from 'react'
import styled from 'styled-components'
import HorizontalScroll from 'react-scroll-horizontal'

const Container = styled.div`
	width: 100%;
	height: 100%;
`

export default function Main() {
	const child = { width: `calc(100vh - var(--menuSize) - var(--containerMargin))`, height: `100%`, background: 'green' }
	const child2 = { width: `calc(100vh - var(--menuSize) - var(--containerMargin))`, height: `100%`, background: 'blue' }
	const child3 = { width: `calc(100vh - var(--menuSize) - var(--containerMargin))`, height: `100%`, background: 'yellow' }
	return (
		<Container>
			<HorizontalScroll reverseScroll={true}>
				<div style={child} />
				<div style={child2} />
				<div style={child3} />
				<div style={child} />
				<div style={child2} />
				<div style={child3} />
			</HorizontalScroll>
		</Container>
	)
}
