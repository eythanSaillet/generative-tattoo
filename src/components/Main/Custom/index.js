import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap, { Power1 } from 'gsap'
import { useHistory } from 'react-router-dom'

import config from '../../../assets/config.json'
import Trackbar from './Trackbar/index'
import AnimatedText from '../../utils/AnimatedText'
import Sketch from './Sketch'
import Button from '../../utils/Button'
import DesignTitle from '../../utils/DesignTitle'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	.leftContainer {
		position: relative;
		width: 75%;
		height: 100%;
		.returnButton {
			position: absolute;
			top: 35px;
			left: 40px;
		}
		.designTitleContainer {
			position: absolute;
			bottom: 54px;
			left: 60px;
		}
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

export default function Custom({ navTitleRef, delay }) {
	const line = useRef(null)
	const returnButton = useRef(null)

	const history = useHistory()

	// Get design config
	let design
	const slug = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1)
	for (const _design of config) {
		if (_design.slug === slug) {
			design = _design
		}
	}
	useEffect(() => {
		gsap.to(line.current, { duration: 1.2, scaleY: 1, ease: Power1.easeOut, delay: delay + 1.2 })
	}, [delay])

	return (
		<Container>
			<div className="leftContainer">
				<div
					className="returnButton"
					onClick={() => {
						navTitleRef.current.replace('CHOOSE')
						returnButton.current.remove()
						gsap.to(line.current, { duration: 0.7, scaleY: 0, ease: Power1.easeOut, delay: 0.3 })
						setTimeout(() => {
							history.goBack()
						}, 2000)
					}}
				>
					<AnimatedText text="RETURN" type="link" stagger={0.03} delay={delay * 1000 + 1200} hover={true} ref={returnButton} />
				</div>
				<Sketch delay={delay + 2} />
				<div className="designTitleContainer">
					<DesignTitle index={design.index} text={design.title} displayAnim={delay === 0 ? true : false} delay={delay === 0 ? -1 : 0} />
				</div>
			</div>
			<div className="line" ref={line}></div>
			<div className="rightContainer">
				<Trackbar text="Width" range={[2, 11]} decimals={2} initialValue={9.25} delay={delay + 1.5} />
				<Trackbar text="Height" range={[2, 100]} decimals={0} initialValue={6} delay={delay + 1.7} />
				<Trackbar text="Factor" range={[2, 50]} decimals={1} initialValue={10.9} delay={delay + 1.9} />
				<Trackbar text="Noise" range={[1, 4]} decimals={2} initialValue={3.76} delay={delay + 2.1} />
				<Trackbar text="Perception" range={[0, 1]} decimals={3} initialValue={0.232} delay={delay + 2.3} />
				<Button text="GENERATE" delay={delay + 2.5} />
			</div>
		</Container>
	)
}
