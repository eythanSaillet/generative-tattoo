import React from 'react'
import styled from 'styled-components'

import DesignList from './DesignList/index'

const Container = styled.div`
	width: 100%;
	height: 100%;
`

export default function Main() {
	return (
		<Container>
			<DesignList></DesignList>
		</Container>
	)
}
