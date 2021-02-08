import React from 'react'
import styled from 'styled-components'

import Trackbar from './Trackbar/index'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	.leftContainer {
		width: 75%;
		height: 100%;
	}
	.line {
		width: var(--menuLineSize);
		height: 100%;
		background: var(--white);
	}
	.rightContainer {
		width: calc(25% - var(--menuLineSize));
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30px;
	}
`

export default function Custom() {
	return (
		<Container>
			<div className="leftContainer"></div>
			<div className="line"></div>
			<div className="rightContainer">
				<Trackbar text="Width" />
				<Trackbar text="Height" />
				<Trackbar text="Factor" />
				<Trackbar text="Noise" />
				<Trackbar text="Perception" />
			</div>
		</Container>
	)
}
