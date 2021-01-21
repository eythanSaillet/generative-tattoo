import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import gsap, { Linear } from 'gsap'

const Container = styled.div`
	position: absolute;
	bottom: 5%;
	left: 50%;
	font-family: 'Made Outer Sans Thin';
	transform: translate(-50%, -50%);
	p {
		opacity: 0;
	}
`

const CallToAction = forwardRef((props, ref) => {
	let text = useRef(null)
	let animation = useRef(null)

	useEffect(() => {
		// Launch animation
		gsap.to(text.current, { duration: 2, opacity: 0.05, ease: Linear.easeNone })
		animation.current = gsap.timeline({ repeat: -1, delay: 2 })
		animation.current.to(text.current, { duration: 2, opacity: 0.5, ease: Linear.easeNone })
		animation.current.to(text.current, { duration: 2, opacity: 0.1, ease: Linear.easeNone })
	}, [])

	// Unmount animation
	useImperativeHandle(ref, () => ({
		remove() {
			animation.current.pause()
			gsap.to(text.current, { duration: 1, opacity: 0, ease: Linear.easeNone })
		},
	}))

	return (
		<Container>
			<p ref={text}>Click & Hold</p>
		</Container>
	)
})
export default CallToAction
