import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap, { Linear, Power1 } from 'gsap'

const Container = styled.div`
	position: relative;
	width: 40px;
	height: 40px;
	border: 1px solid var(--white);
	cursor: pointer;
	.arrowContainer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.arrow {
			width: 10px;
			height: 2px;
			background: var(--white);
			z-index: 6;
		}
		.arrowTop {
			transform: translateY(-2px) rotate(45deg) scaleX(0.01);
		}
		.arrowBottom {
			transform: translateY(2px) rotate(-45deg) scaleX(0.01);
		}
	}
	.displayEffect {
		position: absolute;
		width: 75px;
		height: 7px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scaleY(15);
		background: var(--black);
		z-index: 5;
		pointer-events: none;
	}
	.effect {
		position: absolute;
		width: 75px;
		height: 7px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: var(--black);
		z-index: 5;
		pointer-events: none;
	}

	// Hover
	&:hover {
		background: var(--white);
		.arrow {
			background: var(--black);
		}
		.displayEffect {
			visibility: hidden;
		}
		.effect {
			visibility: hidden !important;
		}
	}
`

export default function Button({ delayFactor }) {
	let displayEffect = useRef(null)
	let effect = useRef(null)

	let arrowTop = useRef(null)
	let arrowBottom = useRef(null)

	useEffect(() => {
		// Launch animation
		let effectAnimation = gsap.timeline({ repeat: -1 })
		effectAnimation.to(effect.current, { duration: 5, rotation: 360, ease: Linear.easeNone })

		// Display the button
		gsap.to(displayEffect.current, { duration: 3, scaleY: 0, rotate: 405, ease: Power1.eseIn, delay: 1 + delayFactor * 0.75 })

		// Display the arrows
		gsap.to(arrowTop.current, { duration: 1, scaleX: 1, delay: 2.3 + delayFactor * 0.75 })
		gsap.to(arrowBottom.current, { duration: 1, scaleX: 1, delay: 2.3 + delayFactor * 0.75 })
	}, [delayFactor])

	return (
		<Container className="button">
			<div className="arrowContainer">
				<div className="arrow arrowTop" ref={arrowTop}></div>
				<div className="arrow arrowBottom" ref={arrowBottom}></div>
			</div>
			<div className="displayEffect" ref={displayEffect}></div>
			<div className="effect" ref={effect}></div>
		</Container>
	)
}
