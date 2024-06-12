// // import React from 'react'

// import { useRef, useState } from "react";

// const Player = (props) => {
//     console.log(props);

//     let [play,setPlay] =useState()
    
//     let {data:{state,title,vid},} = props;
//     // console.log(state);

//     let videoRef = useRef()

//     let PlayerPause = () => {
//         videoRef.current.autoplay=true;
//         setPlay(!play);
//         if (play==true) {
//             videoRef.current.play();
//         }
//         else {
//             videoRef.current.pause();
//         }
//     }

//     let playVid = () => {
//         videoRef.current.play();
//     }

//     let pauseVid= () => {
//         videoRef.current.pause();
//     }

//     return (
//         <div>
//             <h1>Video Player</h1>
//             <video src={vid} className="leftVideo" ref={videoRef} onClick={PlayerPause}></video>
//             <h2>{title}</h2>
//             {/* <button onClick={playVid}>Play</button>
//             <button onClick={pauseVid}>Pause</button> */}
//         </div>
//     )
// }

// export default Player


import React, { useRef, useState, useEffect } from "react";
import { faPlay, faPause, faStepForward, faStepBackward, faExpand, faCompress, faShare, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

const Player = (props) => {
    const [play, setPlay] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const videoRef = useRef();

    useEffect(() => {
        videoRef.current.play();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'ArrowLeft') {
                skipBackward();
            } else if (event.code === 'ArrowRight') {
                skipForward();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const playPauseToggle = () => {
        setPlay(!play);
        if (!play) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const playNextVideo = () => {
        const nextIndex = (currentVideoIndex + 1) % props.data.state.length;
        setCurrentVideoIndex(nextIndex);
        setPlay(true);
        videoRef.current.src = props.data.state[nextIndex].videoUrl;
        videoRef.current.play();
    };

    const playPreviousVideo = () => {
        const previousIndex = (currentVideoIndex - 1 + props.data.state.length) % props.data.state.length;
        setCurrentVideoIndex(previousIndex);
        setPlay(true);
        videoRef.current.src = props.data.state[previousIndex].videoUrl;
        videoRef.current.play();
    };

    const skipForward = () => {
        videoRef.current.currentTime += 5;
    };

    const skipBackward = () => {
        videoRef.current.currentTime -= 5;
    };

    const toggleFullscreen = () => {
        const exitFullscreenHandler = () => {
            setFullscreen(false);
            document.removeEventListener("fullscreenchange", exitFullscreenHandler);
        };
    
        if (!fullscreen) {
            document.addEventListener("fullscreenchange", exitFullscreenHandler);
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.mozRequestFullScreen) {
                videoRef.current.mozRequestFullScreen();
            } else if (videoRef.current.webkitRequestFullscreen) {
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.msRequestFullscreen) {
                videoRef.current.msRequestFullscreen();
            }
            setFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setFullscreen(false);
        }
    };
    

    const handleChangePlaybackSpeed = (speed) => {
        videoRef.current.playbackRate = speed;
    };

    const handleShareClick = () => {
        setShowShareOptions(!showShareOptions);
    };

    const copyVideoLink = () => {
        navigator.clipboard.writeText(props.data.vid);
    };

    return (
        <div className="text-center top-0 z-10 sticky relative fixed">
            <h1 className="text-3xl font-bold mb-2">Video Player - {props.data.title}</h1>
            <div className="relative aspect-w-16 aspect-h-9 overflow-hidden" onClick={playPauseToggle}>
                <video
                    src={props.data.vid}
                    ref={videoRef}
                    onClick={() => setPlay(!play)}
                    className="top-0 left-0 w-full h-full object-cover"
                    style={{ width: '97%', height: '100%' }}
                    id="videoPlayer"
                    onEnded={playNextVideo}
                    autoPlay
                ></video>
                <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${!play ? 'opacity-100' : 'opacity-0'}`}>
                    <button onClick={skipBackward}><FontAwesomeIcon icon={faStepBackward} className="text-blue-800 text-5xl" /></button>
                    <button onClick={playPreviousVideo}><FontAwesomeIcon icon={faStepBackward} className="text-blue-800 text-5xl" /></button>
                    <button onClick={playPauseToggle} className="mx-4">{!play ? <FontAwesomeIcon icon={faPause} className="text-black-400 text-4xl" /> : <FontAwesomeIcon icon={faPlay} className="text-gray-400 text-4xl" />}</button>
                    <button onClick={skipForward}><FontAwesomeIcon icon={faStepForward} className="text-blue-800 text-5xl" /></button>
                    <button onClick={playNextVideo}><FontAwesomeIcon icon={faStepForward} className="text-blue-800 text-5xl" /></button>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button onClick={toggleFullscreen} className="mx-4">
                    {!fullscreen ? <FontAwesomeIcon icon={faExpand} className="text-gray-400 text-2xl" /> : <FontAwesomeIcon icon={faCompress} className="text-gray-400 text-2xl" />}
                </button>
                <div className="relative">
                    <select onChange={(e) => handleChangePlaybackSpeed(parseFloat(e.target.value))} defaultValue="1" className="appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/></svg>
                    </div>
                </div>
                <button onClick={handleShareClick} className="mx-4">
                    <FontAwesomeIcon icon={faShare} className="text-gray-400 text-2xl" />
                </button>
            </div>
            {showShareOptions && (
                <div className="flex flex-col items-center mt-2 mr-2 bg-white rounded-lg shadow-lg">
                    <WhatsappShareButton url={props.data.vid}>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200">Share via WhatsApp</button>
                    </WhatsappShareButton>
                    <FacebookShareButton url={props.data.vid} quote={props.data.title}>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200">Share on Facebook</button>
                    </FacebookShareButton>
                    <TwitterShareButton url={props.data.vid} title={props.data.title}>
                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200">Share on Twitter</button>
                    </TwitterShareButton>
                    {/* <button onClick={copyVideoLink} className="block w-full px-4 py-2 text-left hover:bg-gray-200">Copy Video Link</button> */}
                </div>
            )}
        </div>
    );
};

export default Player;




