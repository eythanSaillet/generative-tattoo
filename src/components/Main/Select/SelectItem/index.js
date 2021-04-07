import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	width: calc((100vw - var(--menuSize) - var(--containerMargin)) * 0.75 / 3);
	height: calc((100vw - var(--menuSize) - var(--containerMargin)) * 0.75 / 3);
	border: red 1px solid;
`

export default function SelectItem({}) {
	return <Container></Container>
}
