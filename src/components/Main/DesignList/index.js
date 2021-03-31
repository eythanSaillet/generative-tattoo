import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import HorizontalScroll from 'react-scroll-horizontal'
import gsap from 'gsap'

import config from '../../../assets/config.json'
import DesignItem from './DesignItem/index'

const ComingSoonContainer = styled.div`
	width: calc(100vh - var(--menuSize) - var(--containerMargin));
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	p {
		font-family: 'Made Outer Sans Thin';
		font-size: 0.8em;
		letter-spacing: 3px;
	}
`

function ComingSoonItem() {
	const [text, setText] = useState('Coming soon ...')

	useEffect(() => {
		let i = 0
		setInterval(() => {
			i = i === 4 ? 0 : i
			setText('Coming soon ' + '.'.repeat(i))
			i++
		}, 500)
	}, [])

	return (
		<ComingSoonContainer>
			<p>{text}</p>
		</ComingSoonContainer>
	)
}

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
		items.push(<div className="line" key={i + 0.5} ref={(element) => lines.current.push(element)}></div>)
	}
	items.push(<ComingSoonItem key={items.length} />)

	useEffect(() => {
		for (let i = 0; i < lines.current.length; i++) {
			gsap.to(lines.current[i], { duration: 1, scaleY: 1, delay: 1 + i * 0.4 + delay })
		}
	}, [lines, delay])

	return (
		<Container>
			<HorizontalScroll className="scroller" reverseScroll={true} ref={horizontalScroll}>
				{items}
			</HorizontalScroll>
		</Container>
	)
}
