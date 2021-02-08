import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import AnimatedText from '../../../utils/AnimatedText'

const Container = styled.div`
	width: 100%;
	height: 65px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	user-select: none;
	.secondContainer {
		width: 80%;
		height: 47px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.barContainer {
			height: 20px;
			width: 100%;
			display: flex;
			align-items: center;
			cursor: pointer;
			.bar {
				position: relative;
				height: 2px;
				width: 100%;
				background: var(--white);
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

export default function Trackbar({ text }) {
	const [position, setPosition] = useState(0)
	const [isClicked, setIsClicked] = useState(false)

	const barRef = useRef(null)

	window.addEventListener('mouseup', () => {
		setIsClicked(false)
	})

	return (
		<Container
			onMouseMove={(e) => {
				if (isClicked) {
					const targetRect = barRef.current.getBoundingClientRect()
					let x = e.clientX - targetRect.left - 5
					if (x < 0) x = 0
					if (x > targetRect.width - 10) x = targetRect.width - 10
					setPosition(x)
				}
			}}
		>
			<div className="secondContainer">
				<AnimatedText text={text} type="trackbarText" stagger={0.03} delay={0} hover={false}></AnimatedText>
				<div
					className="barContainer"
					onMouseDown={(e) => {
						setIsClicked(true)

						const targetRect = e.target.getBoundingClientRect()
						const x = e.clientX - targetRect.left - 5
						setPosition(x)
					}}
					onMouseUp={() => {
						setIsClicked(false)
					}}
					ref={barRef}
				>
					<div className="bar">
						<div className="tracker" style={{ left: position }}>
							<span>{Math.round(position)}</span>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
