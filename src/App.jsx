import React from 'react'
import VideoContainer from './videos/VideoContainer'
// import './style.css'
import './index.css'
import bgImg from '../src/bg6.jpg'
import { height } from '@fortawesome/free-solid-svg-icons/fa0'
const App = () => {
  return (
    <>
        <div className="bg-cover bg-center bg-no-repeat h-screen -z-1" style={{ backgroundImage: `url(${bgImg})`, width:'100%', height:'100%',  }}>
        <VideoContainer/>
        </div>
    </>
  )
}

export default App