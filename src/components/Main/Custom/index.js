import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import gsap, { Power1, Power2 } from 'gsap'
import { useHistory } from 'react-router-dom'

import config from '../../../assets/config.json'
import Trackbar from './Trackbar'
import AnimatedText from '../../utils/AnimatedText'
import AnimatedSentence from '../../utils/AnimatedSentence'
import Sketch from './Sketch'
import Button from '../../utils/Button'
import DesignTitle from '../../utils/DesignTitle'
import { ReactComponent as NewKeyButtonImage } from '../../../assets/newKey.svg'

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	.leftContainer {
		position: relative;
		width: 75%;
		height: 100%;
		.returnButton {
			position: absolute;
			top: 35px;
			left: 40px;
		}
		.designTitleContainer {
			position: absolute;
			bottom: 54px;
			left: 60px;
		}
	}
	.line {
		width: var(--menuLineSize);
		height: 100%;
		background: var(--white);
		transform-origin: top;
		transform: scaleY(0);
	}
	.rightContainer {
		width: calc(25% - var(--menuLineSize));
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 35px;
		.customSentenceContainer {
			width: 80%;
			margin-bottom: 35px;
		}
		.keyInput {
			position: relative;
			width: 80%;
			height: 40px;
			display: flex;
			margin-bottom: 42px;
			.keyInputMask {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: var(--black);
				transform-origin: right;
			}
			.input {
				width: calc(100% - 40px);
				height: 100%;
				color: var(--white);
				border: 1px solid var(--white);
				background: var(--black);
				padding: 0 10px;
				font-size: 1.2em;
				letter-spacing: 3px;
				&:focus {
					outline: none;
				}
			}
			.newKeyButton {
				width: 40px;
				height: 100%;
				border-top: 1px solid var(--white);
				border-right: 1px solid var(--white);
				border-bottom: 1px solid var(--white);
				background: var(--black);
				display: flex;
				justify-content: center;
				align-items: center;
				user-select: none;
				cursor: pointer;
				svg {
					width: 50%;
					fill: var(--white);
				}
				&:hover {
					background: var(--white);
					svg {
						fill: var(--black);
					}
				}
				&:active {
					svg {
						fill: var(--white);
					}
				}
			}
		}
		.trackbarsContainer {
			width: 100%;
			height: 0;
			overflow: hidden;
		}
	}
`

export default function Custom({ navTitleRef, delay }) {
	const line = useRef(null)
	const returnButton = useRef(null)
	const sketch = useRef(null)
	const keyInput = useRef(null)
	const keyInputMask = useRef(null)
	const customSentence = useRef(null)
	const customSentenceContainer = useRef(null)
	const trackbarsContainer = useRef(null)
	const customButton = useRef(null)

	const [buttonIsDisable, setButtonIsDisable] = useState(true)
	const [isFirstTimeGenerated, setIsFirstTimeGenerated] = useState(false)

	const history = useHistory()

	// Get design config
	let design
	const slug = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1)
	for (const _design of config) {
		if (_design.slug === slug) {
			design = _design
		}
	}

	// Create trackbars
	let trackbars = []
	for (let i = 0; i < design.options.length; i++) {
		trackbars.push(
			<Trackbar text={design.options[i].name} varName={design.options[i].varName} range={design.options[i].range} decimals={design.options[i].decimals} initialValue={design.options[i].initialValue} delay={0.5 + 0.2 * i} sketch={sketch} key={i} setButtonIsDisable={setButtonIsDisable} />
		)
	}

	function updateGenerateButton() {
		keyInput.current.value.length > 0 ? setButtonIsDisable(false) : setButtonIsDisable(true)
	}

	function transitionToTrackbars() {
		setIsFirstTimeGenerated(true)
		customSentence.current.remove()
		gsap.to(customSentenceContainer.current, { duration: 1.3, height: 0, marginBottom: 0, delay: 0.27, ease: Power2.easeInOut })
		gsap.to(trackbarsContainer.current, { duration: 1.5, height: 'auto', marginBottom: '25px', delay: 0.2, ease: Power2.easeInOut })
	}

	useEffect(() => {
		gsap.to(line.current, { duration: 1.2, scaleY: 1, ease: Power1.easeOut, delay: delay + 1.2 })
		gsap.to(keyInputMask.current, { duration: 1, scaleX: 0, ease: Power1.easeInOut, delay: delay + 1.7 })
	}, [delay])

	return (
		<Container>
			<div className="leftContainer">
				<div
					className="returnButton"
					onClick={() => {
						// Change title
						navTitleRef.current.replace('CHOOSE')

						// Remove custom interface
						returnButton.current.remove()
						gsap.to(line.current, { duration: 0.7, scaleY: 0, ease: Power1.easeOut, delay: 0.3 })
						customSentence.current.remove(0.25)

						// Go back to choose interface
						setTimeout(() => {
							history.goBack()
						}, 2100)
					}}
				>
					<AnimatedText text="RETURN" type="link" stagger={0.03} delay={delay * 1000 + 1200} hover={true} ref={returnButton} />
				</div>
				<Sketch delay={delay + 2} ref={sketch} />
				<div className="designTitleContainer">
					<DesignTitle index={design.index} text={design.title} displayAnim={delay === 0 ? true : false} delay={delay === 0 ? -1 : 0} />
				</div>
			</div>
			<div className="line" ref={line}></div>
			<div className="rightContainer">
				<div className="customSentenceContainer" ref={customSentenceContainer}>
					<AnimatedSentence delay={delay * 1000 + 1200} text="There is an infinity of patterns, each of them is attached to a key. Enter a key or generate one randomly for a statistically unique result." ref={customSentence} />
				</div>
				<div className="keyInput">
					<div className="keyInputMask" ref={keyInputMask} />
					<input
						onChange={(e) => {
							e.target.value = e.target.value.toUpperCase()

							updateGenerateButton()
						}}
						onBlur={() => {
							// Encode the key
							let randomKeyCode = ''
							for (let i = 0; i < keyInput.current.value.length; i++) {
								randomKeyCode += keyInput.current.value.charCodeAt(i)
							}

							// Update the system
							sketch.current.updateValue('noiseSeed', randomKeyCode)
						}}
						className="input"
						type="text"
						ref={keyInput}
					/>
					<div
						className="newKeyButton"
						onClick={() => {
							// Generate random key
							const keyPossibility = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
							let randomKey = ''
							let randomKeyCode = ''
							for (let i = 0; i < 10; i++) {
								randomKey += keyPossibility[Math.floor(Math.random() * keyPossibility.length)]
								randomKeyCode += randomKey.charCodeAt(i)
							}

							// Update input
							keyInput.current.value = randomKey

							// Update system
							sketch.current.updateValue('noiseSeed', randomKeyCode)

							if (!isFirstTimeGenerated) {
								updateGenerateButton()
							} else {
								sketch.current.generate()
							}
						}}
					>
						<NewKeyButtonImage />
					</div>
				</div>
				<div className="trackbarsContainer" ref={trackbarsContainer}>
					{isFirstTimeGenerated && trackbars}
				</div>
				<div
					style={{ width: '80%' }}
					onClick={() => {
						if (!buttonIsDisable) {
							sketch.current.generate()

							setButtonIsDisable(true)

							if (!isFirstTimeGenerated) {
								transitionToTrackbars()
								customButton.current.replaceText('APPLY')
							}
						}
					}}
				>
					<Button text="GENERATE" delay={delay + 2.2} enable={!buttonIsDisable} ref={customButton} />
				</div>
			</div>
		</Container>
	)
}
