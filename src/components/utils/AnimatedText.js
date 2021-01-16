import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap, { Power3, Power2 } from 'gsap'

const Text = styled.div`
	display: flex;
	align-items: center;
	padding: ${(props) => (props.type === 'navLink' ? '12px' : '0')};
	cursor: ${(props) => (props.type === 'navLink' ? 'pointer' : 'initial')};
	.textContainer {
		display: flex;
		overflow: hidden;
		span {
			display: inline-block;
			white-space: pre;
			transform: translateY(105%);
			pointer-events: none;
		}

		/* TYPES */
		.splashTitleTop {
			font-family: 'Made Outer Sans Thin';
			font-size: 2em;
			padding: 0 10px;
			user-select: none;
			mix-blend-mode: difference;
		}
		.splashTitleBottom {
			font-size: 4em;
			padding: 0 7px;
			user-select: none;
			mix-blend-mode: difference;
		}
		.navTitle {
			height: 32px;
			padding: 0 5px;
			font-size: 2.5em;
			line-height: 32px;
		}
		.navLink {
			height: 11px;
			color: var(--grey);
			font-size: 0.8em;
			line-height: 11px;
			padding: 0 1px;
		}
		.designItemTitleIndex {
			height: 11px;
			color: var(--grey);
			font-family: 'Made Outer Sans Thin';
			font-size: 0.72em;
			line-height: 11px;
			padding: 0 0.5px;
		}
		.designItemTitleText {
			height: 11px;
			color: var(--white);
			font-family: 'Made Outer Sans Light';
			font-size: 0.8em;
			line-height: 11px;
			padding: 0 0.5px;
		}
	}
	transform: ${(props) => (props.type === 'navLink' ? 'rotate(-90deg)' : 'rotate(0)')};
`

export default function AnimatedText({ text, type, stagger, delay, hover }) {
	let spans = []
	let spansRefs = useRef([])
	let isAnimated = useRef(true)

	for (let i = 0; i < text.length; i++) {
		spans.push(
			<span className={type} key={i} ref={(element) => spansRefs.current.push(element)}>
				{text[i]}
			</span>
		)
	}
	useEffect(() => {
		setTimeout(() => {
			gsap.to(spansRefs.current, {
				duration: 0.7,
				y: '0%',
				stagger: stagger,
				ease: Power3.easeOut,
				onComplete: () => {
					isAnimated.current = false
				},
			})
		}, delay)
	}, [stagger, delay, isAnimated])

	// Hover animation
	let hoverAnim = () => {
		isAnimated.current = true
		let delay = 0
		for (let i = 0; i < spansRefs.current.length; i++) {
			gsap.to(spansRefs.current[i], {
				duration: 0.3,
				delay: delay,
				y: '-105%',
				ease: Power2.easeIn,
				onComplete: () => {
					gsap.to(spansRefs.current[i], {
						duration: 0,
						y: '105%',
						onComplete: () => {
							gsap.to(spansRefs.current[i], {
								duration: 0.3,
								y: '0%',
								ease: Power2.easeOut,
							})
							if (i === spansRefs.current.length - 1) {
								isAnimated.current = false
							}
						},
					})
				},
			})
			delay += 0.04
		}
	}

	return (
		<Text
			type={type}
			onMouseEnter={() => {
				if (!isAnimated.current && hover) {
					hoverAnim()
				}
			}}
		>
			<div className="textContainer">{spans}</div>
		</Text>
	)
}
