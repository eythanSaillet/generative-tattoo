import React, { useRef } from 'react'
import styled from 'styled-components'
import HorizontalScroll from 'react-scroll-horizontal'

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
	let test = useRef(null)
	return (
		<Container>
			<HorizontalScroll reverseScroll={true}>
				<DesignItem refTest={test}></DesignItem>
				<div className="line"></div>
				<DesignItem></DesignItem>
				<div className="line"></div>
				<DesignItem></DesignItem>
				<div className="line"></div>
				<DesignItem></DesignItem>
				<div className="line"></div>
				<DesignItem></DesignItem>
			</HorizontalScroll>
		</Container>
	)
}
