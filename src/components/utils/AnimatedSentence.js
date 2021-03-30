import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import gsap, { Power3 } from 'gsap'

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	font-family: 'Made Outer Sans Thin';
	font-size: 0.74em;
	div {
		margin: 0 4px 3px 0;
		overflow: hidden;
		display: flex;
		span {
			transform: translateY(160%) rotate(27deg);
		}
	}
`
const AnimatedSentence = forwardRef(({ text, delay = 0 }, ref) => {
	let spans = []
	const textArray = text.split(' ')
	let spansRefs = useRef(new Array(textArray.length))

	for (let i = 0; i < textArray.length; i++) {
		spans.push(
			<div key={i}>
				<span ref={(element) => (spansRefs.current[i] = element)}>{textArray[i]}</span>
			</div>
		)
	}

	useEffect(() => {
		// Display the sentence
		gsap.to(spansRefs.current, {
			duration: 0.7,
			y: '0%',
			rotate: '0deg',
			stagger: 0.04,
			ease: Power3.easeOut,
			delay: delay / 1000,
		})
	}, [delay, spansRefs])

	// Unmount animation
	useImperativeHandle(ref, () => ({
		remove(delay) {
			gsap.to(spansRefs.current, {
				duration: 0.4,
				y: '-200%',
				rotate: '-20deg',
				stagger: -0.03,
				ease: Power3.easeIn,
				delay: delay,
			})
		},
	}))

	return <Container>{spans}</Container>
})
export default AnimatedSentence
