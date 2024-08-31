// import React from "react";

// const Player = () => {
//   return (
//     <div className="flex items-center justify-between p-5 bg-gray-900 text-white h-32 border-t border-gray-700">
//       <div className="trackDetails flex items-center gap-2.5 w-72">
//         <img src="/path/to/track-image.png" alt="Track" className="w-20 h-20 object-cover" />
//         <div className="title flex flex-col">
//           <div className="text-xl font-bold">Track Title</div>
//           <div className="text-gray-500">Artist Name</div>
//         </div>
//       </div>
//       <div className="playerControls flex flex-col items-center">
//         <div className="playerBtns text-3xl mb-5">
//           <i className="fa fa-play"></i>
//           <i className="fa fa-pause mx-2"></i>
//           <i className="fa fa-stop"></i>
//         </div>
//         <div className="trackSeeker relative w-96">
//           <input type="range" id="seeker" className="w-full" />
//           <div className="currTrackTime absolute top-[-25px] left-0 text-sm">0:00</div>
//           <div className="currTrackTotalTime absolute top-[-25px] right-0 text-sm">4:00</div>
//         </div>
//       </div>
//       <div className="playerVolume flex items-center gap-1.5 text-white">
//         <i className="fa fa-volume-up cursor-pointer"></i>
//         <i className="fa fa-volume-down cursor-pointer"></i>
//       </div>
//     </div>
//   );
// };

// export default Player;

const Player = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div>
          <h3 className="text-lg font-bold">Now Playing</h3>
          <p className="text-sm text-gray-400">Song Title - Artist Name</p>
        </div>
        <div className="trackSeeker relative w-96">
          <input type="range" id="seeker" className="w-full" />
           <div className="currTrackTime absolute top-[-25px] left-0 text-sm">0:00</div>
           <div className="currTrackTotalTime absolute top-[-25px] right-0 text-sm">4:00</div>
         </div>
        <div className="flex items-center space-x-4">
          {/* Kontrol player seperti play, pause, skip, dsb */}
          <button className="hover:text-gray-400">⏮️</button>
          <button className="hover:text-gray-400">⏯️</button>
          <button className="hover:text-gray-400">⏭️</button>
        </div>
      </div>
    </div>
  );
};

export default Player;
