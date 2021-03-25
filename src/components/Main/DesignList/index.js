import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import HorizontalScroll from 'react-scroll-horizontal'
import gsap from 'gsap'

import config from '../../../assets/config.json'
import DesignItem from './DesignItem/index'

const Container = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	.scroller {
		overflow: visible !important;
		> div > .line {
			width: var(--menuLineSize);
			height: 100%;
			background: var(--white);
			transform-origin: top;
			transform: scaleY(0);
		}
	}
`

export default function DesignList({ navTitleRef, delay }) {
	let horizontalScroll = useRef(null)
	let lines = useRef([])

	let items = []
	for (let i = 0; i < config.length; i++) {
		items.push(<DesignItem index={config[i].index} text={config[i].title} delayFactor={i} key={i} horizontalScrollRef={horizontalScroll} navTitleRef={navTitleRef} delay={delay} />)
		if (i !== config.length - 1) {
			items.push(<div className="line" key={i + 0.5} ref={(element) => lines.current.push(element)}></div>)
		}
	}

	useEffect(() => {
		for (let i = 0; i < lines.current.length; i++) {
			gsap.to(lines.current[i], { duration: 1, scaleY: 1, delay: 1 + i * 0.4 + delay })
		}
	}, [lines])

	return (
		<Container>
			<HorizontalScroll className="scroller" reverseScroll={true} ref={horizontalScroll}>
				{items}
			</HorizontalScroll>
		</Container>
	)
}
