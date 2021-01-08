import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap, { Power2 } from 'gsap'

import AnimatedText from './AnimatedText'

const View = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	background: var(--black);
	--containerMargin: 35px;
	--menuSize: 100px;
	--menuLineSize: 1px;
	.container {
		position: relative;
		width: calc(100% - var(--containerMargin));
		height: calc(100% - var(--containerMargin));
		display: flex;
		flex-direction: column;

		/* NAV LINES */
		.navLines {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			pointer-events: none;
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

		/* NAV & MAIN */
		.upperNav {
			width: 100%;
			height: var(--menuSize);
			display: flex;
			.icon {
				width: var(--menuSize);
				height: 100%;
			}
			.titleContainer {
				width: calc(80% - var(--menuSize));
				height: 100%;
				display: flex;
				align-items: center;
				padding-left: 35px;
			}
			.line {
				width: var(--menuLineSize);
				height: 100%;
				background: var(--white);
				transform: scaleY(0);
				transform-origin: top;
			}
			.selectionButtonContainer {
				width: calc(20% - var(--menuLineSize));
				height: 100%;
			}
		}
		.lowerContainer {
			width: 100;
			height: calc(100% - var(--menuSize));
			display: flex;
			.leftNav {
				width: var(--menuSize);
				height: 100%;
				display: flex;
				align-items: flex-end;
				.linksContainer {
					width: 100%;
					height: 180px;
					margin-bottom: 90px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
				}
			}
			.main {
				width: calc(100% - var(--menuSize));
				height: 100%;
			}
		}
	}
`

export default function Navigation() {
	let topNavLine1 = useRef(null)
	let topNavLine2 = useRef(null)
	let topNavLine3 = useRef(null)
	let leftNavLine1 = useRef(null)
	let leftNavLine2 = useRef(null)

	useEffect(() => {
		gsap.to(topNavLine1.current, { duration: 1.3, scaleX: 1, ease: Power2.easeInOut })
		gsap.to(topNavLine2.current, { duration: 1.8, scaleX: 1, ease: Power2.easeInOut })
		gsap.to(leftNavLine1.current, { duration: 1.1, scaleY: 1, ease: Power2.easeInOut })
		gsap.to(leftNavLine2.current, { duration: 1.6, scaleY: 1, ease: Power2.easeInOut })
		gsap.to(topNavLine3.current, { duration: 0.3, delay: 0.75, scaleY: 1, ease: Power2.easeInOut })
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
				<div className="upperNav">
					<div className="icon"></div>
					<div className="titleContainer">
						<AnimatedText text="SELECT YOUR DESIGN" type="title" stagger={0.03} delay={600}></AnimatedText>
					</div>
					<div className="line" ref={topNavLine3}></div>
					<div className="selectionButtonContainer"></div>
				</div>
				<div className="lowerContainer">
					<div className="leftNav">
						<div className="linksContainer">
							<AnimatedText text="INFOS" type="navLink" stagger={-0.05} delay={500}></AnimatedText>
							<AnimatedText text="INSTAGRAM" type="navLink" stagger={-0.05} delay={600}></AnimatedText>
						</div>
					</div>
					<div className="main"></div>
				</div>
			</div>
		</View>
	)
}
