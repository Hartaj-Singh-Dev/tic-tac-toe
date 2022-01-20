import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Partcles = ()=> {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
      gravity={2}
    />
  )
}
export default Partcles;