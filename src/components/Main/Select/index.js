import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import SelectItem from './SelectItem'

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
			pointer-events: none;
		}
		.scrollerContainer {
			height: 100%;
			overflow: scroll;
			.scroller {
				width: 100%;
				height: 300%;
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
	const itemContainer = useRef(null)
	const scroller = useRef(null)
	const scrollValue = useRef(0)
	const smoothScrollValue = useRef(0)

	// Lerp function
	function lerp(start, end, amt) {
		return (1 - amt) * start + amt * end
	}
	// Set scroller height
	function setScrollerHeight(height) {
		scroller.current.style.height = height + 'px'
	}

	useEffect(() => {
		setScrollerHeight(itemContainer.current.offsetHeight)

		// Set lerp interval
		const interval = setInterval(() => {
			smoothScrollValue.current = lerp(smoothScrollValue.current, scrollValue.current, 0.2)
			itemContainer.current.style.transform = `translateY(${-smoothScrollValue.current}px)`
		}, 20)
		return () => clearInterval(interval)
	}, [])

	return (
		<Container>
			<div className="leftContainer">
				<div className="itemContainer" ref={itemContainer}>
					<SelectItem />
					<SelectItem />
					<SelectItem />
					<SelectItem />
					<SelectItem />
					<SelectItem />
					<SelectItem />
					<SelectItem />
					<SelectItem />
					<SelectItem />
					<SelectItem />
					<SelectItem />
				</div>
				<div
					className="scrollerContainer"
					onScroll={(e) => {
						scrollValue.current = e.target.scrollTop
					}}
				>
					<div className="scroller" ref={scroller}></div>
				</div>
			</div>
			<div className="line" />
			<div className="rightContainer"></div>
		</Container>
	)
}
