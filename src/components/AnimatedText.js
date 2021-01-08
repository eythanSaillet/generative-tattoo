import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap, { Power3 } from 'gsap'

const Text = styled.div`
	overflow: hidden;
	display: flex;
	align-items: center;
	span {
		display: inline-block;
		white-space: pre;
		transform: translateY(100%);
	}

	/* STYLES */
	.title {
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
		cursor: pointer;
	}
	transform: ${(props) => (props.type === 'navLink' ? 'rotate(-90deg)' : 'rotate(0)')};
`

export default function AnimatedText({ text, type, stagger, delay }) {
	let spans = []
	let spansRefs = useRef([])
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
				y: 0,
				stagger: stagger,
				ease: Power3.easeOut,
			})
		}, delay)
	}, [delay])

	return <Text type={type}>{spans}</Text>
}
