import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	width: calc((100vw - var(--menuSize) - var(--containerMargin)) * 0.75 / 2);
	height: calc((100vw - var(--menuSize) - var(--containerMargin)) * 0.75 / 2);
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		max-width: 80%;
		max-height: 80%;
	}
`

export default function SelectItem({ imageSource }) {
	return (
		<Container>
			<img src={imageSource} alt="Selected design" />
		</Container>
	)
}
