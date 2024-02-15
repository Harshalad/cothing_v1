
import React from 'react'
import ReactPlayer from 'react-player'
const VideoPlayer = ({link}:any) => {

    return (
      
        <ReactPlayer url={link} playing={true}   config={{ file: { attributes: { controlsList: 'nodownload' } } }}

        // Disable right click
        onContextMenu={(e:any) => e.preventDefault()}

        className="react-player"
        controls
        width="100%"
        height="60vh" />
   
    )
}

export default VideoPlayer;
