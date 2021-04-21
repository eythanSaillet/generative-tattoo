import React, { forwardRef } from 'react'
import styled from 'styled-components'

import AnimatedText from './utils/AnimatedText'
import { ReactComponent as ArrowSource } from '../assets/arrow.svg'

const Container = styled.div`
	position: absolute;
	top: 50%;
	right: 13%;
	transform: translateY(-50%);
	display: flex;
	cursor: pointer;
	&:hover {
		.arrowContainer {
			transform: translateX(6px);
		}
	}
	.arrowContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		transition: transform 0.1s ease-in-out;
		svg {
			fill: var(--white);
			width: 11px;
			transform: ${(props) => (props.isInSelection === true ? 'rotate(90deg)' : 'rotate(0deg)')};
			transition: transform 0.1s ease-in-out;
		}
	}
`

const SelectNavButton = forwardRef(({ delay, isInSelection }, ref) => {
	return (
		<Container isInSelection={isInSelection}>
			<AnimatedText text="SELECTION" type="link" stagger={0.05} hover="true" delay={delay * 1000 + 250}></AnimatedText>
			<div className="arrowContainer">
				<ArrowSource />
			</div>
		</Container>
	)
})
export default SelectNavButton
