import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import HorizontalScroll from 'react-scroll-horizontal'
import gsap from 'gsap'

import config from '../../../assets/config.json'
import DesignItem from './DesignItem/index'

const Container = styled.div`
	width: 100%;
	height: 100%;
	.scroller > div > .line {
		width: var(--menuLineSize);
		height: 100%;
		background: var(--white);
		transform-origin: top;
		transform: scaleY(0);
	}
`

export default function DesignList() {
	let lines = useRef([])

	let items = []
	for (let i = 0; i < config.length; i++) {
		let index = i < 10 ? `0${i}` : `${i}`
		items.push(<DesignItem index={index} text={config[i].title} delayFactor={i} key={i}></DesignItem>)
		if (i !== config.length - 1) {
			items.push(<div className="line" key={i + 0.5} ref={(element) => lines.current.push(element)}></div>)
		}
	}

	useEffect(() => {
		for (let i = 0; i < lines.current.length; i++) {
			gsap.to(lines.current[i], { duration: 1, scaleY: 1, delay: 1 + i * 0.4 })
		}
	}, [lines])

	return (
		<Container>
			<HorizontalScroll className="scroller" reverseScroll={true}>
				{items}
			</HorizontalScroll>
		</Container>
	)
}
