import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import gsap, { Power2 } from 'gsap'

import AnimatedText from './AnimatedText'

const Container = styled.div`
	position: relative;
	width: 100%;
	padding: 18px 25px;
	border: ${(props) => (props.enable ? 'solid 1px var(--white)' : 'solid 1px var(--darkGrey)')};
	display: flex;
	justify-content: center;
	user-select: none;
	cursor: pointer;
	pointer-events: ${(props) => (props.enable ? 'auto' : 'none')};
	&:hover {
		background: ${(props) => (props.enable ? 'var(--white)' : 'var(--black)')};
		color: ${(props) => (props.enable ? 'var(--black)' : 'var(--white)')};
		/* background: var(--white); */
		/* color: var(--black); */
	}
	&:active {
		color: var(--white);
	}
	> div {
		z-index: 10;
		pointer-events: none;
	}
	> div:not(.displayEffectContainer) {
		opacity: ${(props) => (props.enable ? '1' : '0.3')};
	}
	.displayEffectContainer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: scale(1.05);
		.displayEffect {
			width: 100%;
			height: 100%;
			background: black;
			transform-origin: right;
		}
	}
`
const Button = forwardRef(({ text, delay, enable }, ref) => {
	const displayEffect = useRef(null)
	const animatedText = useRef(null)

	useEffect(() => {
		gsap.to(displayEffect.current, { duration: 0.85, scaleX: 0, ease: Power2.easeInOut, delay: delay })
	}, [delay])

	useImperativeHandle(ref, () => ({
		remove(delay) {
			gsap.to(displayEffect.current, { duration: 0.85, scaleX: 1, ease: Power2.easeInOut, delay: delay + 0.3 })
			animatedText.current.remove(delay)
		},

		replaceText(text) {
			animatedText.current.replace(text)
		},
	}))

	return (
		<Container enable={enable}>
			<div className="displayEffectContainer">
				<div className="displayEffect" ref={displayEffect} />
			</div>
			<AnimatedText text={text} type="button" stagger={0.05} delay={delay * 1000 + 250} ref={animatedText}></AnimatedText>
		</Container>
	)
})
export default Button
