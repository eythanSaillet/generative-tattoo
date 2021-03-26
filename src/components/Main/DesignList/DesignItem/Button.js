import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
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
	// Active
	&:active {
		.arrow {
			background: var(--white);
		}
	}
`

const Button = forwardRef(({ delayFactor, delay }, ref) => {
	let displayEffect = useRef(null)
	let effect = useRef(null)

	let arrowTop = useRef(null)
	let arrowBottom = useRef(null)

	useEffect(() => {
		// Launch animation
		let effectAnimation = gsap.timeline({ repeat: -1 })
		effectAnimation.to(effect.current, { duration: 5, rotation: 360, ease: Linear.easeNone })

		// Display the button
		gsap.to(displayEffect.current, { duration: 3, scaleY: 0, rotate: 405, delay: 1 + delayFactor * 0.75 + delay })

		// Display the arrows
		gsap.to(arrowTop.current, { duration: 1, scaleX: 1, delay: 2.3 + delayFactor * 0.75 + delay })
		gsap.to(arrowBottom.current, { duration: 1, scaleX: 1, delay: 2.3 + delayFactor * 0.75 + delay })
	}, [delayFactor, delay])

	useImperativeHandle(ref, () => ({
		// Unmount animation
		remove(delay) {
			// Remove the button
			gsap.to(displayEffect.current, { duration: 2, scaleY: 15, rotate: 0, delay: 0.5 + delay })

			// Remove the arrows
			gsap.to(arrowTop.current, { duration: 1, scaleX: 0, delay: delay, ease: Power1.easeIn })
			gsap.to(arrowBottom.current, { duration: 1, scaleX: 0, delay: delay, ease: Power1.easeIn })
		},
	}))

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
})
export default Button
