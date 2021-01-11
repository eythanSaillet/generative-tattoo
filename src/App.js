import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SplashScreen from './components/SplashScreen/index'
import Navigation from './components/Navigation'

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/home">
					<Navigation></Navigation>
				</Route>
				<Route path="/">
					<SplashScreen></SplashScreen>
				</Route>
			</Switch>
		</Router>
	)
}

export default App
