import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import SelectItem from './SelectItem'
// import ImageSources from '../../../assets/base64.json'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	.leftContainer {
		position: relative;
		width: 75%;
		height: 100%;
		overflow: hidden;
		.itemContainer {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;
			> div {
				border-bottom: var(--white) 1px solid;
				&:nth-child(odd) {
					border-right: var(--white) 1px solid;
				}
				&:nth-last-child(1) {
					border-bottom: none;
				}
				&:nth-last-child(2):nth-child(odd) {
					border-bottom: none;
				}
			}
		}
	}
	.line {
		width: var(--menuLineSize);
		height: 100%;
		background: var(--white);
	}
	.rightContainer {
		width: calc(25% - var(--menuLineSize));
		height: 100%;
	}
`

export default function Select() {
	const leftContainer = useRef(null)
	const itemContainer = useRef(null)
	const scrollDelta = useRef(null)
	const scrollValue = useRef(0)
	const smoothScrollValue = useRef(0)
	let resizeListener

	// Lerp function
	function lerp(start, end, amt) {
		return (1 - amt) * start + amt * end
	}

	// Set scroller height
	function setScrollDelta() {
		scrollDelta.current = itemContainer.current.offsetHeight - leftContainer.current.offsetHeight
	}

	// Get local storage data
	// let input = [ImageSources.a, ImageSources.b, ImageSources.c]
	// localStorage.setItem('Designs', JSON.stringify(input))
	const designs = JSON.parse(localStorage.getItem('Designs'))
	// console.log(designs)

	// Create selected items
	let selectedItems = []
	for (const _key in designs) {
		selectedItems.push(<SelectItem imageSource={designs[_key]} key={_key} />)
	}

	useEffect(() => {
		setScrollDelta()

		// Set lerp interval
		const interval = setInterval(() => {
			smoothScrollValue.current = lerp(smoothScrollValue.current, scrollValue.current, 0.2)
			if (itemContainer.current !== null) {
				itemContainer.current.style.transform = `translateY(${-smoothScrollValue.current}px)`
			}
		}, 20)

		// Resize listener
		let resizeListener = () => {
			setScrollDelta()
		}
		window.addEventListener('resize', resizeListener)

		return () => {
			clearInterval(interval)
			window.removeEventListener('resize', resizeListener)
		}
	}, [resizeListener])

	return (
		<Container>
			<div className="leftContainer" ref={leftContainer}>
				<div
					className="itemContainer"
					ref={itemContainer}
					onWheel={(e) => {
						if (scrollValue.current + e.deltaY <= 0) {
							scrollValue.current = 0
						} else if (scrollValue.current + e.deltaY >= scrollDelta.current) {
							scrollValue.current = scrollDelta.current
						} else {
							scrollValue.current += e.deltaY
						}
					}}
				>
					{selectedItems}
				</div>
			</div>
			<div className="line" />
			<div className="rightContainer"></div>
		</Container>
	)
}
