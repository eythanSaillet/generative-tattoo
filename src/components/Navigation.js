import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap, { Power2 } from 'gsap'

const View = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	background: var(--black);
	--containerMargin: 1.7vw;
	--menuSize: 5vw;
	--menuLineSize: 1px;
	.container {
		position: relative;
		width: calc(100% - var(--containerMargin));
		height: calc(100% - var(--containerMargin));
		display: flex;
		flex-direction: column;

		/* MENU LINES */
		.navLines {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
		}
		.topNavLines {
			width: 100%;
			height: var(--menuSize);
			flex-direction: column;
			justify-content: space-between;
			.line {
				width: 100%;
				height: var(--menuLineSize);
				background: var(--white);
				transform: scaleX(0);
				transform-origin: left;
			}
		}
		.leftNavLines {
			width: var(--menuSize);
			height: 100%;
			justify-content: space-between;
			.line {
				width: var(--menuLineSize);
				height: 100%;
				background: var(--white);
				transform: scaleY(0);
				transform-origin: top;
			}
		}

		/* MENU & MAIN */
		.upperNav {
			width: 100%;
			height: var(--menuSize);
		}
		.lowerContainer {
			width: 100;
			height: calc(100% - var(--menuSize));
			display: flex;
			.leftNav {
				width: var(--menuSize);
				height: 100%;
			}
			.main {
				width: calc(100% - var(--menuSize));
				height: 100%;
			}
		}
	}
`

function Navigation() {
	let topNavLine1 = useRef(null)
	let topNavLine2 = useRef(null)
	let leftNavLine1 = useRef(null)
	let leftNavLine2 = useRef(null)

	useEffect(() => {
		gsap.to(topNavLine1.current, { duration: 1, scaleX: 1, ease: Power2.easeInOut })
		gsap.to(topNavLine2.current, { duration: 1.2, scaleX: 1, ease: Power2.easeInOut })
		gsap.to(leftNavLine1.current, { duration: 1, scaleY: 1, ease: Power2.easeInOut })
		gsap.to(leftNavLine2.current, { duration: 1.2, scaleY: 1, ease: Power2.easeInOut })
	}, [])

	return (
		<View>
			<div className="container">
				<div className="navLines topNavLines">
					<div className="line" ref={topNavLine1}></div>
					<div className="line" ref={topNavLine2}></div>
				</div>
				<div className="navLines leftNavLines">
					<div className="line" ref={leftNavLine1}></div>
					<div className="line" ref={leftNavLine2}></div>
				</div>
				<div className="upperNav"></div>
				<div className="lowerContainer">
					<div className="leftNav"></div>
					<div className="main"></div>
				</div>
			</div>
		</View>
	)
}

export default Navigation
