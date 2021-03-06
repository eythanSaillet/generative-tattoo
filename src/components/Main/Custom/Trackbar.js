import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import gsap, { Power2 } from 'gsap'

import AnimatedText from '../../utils/AnimatedText'

const Container = styled.div`
	width: 100%;
	height: 68px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	user-select: none;
	z-index: 20;
	.secondContainer {
		width: 80%;
		height: 46px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.barContainerOut {
			height: 15px;
			width: 100%;
			display: flex;
			align-items: center;
			cursor: pointer;
			.barContainerIn {
				position: relative;
				height: 2px;
				width: 100%;
				.bar {
					width: 100%;
					height: 100%;
					background: var(--darkGrey);
					transform-origin: left;
					transform: scaleX(0);
				}
				.tracker {
					width: 10px;
					height: 10px;
					position: absolute;
					top: 0;
					background: var(--black);
					border: solid 2px var(--white);
					opacity: 0;
					transform: translate(0, -50%);
					pointer-events: none;
					span {
						position: absolute;
						top: 50%;
						left: 50%;
						font-size: 11px;
						font-family: 'Made Outer Sans Thin';
						letter-spacing: 2px;
						transform: translate(-50%, -160%);
					}
				}
			}
		}
	}
`
const Trackbar = forwardRef(({ text, varName, range, decimals, initialValue, delay, sketch, setButtonIsDisable }, ref) => {
	const [position, setPosition] = useState(0)
	const [windowIsClicked, setWindowIsClicked] = useState(false)
	const [valueState, setValueState] = useState(null)

	const barContainerOut = useRef(null)
	const tracker = useRef(null)
	const trackerIndex = useRef(null)
	const bar = useRef(null)
	const animatedText = useRef(null)

	window.addEventListener('mouseup', () => {
		setWindowIsClicked(false)
	})

	const updateTracker = (e) => {
		// Calculate the offset
		const targetRect = barContainerOut.current.getBoundingClientRect()
		let x = e.clientX - targetRect.left - 5
		if (x < 0) x = 0
		if (x > targetRect.width - 10) x = targetRect.width - 10

		// Update tracker index
		const percent = x / (targetRect.width - 10)
		const value = (range[0] + percent * (range[1] - range[0])).toFixed(decimals)
		trackerIndex.current.innerHTML = value

		// Set value state
		setValueState(value)

		// Translate the tracker
		setPosition(x)

		setButtonIsDisable(false)
	}

	useEffect(() => {
		// Calculate the offset
		const targetRect = barContainerOut.current.getBoundingClientRect()
		const percent = (initialValue - range[0]) / (range[1] - range[0])
		const x = percent * (targetRect.width - 10)

		// setPosition(x)

		// Display animation
		gsap.to(bar.current, { duration: 1, scaleX: 1, delay: delay })
		gsap.to(tracker.current, { duration: 1, left: x, delay: delay, ease: Power2.easeInOut })

		gsap.to(tracker.current, { duration: 0.5, opacity: 1, delay: delay, ease: Power2.easeIn })
		let trackbarIndex = { value: 0 }
		gsap.to(trackbarIndex, {
			duration: 1,
			value: initialValue,
			delay: delay,
			ease: Power2.easeInOut,
			onUpdate: () => {
				trackerIndex.current.innerHTML = trackbarIndex.value.toFixed(decimals)
			},
		})
	}, [range, initialValue, delay, decimals])

	useImperativeHandle(ref, () => ({
		remove(delay) {
			animatedText.current.remove(delay - 0.3)

			gsap.to(bar.current, { duration: 1, scaleX: 0, delay: delay })
			gsap.to(tracker.current, { duration: 1, left: 0, delay: delay, ease: Power2.easeInOut })

			gsap.to(tracker.current, { duration: 0.5, opacity: 0, delay: delay, ease: Power2.easeIn })
		},
	}))

	return (
		<Container
			onMouseMove={(e) => {
				if (windowIsClicked) {
					updateTracker(e)
				}
			}}
		>
			<div className="secondContainer">
				<AnimatedText text={text} type="trackbarText" stagger={0.03} delay={delay * 1000} hover={false} ref={animatedText}></AnimatedText>
				<div
					className="barContainerOut"
					onMouseDown={(e) => {
						setWindowIsClicked(true)

						updateTracker(e)
					}}
					onMouseUp={() => {
						setWindowIsClicked(false)

						sketch.current.updateValue(varName, valueState)
					}}
					onMouseLeave={() => {
						if (windowIsClicked) {
							sketch.current.updateValue(varName, valueState)
						}
					}}
					ref={barContainerOut}
				>
					<div className="barContainerIn">
						<div className="bar" ref={bar} />
						<div className="tracker" style={{ left: position }} ref={tracker}>
							<span ref={trackerIndex}>0</span>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
})
export default Trackbar
