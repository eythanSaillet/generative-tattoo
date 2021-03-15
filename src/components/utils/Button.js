import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap, { Power3 } from 'gsap'

import AnimatedText from './AnimatedText'

const Container = styled.div`
	position: relative;
	padding: 15px 25px;
	border: solid 1px var(--white);
	cursor: pointer;
	user-select: none;
	&:hover {
		background: var(--white);
		color: var(--black);
	}
	&:active {
		color: var(--white);
	}
	> div {
		z-index: 10;
		pointer-events: none;
	}
	.displayEffect {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 120%;
		height: 160%;
		background: var(--black);
		transform: translate(-50%, -50%);
		z-index: 0;
	}
`

export default function Button({ text, delay }) {
	let displayEffect = useRef(null)

	useEffect(() => {
		gsap.to(displayEffect.current, { duration: 1.5, scaleY: 0, rotate: 135, ease: Power3.easeInOut, delay: delay })
	}, [])

	return (
		<Container>
			<div className="displayEffect" ref={displayEffect} />
			<AnimatedText text={text} type="button" stagger={0.05} delay={delay * 1000 + 250}></AnimatedText>
		</Container>
	)
}
