import React from 'react'
import styled from 'styled-components'

import Title from './Title'
import Button from './Button'

const Item = styled.div`
	position: relative;
	width: calc(100vh - var(--menuSize) - var(--containerMargin));
	height: 100%;
	.bottomContainer {
		position: absolute;
		left: 10%;
		right: 10%;
		bottom: 9%;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
`

export default function DessignItem({ index, text, delayFactor }) {
	// let openItem = () => {
	// 	let docStyle = getComputedStyle(document.documentElement)
	// 	let containerMargin = docStyle.getPropertyValue('--containerMargin')
	// 	let menuSize = docStyle.getPropertyValue('--menuSize')
	// 	gsap.to(refTest.current, { duration: 1.7, width: `calc(${window.innerWidth}px - ${containerMargin} - ${menuSize})`, ease: Power3.easeInOut })
	// }
	return (
		<Item>
			<div className="bottomContainer">
				<Title index={index} text={text} delayFactor={delayFactor}></Title>
				<Button delayFactor={delayFactor} />
			</div>
		</Item>
	)
}
