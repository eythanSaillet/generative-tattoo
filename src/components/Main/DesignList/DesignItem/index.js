import React from 'react'
import styled from 'styled-components'
import gsap, { Power3 } from 'gsap'

const Item = styled.div`
	width: calc(100vh - var(--menuSize) - var(--containerMargin));
	height: 100%;
	display: flex;
	align-items: flex-end;
	background: grey;
	.bottomContainer {
		width: 100%;
		height: 30%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: darkgrey;
	}
`

export default function DessignItem({ refTest }) {
	let openItem = () => {
		let docStyle = getComputedStyle(document.documentElement)
		let containerMargin = docStyle.getPropertyValue('--containerMargin')
		let menuSize = docStyle.getPropertyValue('--menuSize')
		gsap.to(refTest.current, { duration: 1.7, width: `calc(${window.innerWidth}px - ${containerMargin} - ${menuSize})`, ease: Power3.easeInOut })
	}
	return (
		<Item
			ref={refTest}
			onClick={() => {
				openItem()
			}}
		>
			<div className="bottomContainer">
				<div className="titleContainer">TITRE</div>
				<div className="buttonontainer">BOUTON</div>
			</div>
		</Item>
	)
}
