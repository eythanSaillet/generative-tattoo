import React from 'react'
import styled from 'styled-components'
import HorizontalScroll from 'react-scroll-horizontal'

import config from '../../../assets/config.json'
import DesignItem from './DesignItem/index'

const Container = styled.div`
	width: 100%;
	height: 100%;
	.line {
		width: var(--menuLineSize);
		height: 100%;
		background: var(--white);
	}
`

export default function DesignList() {
	let items = []
	for (let i = 0; i < config.length; i++) {
		let index = i < 10 ? `0${i}` : `${i}`
		items.push(<DesignItem index={index} text={config[i].title} delayFactor={i} key={i}></DesignItem>)
		if (i !== config.length - 1) {
			items.push(<div className="line" key={i + 0.5}></div>)
		}
	}
	return (
		<Container>
			<HorizontalScroll reverseScroll={true}>{items}</HorizontalScroll>
		</Container>
	)
}
