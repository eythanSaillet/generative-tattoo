import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

import AnimatedText from './AnimatedText'

const Container = styled.div`
	height: 47px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	> div:first-child {
		padding-bottom: 4px;
	}
`

const Title = forwardRef(({ index, text, delayFactor = 1, delay = 0, displayAnim }, ref) => {
	let designItemTitleIndex = useRef(null)
	let designItemTitleText1 = useRef(null)
	let designItemTitleText2 = useRef(null)

	// Trigger unmount animations
	useImperativeHandle(ref, () => ({
		remove() {
			designItemTitleIndex.current.remove(0.3)
			designItemTitleText1.current.remove(0.4)
			designItemTitleText2.current.remove(0.6)
		},
	}))

	return (
		<Container>
			<AnimatedText text={index} type="designItemTitleIndex" stagger={-0.05} delay={1600 + delayFactor * 750 + delay * 1000} displayAnim={displayAnim} ref={designItemTitleIndex}></AnimatedText>
			<AnimatedText text={text[0]} type="designItemTitleText" stagger={-0.05} delay={1300 + delayFactor * 750 + delay * 1000} displayAnim={displayAnim} ref={designItemTitleText1}></AnimatedText>
			<AnimatedText text={text[1]} type="designItemTitleText" stagger={-0.05} delay={1200 + delayFactor * 750 + delay * 1000} displayAnim={displayAnim} ref={designItemTitleText2}></AnimatedText>
		</Container>
	)
})
export default Title
