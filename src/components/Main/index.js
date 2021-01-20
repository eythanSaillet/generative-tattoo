import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

import DesignList from './DesignList/index'

const Container = styled.div`
	width: 100%;
	height: 100%;
`

export default function Main() {
	let match = useRouteMatch()
	return (
		<Container>
			<Switch>
				<Route path={`${match.path}/:design`}></Route>
				<Route path={match.path}>
					<DesignList></DesignList>
				</Route>
			</Switch>
		</Container>
	)
}
