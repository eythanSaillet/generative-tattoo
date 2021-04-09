import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'

import DesignList from './DesignList/index'
import Custom from './Custom/index'
import Select from './Select/index'

const Container = styled.div`
	width: 100%;
	height: 100%;
`

export default function Main({ navTitleRef }) {
	const lastLocation = useLastLocation()

	return (
		<Container>
			<Switch>
				<Route path={`/choose/:design`}>
					<Custom navTitleRef={navTitleRef} delay={lastLocation === null ? 0 : -1.15} />
				</Route>
				<Route path={'/choose'}>
					<DesignList navTitleRef={navTitleRef} delay={lastLocation === null || lastLocation.pathname === '/' ? 0 : -0.9} />
				</Route>
				<Route path={'/select'}>
					<Select />
				</Route>
			</Switch>
		</Container>
	)
}
