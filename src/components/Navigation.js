import React from 'react'
import styled from 'styled-components'

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
		.menuLines {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
		}
		.upMenuLines {
			width: 100%;
			height: var(--menuSize);
			flex-direction: column;
			justify-content: space-between;
			.line {
				width: 100%;
				height: var(--menuLineSize);
				background: var(--white);
			}
		}
		.leftMenuLines {
			width: var(--menuSize);
			height: 100%;
			justify-content: space-between;
			.line {
				width: var(--menuLineSize);
				height: 100%;
				background: var(--white);
			}
		}
		.upperNav {
			width: 100%;
			height: var(--menuSize);
			background: grey;
		}
		.lowerContainer {
			width: 100;
			height: calc(100% - var(--menuSize));
			display: flex;
			.leftNav {
				width: var(--menuSize);
				height: 100%;
				background: darkgrey;
			}
			.main {
				width: calc(100% - var(--menuSize));
				height: 100%;
				background: gainsboro;
			}
		}
	}
`

function Navigation() {
	return (
		<View>
			<div className="container">
				<div className="menuLines upMenuLines">
					<div className="line"></div>
					<div className="line"></div>
				</div>
				<div className="menuLines leftMenuLines">
					<div className="line"></div>
					<div className="line"></div>
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
