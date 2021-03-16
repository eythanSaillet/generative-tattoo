import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import gsap, { Power2 } from 'gsap'

import AnimatedText from '../../../utils/AnimatedText'

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

export default function Trackbar({ text, range, decimals, initialValue, delay }) {
	const [position, setPosition] = useState(0)
	const [isClicked, setIsClicked] = useState(false)

	const barContainerOut = useRef(null)
	const tracker = useRef(null)
	const trackerIndex = useRef(null)
	const bar = useRef(null)

	window.addEventListener('mouseup', () => {
		setIsClicked(false)
	})

	const updateTracker = (e) => {
		// Calculate the offset
		const targetRect = barContainerOut.current.getBoundingClientRect()
		let x = e.clientX - targetRect.left - 5
		if (x < 0) x = 0
		if (x > targetRect.width - 10) x = targetRect.width - 10

		// Update tracker index
		const percent = x / (targetRect.width - 10)
		const value = range[0] + percent * (range[1] - range[0])
		trackerIndex.current.innerHTML = value.toFixed(decimals)

		// Translate the tracker
		setPosition(x)
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

		gsap.from(tracker.current, { duration: 0.5, opacity: 0, delay: delay, ease: Power2.easeIn })
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

	return (
		<Container
			onMouseMove={(e) => {
				if (isClicked) {
					updateTracker(e)
				}
			}}
		>
			<div className="secondContainer">
				<AnimatedText text={text} type="trackbarText" stagger={0.03} delay={delay * 1000} hover={false}></AnimatedText>
				<div
					className="barContainerOut"
					onMouseDown={(e) => {
						setIsClicked(true)

						updateTracker(e)
					}}
					onMouseUp={() => {
						setIsClicked(false)
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
}
