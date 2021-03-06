import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

import DisturbedLinesVideoSource from '../../../../assets/demoVideo/disturbedLines.webm'
import NoiseStainVideoSource from '../../../../assets/demoVideo/noiseStain.webm'

const videoSources = [DisturbedLinesVideoSource, NoiseStainVideoSource, DisturbedLinesVideoSource]

const Container = styled.div`
	width: 60%;
	margin-bottom: 10%;
	video {
		width: 100%;
	}
`

const Demo = forwardRef(({ index }, ref) => {
	let video = useRef(null)

	useImperativeHandle(ref, () => ({
		play() {
			video.current.play()
		},
		pause() {
			video.current.pause()
		},
	}))
	console.log(index, videoSources[parseInt(index)])

	return (
		<Container>
			<video
				ref={video}
				loop
				onPause={() => {
					video.current.currentTime -= 0.001
				}}
			>
				<source src={videoSources[parseInt(index)]} type="video/mp4" />
			</video>
		</Container>
	)
})
export default Demo
