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
		height: 33px;
		padding: 0 5px;
		font-size: 2.5em;
		line-height: 33px;
	}
`

export default function AnimatedText({ text, style, delay }) {
	let test = []
	let spans = useRef([])
	for (let i = 0; i < text.length; i++) {
		test.push(
			<span className={style} key={i} ref={(element) => spans.current.push(element)}>
				{text[i]}
			</span>
		)
	}
	useEffect(() => {
		setTimeout(() => {
			gsap.to(spans.current, {
				duration: 0.7,
				y: 0,
				stagger: 0.03,
				ease: Power3.easeOut,
			})
		}, delay)
	}, [])

	return <Text>{test}</Text>
}
