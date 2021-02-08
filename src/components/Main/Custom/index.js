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
				<Trackbar text="Width" range={[2, 11]} decimals={2} initialValue={9.25} />
				<Trackbar text="Height" range={[2, 100]} decimals={0} initialValue={6} />
				<Trackbar text="Factor" range={[2, 50]} decimals={1} initialValue={10.9} />
				<Trackbar text="Noise" range={[1, 4]} decimals={2} initialValue={3.76} />
				<Trackbar text="Perception" range={[0, 1]} decimals={3} initialValue={0.232} />
			</div>
		</Container>
	)
}
