// import React from 'react'

// const VideoItem = (props) => {
//   console.log(props);



//   let {title,thumbnailUrl,videoUrl,author} = props.data.video;

//   let {setVid} = props.data;

//   let {setTitle} = props.data;

//   let changeVideo = () => {
//     setVid(videoUrl)
//     setTitle(title)
//   }

//   return (
//     <div className='videoItem'>
//       <img src={thumbnailUrl} alt={title} className='rightimg' onClick={changeVideo} />
//       <h1 className='author'>Author: {author}</h1>
//     </div>
//   )
// }

// export default VideoItem


// // import React from 'react';

// // const VideoItem = (props) => {
// //   // console.log(props);

// //   const videoData = props.data.video;

// //   if (!videoData) {
// //     // Handle the case where props.data.video is undefined
// //     return null;
// //   }

// //   const { title, thumbnailUrl, videoUrl, author } = videoData;
// //   const { setVid, setTitle } = props.data;

// //   const changeVideo = () => {
// //     setVid(videoUrl);
// //     setTitle(title);
// //   };

// //   return (
// //     <div className='videoItem'>
// //       <img src={thumbnailUrl} alt={title} className='rightimg' onClick={changeVideo} />
// //       <h1 className='author'>Author: {author}</h1>
// //     </div>
// //   );
// // };

// // export default VideoItem;


import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const VideoItem = (props) => {
  const { title, thumbnailUrl, videoUrl, author } = props.data.video;
  const { setVid, setTitle } = props.data;

  const changeVideo = () => {
    setVid(videoUrl);
    setTitle(title);

      // Automatically play the video
      const video = document.getElementById('videoPlayer');
      if (video) {
        video.src = videoUrl; // Set the video source
        video.play();
      }
  };

  return (
    <div className="max-w-xs mx-auto overflow-hidden shadow-lg mb-4 hover:shadow-xl transition duration-300 transform hover:scale-105 ">
      {/* <img src={thumbnailUrl} alt={title} className="w-full cursor-pointer hover:opacity-75" onClick={changeVideo} /> */}
      <LazyLoadImage
        src={thumbnailUrl}
        alt={title}
        effect="blur" // Add a blur effect while loading
        className="w-full cursor-pointer hover:opacity-75"
        onClick={changeVideo}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 sm:text-lg line-clamp-2">{title}</div>
        <p className="text-black-700 text-base line-clamp-2">Author: {author}</p>
      </div>
    </div>
  );
};

export default VideoItem;
