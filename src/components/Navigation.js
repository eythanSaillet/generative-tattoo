import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import gsap, { Power2 } from 'gsap'
import { Route, Switch } from 'react-router'
import { useHistory } from 'react-router-dom'

import Main from './Main'
import AnimatedText from './utils/AnimatedText'
import SelectNavButton from './SelectNavButton'
import AnimatedLogoSource from '../assets/animatedLogo.webm'

const View = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	background: var(--black);
	/* position: fixed; */
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
			> .line {
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
			> .line {
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
			user-select: none;
			.logoContainer {
				width: var(--menuSize);
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				.logo {
					width: 60%;
					height: 60%;
					opacity: 0;
					transform: rotate(45deg);
					video {
						width: 100%;
						height: 100%;
					}
				}
			}
			.titleContainer {
				width: calc(80% - var(--menuSize));
				height: 100%;
				display: flex;
				align-items: center;
				padding-left: 35px;
				> div {
					transition: all 0.5s;
				}
			}
			.selectionButtonContainer {
				position: relative;
				width: 20%;
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
				user-select: none;
				.linksContainer {
					width: 100%;
					height: 175px;
					margin-bottom: 90px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
				}
			}
			.main {
				position: relative;
				width: calc(100% - var(--menuSize));
				height: 100%;
				overflow: hidden;
				.selectionTransitionOverlay {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: calc(100% + var(--menuLineSize));
					background: var(--black);
					z-index: 10;
					border-bottom: 1px solid var(--white);
					transform: translateY(-100%);
				}
			}
		}
	}
`

export default function Navigation() {
	// Nav lines refs
	const topNavLine1 = useRef(null)
	const topNavLine2 = useRef(null)
	const leftNavLine1 = useRef(null)
	const leftNavLine2 = useRef(null)
	// Logo refs
	const logo = useRef(null)
	const animatedLogo = useRef(null)
	// Nav title ref
	const navTitle = useRef(null)

	const selectionTransitionOverlay = useRef(null)
	const selectionIsTransitioning = useRef(false)

	const [isInSelection, setIsInSelection] = useState(false)

	let history = useHistory()

	useEffect(() => {
		// Play logo animation
		setTimeout(() => {
			logo.current.style.opacity = 1
			animatedLogo.current.play()
		}, 400)
		// Draw nav lines
		gsap.to(topNavLine1.current, { duration: 1.3, scaleX: 1, ease: Power2.easeInOut })
		gsap.to(topNavLine2.current, { duration: 1.8, scaleX: 1, ease: Power2.easeInOut })
		gsap.to(leftNavLine1.current, { duration: 1.1, scaleY: 1, ease: Power2.easeInOut })
		gsap.to(leftNavLine2.current, { duration: 1.6, scaleY: 1, ease: Power2.easeInOut })
		// Set isInSelection state from path
		if (window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) === 'select') {
			setIsInSelection(true)
		}
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
					<div
						className="logoContainer"
						onMouseEnter={() => {
							animatedLogo.current.play()
						}}
					>
						<div className="logo" ref={logo}>
							<video
								muted
								src={AnimatedLogoSource}
								ref={animatedLogo}
								onTimeUpdate={() => {
									if (animatedLogo.current.currentTime === animatedLogo.current.duration) {
										animatedLogo.current.currentTime = 0
									}
								}}
							></video>
						</div>
					</div>
					<div className="titleContainer">
						<Switch>
							<Route path="/select">
								<AnimatedText text="SELECT" type="navTitle" stagger={0.03} delay={600} hover={false} ref={navTitle}></AnimatedText>
							</Route>
							<Route path="/choose/:design">
								<AnimatedText text="CUSTOM" type="navTitle" stagger={0.03} delay={600} hover={false} ref={navTitle}></AnimatedText>
							</Route>
							<Route path="/choose">
								<AnimatedText text="CHOOSE" type="navTitle" stagger={0.03} delay={600} hover={false} ref={navTitle}></AnimatedText>
							</Route>
						</Switch>
						<AnimatedText text=" YOUR DESIGN" type="navTitle" stagger={0.03} delay={830} hover={false}></AnimatedText>
					</div>
					<div
						className="selectionButtonContainer"
						onClick={() => {
							if (!selectionIsTransitioning.current) {
								selectionIsTransitioning.current = true
								if (!isInSelection) {
									navTitle.current.replace('SELECT')
									gsap.fromTo(
										selectionTransitionOverlay.current,
										{ translateY: '-100%' },
										{
											duration: 1.5,
											translateY: '0%',
											ease: Power2.easeInOut,
											onComplete: () => {
												history.push('/select')
												selectionIsTransitioning.current = false
												selectionTransitionOverlay.current.style.transform = 'translateY(-100%)'
											},
										}
									)
								} else {
									navTitle.current.replace('CHOOSE')
									history.push('/choose')
									gsap.fromTo(
										selectionTransitionOverlay.current,
										{ translateY: '0%' },
										{
											duration: 1.5,
											translateY: '-100%',
											ease: Power2.easeInOut,
											onComplete: () => {
												selectionIsTransitioning.current = false
											},
										}
									)
								}
								setIsInSelection(!isInSelection)
							}
						}}
					>
						<SelectNavButton isInSelection={isInSelection} />
					</div>
				</div>
				<div className="lowerContainer">
					<div className="leftNav">
						<div className="linksContainer">
							<AnimatedText text="INFOS" type="navLink" stagger={-0.05} delay={500} hover={true}></AnimatedText>
							<AnimatedText text="INSTAGRAM" type="navLink" stagger={-0.05} delay={600} hover={true}></AnimatedText>
						</div>
					</div>
					<div className="main">
						<div className="selectionTransitionOverlay" ref={selectionTransitionOverlay} />
						<Main navTitleRef={navTitle}></Main>
					</div>
				</div>
			</div>
		</View>
	)
}
