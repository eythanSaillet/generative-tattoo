import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import styled from 'styled-components'

import DisturbedLinesVideoSource from '../../../../assets/demoVideo/disturbedLines.webm'
import DisturbedLinesTransitionOutVideoSource from '../../../../assets/demoVideo/disturbedLinesTransitionOut.webm'
import DisturbedLinesTransitionInVideoSource from '../../../../assets/demoVideo/disturbedLinesTransitionIn.webm'

// import NoiseStainVideoSource from '../../../../assets/demoVideo/noiseStain.webm'

const demoVideoSources = [
	[DisturbedLinesTransitionInVideoSource, DisturbedLinesVideoSource, DisturbedLinesTransitionOutVideoSource],
	[DisturbedLinesTransitionInVideoSource, DisturbedLinesVideoSource, DisturbedLinesTransitionOutVideoSource],
	[DisturbedLinesTransitionInVideoSource, DisturbedLinesVideoSource, DisturbedLinesTransitionOutVideoSource],
]

const Container = styled.div`
	position: relative;
	width: 60%;
	margin-bottom: 10%;
	video {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(-50%);
		border: 2px solid var(--black);
	}
	.displayNone {
		display: none;
	}
`

const Demo = forwardRef(({ index, delay }, ref) => {
	const videoIn = useRef(null)
	const video = useRef(null)
	const videoOut = useRef(null)

	const [videoIsTransitioning, setVideoIsTransitioning] = useState(true)
	const [videoIsTrigger, setVideoIsTrigger] = useState(false)

	const videoSources = demoVideoSources[parseInt(index)]

	useEffect(() => {
		setTimeout(() => {
			if (videoIn.current != null) {
				videoIn.current.play()
			}
		}, 750 * index + 1000 + delay)
	}, [index, delay])

	useImperativeHandle(ref, () => ({
		play() {
			setVideoIsTrigger(true)
			if (!videoIsTransitioning) {
				video.current.play()
			}
		},
		pause() {
			setVideoIsTrigger(false)
			video.current.pause()
		},
		out() {
			videoOut.current.style.display = 'block'
			video.current.pause()
			video.current.style.display = 'none'
			videoOut.current.play()
		},
	}))

	return (
		<Container>
			<video className="displayNone" muted src={videoSources[2]} ref={videoOut} />
			<video className="displayNone" loop muted src={videoSources[1]} ref={video} />
			<video
				muted
				onEnded={() => {
					video.current.style.display = 'block'
					videoIn.current.style.display = 'none'
					setVideoIsTransitioning(false)
					if (videoIsTrigger) {
						video.current.play()
					}
				}}
				src={videoSources[0]}
				ref={videoIn}
			/>
		</Container>
	)
})
export default Demo
