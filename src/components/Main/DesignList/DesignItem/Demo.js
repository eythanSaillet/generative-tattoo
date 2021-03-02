import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

import NoiseStainVideoSource from '../../../../assets/demoVideo/noiseStain.webm'

const Container = styled.div`
	width: 60%;
	margin-bottom: 10%;
	video {
		width: 100%;
	}
`

const Demo = forwardRef((props, ref) => {
	let video = useRef(null)

	useImperativeHandle(ref, () => ({
		play() {
			video.current.play()
		},
		pause() {
			video.current.pause()
		},
	}))

	return (
		<Container>
			<video ref={video}>
				<source src={NoiseStainVideoSource} type="video/mp4" />
			</video>
		</Container>
	)
})
export default Demo
