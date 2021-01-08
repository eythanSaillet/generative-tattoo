import React from 'react'
import SplashSketch from './SplashSketch'
import SplashTitle from './SplashTitle'

export default function SplashScreen() {
	return (
		<div>
			<SplashSketch></SplashSketch>
			<SplashTitle className="splashTitle"></SplashTitle>
		</div>
	)
}
