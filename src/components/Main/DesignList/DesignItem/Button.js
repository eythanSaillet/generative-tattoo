import React from 'react'
import styled from 'styled-components'

const Container = styled.div``

export default function Button() {
	return <Container onMouseEnter={console.log('hey')}></Container>
}
