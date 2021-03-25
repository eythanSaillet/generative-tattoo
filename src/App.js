import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'

import SplashScreen from './components/SplashScreen/index'
import Navigation from './components/Navigation'

function App() {
	return (
		<Router>
			<LastLocationProvider>
				<Switch>
					<Route path="/choose">
						<Navigation></Navigation>
					</Route>
					<Route path="/">
						<SplashScreen></SplashScreen>
					</Route>
				</Switch>
			</LastLocationProvider>
		</Router>
	)
}

export default App
