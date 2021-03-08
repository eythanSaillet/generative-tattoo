import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap, { Power1 } from 'gsap'

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
		transform-origin: top;
		transform: scaleY(0);
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
	let line = useRef(null)

	useEffect(() => {
		gsap.to(line.current, { duration: 0.7, scaleY: 1, ease: Power1.easeOut, delay: 1.2 })
	}, [])

	return (
		<Container>
			<div className="leftContainer"></div>
			<div className="line" ref={line}></div>
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
