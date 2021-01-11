import React from 'react'
import styled from 'styled-components'

import AnimatedText from '../../../utils/AnimatedText'

const Container = styled.div`
	height: 47px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	> div:first-child {
		padding-bottom: 4px;
	}
`

export default function Title({ index, text, delayFactor }) {
	return (
		<Container>
			<AnimatedText text={index} type="designItemTitleIndex" stagger={-0.05} delay={1600 + delayFactor * 750}></AnimatedText>
			<AnimatedText text={text[0]} type="designItemTitleText" stagger={-0.05} delay={1300 + delayFactor * 750}></AnimatedText>
			<AnimatedText text={text[1]} type="designItemTitleText" stagger={-0.05} delay={1200 + delayFactor * 750}></AnimatedText>
		</Container>
	)
}
