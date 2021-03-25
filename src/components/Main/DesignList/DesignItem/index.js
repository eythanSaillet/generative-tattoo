import React, { useRef } from 'react'
import styled from 'styled-components'
import gsap, { Power3 } from 'gsap'
import { useHistory } from 'react-router-dom'

import Demo from './Demo'
import DesignTitle from '../../../utils/DesignTitle'
import Button from './Button'

const Item = styled.div`
	position: relative;
	width: calc(100vh - var(--menuSize) - var(--containerMargin));
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.bottomContainer {
		position: absolute;
		left: 60px;
		right: 60px;
		bottom: 54px;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		.effect {
			visibility: hidden;
		}
	}

	// Hover
	&:hover {
		.bottomContainer .button .effect {
			visibility: visible;
		}
	}
`

export default function DesignItem({ index, text, delayFactor, horizontalScrollRef, navTitleRef, delay }) {
	let item = useRef(null)
	let title = useRef(null)
	let button = useRef(null)
	let demo = useRef(null)

	let history = useHistory()

	const openItem = () => {
		// Disable scroll
		horizontalScrollRef.current.hScrollParent.style.pointerEvents = 'none'

		// Resize item
		const docStyle = getComputedStyle(document.documentElement)
		const containerMargin = docStyle.getPropertyValue('--containerMargin')
		const menuSize = docStyle.getPropertyValue('--menuSize')
		gsap.to(item.current, { duration: 1.5, width: `calc(${window.innerWidth}px - ${containerMargin} - ${menuSize})`, ease: Power3.easeInOut })

		// Scroll to the item
		const scrollDivStyle = window.getComputedStyle(horizontalScrollRef.current.hScrollParent.children[0])
		const scrollDivTransformMatrix = scrollDivStyle.transform || scrollDivStyle.webkitTransform || scrollDivStyle.mozTransform
		const scrollDivTransformMatrixValues = scrollDivTransformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ')
		const scrollValue = -scrollDivTransformMatrixValues[4] - item.current.offsetLeft
		gsap.to(horizontalScrollRef.current.hScrollParent, { duration: 1.5, x: scrollValue, ease: Power3.easeInOut })
	}
	return (
		<Item
			ref={item}
			onMouseEnter={() => {
				demo.current.play()
			}}
			onMouseLeave={() => {
				demo.current.pause()
			}}
		>
			<Demo index={parseInt(index) - 1} ref={demo} delay={delay} />
			<div className="bottomContainer">
				<DesignTitle index={index} text={text} delayFactor={delayFactor} ref={title} delay={delay}></DesignTitle>
				<div
					onClick={() => {
						// Trigger demo video transition out
						demo.current.out()

						setTimeout(() => {
							openItem()
							button.current.remove(0.2)
							navTitleRef.current.replace('CUSTOM')
							setTimeout(() => {
								let designName = text.join('').toLowerCase()
								history.push(`choose/${designName}`)
							}, 1500)
						}, 600)
					}}
				>
					<Button delayFactor={delayFactor} ref={button} delay={delay} />
				</div>
			</div>
		</Item>
	)
}
