import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
	position: relative;
	width: calc((100vw - var(--menuSize) - var(--containerMargin)) * 0.75 / 2);
	height: calc((100vw - var(--menuSize) - var(--containerMargin)) * 0.75 / 2);
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
	.itemInterface {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		.state {
			position: relative;
			width: 126px;
			display: flex;
			justify-content: center;
			visibility: hidden;
			height: 13px;
			font-family: 'Made Outer Sans Light';
			font-size: 0.8em;
			letter-spacing: 3px;
			.prefix {
				position: absolute;
				left: 0;
				transform: translateX(-2px);
			}
			.suffix {
				position: absolute;
				right: 0;
			}
		}
		&:hover {
			.state {
				visibility: visible;
			}
		}
	}
	img {
		max-width: 80%;
		max-height: 80%;
	}
`

export default function SelectItem({ imageSource }) {
	const itemInterface = useRef(null)
	const state = useRef(null)

	const [isSelected, setIsSelected] = useState(false)
	const [canSelect, setCanSelect] = useState(false)
	const [suffixText, setSuffixText] = useState(' ?')
	const [prefixText, setPrefixText] = useState('  ')

	return (
		<Container>
			<div
				className="itemInterface"
				onClick={() => {
					if (canSelect) {
						if (isSelected) {
							itemInterface.current.style.background = 'none'
							state.current.style.visibility = 'hidden'
							setSuffixText(' ?')
							setPrefixText('  ')
							setCanSelect(false)
						} else {
							setSuffixText('ED')
						}
						setIsSelected((isSelected) => !isSelected)
					}
				}}
				onMouseEnter={() => {
					setCanSelect(true)
					itemInterface.current.style.background = 'rgba(0, 0, 0, 0.8)'
					state.current.style.visibility = 'visible'

					if (isSelected) {
						setPrefixText('UN')
						setSuffixText(' ?')
					}
				}}
				onMouseLeave={() => {
					setCanSelect(false)
					if (!isSelected) {
						itemInterface.current.style.background = 'none'
						state.current.style.visibility = 'hidden'
					} else {
						setPrefixText('  ')
						setSuffixText('ED')
					}
				}}
				ref={itemInterface}
			>
				<div className="state" ref={state}>
					<div className="prefix">{prefixText}</div>
					<div className="selectText">SELECT</div>
					<div className="suffix">{suffixText}</div>
				</div>
			</div>
			<img src={imageSource} alt="Selected design" />
		</Container>
	)
}
