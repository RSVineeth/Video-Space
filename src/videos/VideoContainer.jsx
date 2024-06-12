// import React, { useState } from 'react'
// import VideoData from '../video.json'
// import Player from './Player'
// import VideoItem from './VideoItem'

// const VideoContainer = () => {

//   let [state,setState] = useState(VideoData)
//   console.log(state);

//   let[vid,setVid] =useState(
//     "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//   )

//   let [title,setTitle] = useState("Big Buck Bunny")
  
//   return (
//     <section className='videoBlock'>
//       <aside className='left'>
//         <Player data={{state,vid,title}}/>
//       </aside>
//       <aside className='right'>
//         {state.map((video) => {
//           return <VideoItem  key={video.id} data={{video,setVid,setTitle}}/>
//         })}
//       </aside>
//     </section>
//   )
// }

// export default VideoContainer


import React, { useState } from 'react';
import VideoData from '../video.json';
import Player from './Player';
import VideoItem from './VideoItem';

const VideoContainer = () => {
  const [state, setState] = useState(VideoData);
  const [vid, setVid] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
  const [title, setTitle] = useState("Big Buck Bunny");

  return (
    <section className="flex">
      <aside className="w-3/4 p-4">
        <Player data={{ state, vid, title }} />
      </aside>
      <aside className="w-1/4 p-4 overflow-y-auto">
        {state.map((video) => (
          <VideoItem key={video.id} data={{ video, setVid, setTitle }} />
        ))}
      </aside>
    </section>
  );
};

export default VideoContainer;

