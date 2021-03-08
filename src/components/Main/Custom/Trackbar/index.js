import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import AnimatedText from '../../../utils/AnimatedText'

const Container = styled.div`
	width: 100%;
	height: 68px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	user-select: none;
	.secondContainer {
		width: 80%;
		height: 46px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.barContainer {
			height: 15px;
			width: 100%;
			display: flex;
			align-items: center;
			cursor: pointer;
			.bar {
				position: relative;
				height: 2px;
				width: 100%;
				background: var(--darkGrey);
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

export default function Trackbar({ text, range, decimals, initialValue }) {
	const [position, setPosition] = useState(0)
	const [isClicked, setIsClicked] = useState(false)

	const barRef = useRef(null)
	const trackerIndexRef = useRef(null)

	window.addEventListener('mouseup', () => {
		setIsClicked(false)
	})

	const updateTracker = (e) => {
		// Calculate the offset
		const targetRect = barRef.current.getBoundingClientRect()
		let x = e.clientX - targetRect.left - 5
		if (x < 0) x = 0
		if (x > targetRect.width - 10) x = targetRect.width - 10

		// Update tracker index
		const percent = x / (targetRect.width - 10)
		const value = range[0] + percent * (range[1] - range[0])
		trackerIndexRef.current.innerHTML = value.toFixed(decimals)

		// Translate the tracker
		setPosition(x)
	}

	useEffect(() => {
		// Calculate the offset
		const targetRect = barRef.current.getBoundingClientRect()
		const percent = (initialValue - range[0]) / (range[1] - range[0])
		const x = percent * (targetRect.width - 10)

		setPosition(x)

		trackerIndexRef.current.innerHTML = initialValue
	}, [range, initialValue])

	return (
		<Container
			onMouseMove={(e) => {
				if (isClicked) {
					updateTracker(e)
				}
			}}
		>
			<div className="secondContainer">
				<AnimatedText text={text} type="trackbarText" stagger={0.03} delay={0} hover={false}></AnimatedText>
				<div
					className="barContainer"
					onMouseDown={(e) => {
						setIsClicked(true)

						updateTracker(e)
					}}
					onMouseUp={() => {
						setIsClicked(false)
					}}
					ref={barRef}
				>
					<div className="bar">
						<div className="tracker" style={{ left: position }}>
							<span ref={trackerIndexRef}></span>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
