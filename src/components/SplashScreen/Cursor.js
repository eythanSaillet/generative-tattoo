import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	.circle {
		width: 60px;
		height: 60px;
		background: var(--white);
		border-radius: 50%;
		.innerCircle {
			width: 60px;
			height: 60px;
			background: var(--black);
			border-radius: 50%;
			transform: scale(0.95);
		}
	}
`

export default function Cursor({ holdValue }) {
	let mousePos = { x: 0, y: 0 }
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

	useEffect(() => {
		addEventListeners()

		// Apply lerp on mouse pos
		let mousePosWithLerp = { x: 0, y: 0 }
		const lerp = (start, end, amt) => {
			return (1 - amt) * start + amt * end
		}
		let interval = window.setInterval(() => {
			mousePosWithLerp = { x: lerp(mousePosWithLerp.x, mousePos.x, 0.3), y: lerp(mousePosWithLerp.y, mousePos.y, 0.3) }
			setCursorPos({ x: mousePosWithLerp.x, y: mousePosWithLerp.y })
		}, 30)

		return () => {
			removeEventListeners()
			clearInterval(interval)
		}
	}, [])

	// Add & remove mouse event
	const addEventListeners = () => {
		window.addEventListener('mousemove', onMouseMove)
	}
	const removeEventListeners = () => {
		window.removeEventListener('mousemove', onMouseMove)
	}

	// Update mouse pos on mouse move
	const onMouseMove = (e) => {
		mousePos = { x: e.clientX, y: e.clientY }
	}

	return (
		<Container>
			<div style={{ transform: `translateX(calc(-50% + ${cursorPos.x}px)) translateY(calc(-50% + ${cursorPos.y}px))` }} className="circle">
				<div style={{ transform: `scale(${(1 - holdValue.current) * 0.95})` }} className="innerCircle"></div>
			</div>
		</Container>
	)
}
