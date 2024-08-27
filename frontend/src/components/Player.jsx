
const Player = () => {
    return (
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="bg-gray-700 p-2 rounded hover:bg-gray-600">Previous</button>
          <button className="bg-blue-500 p-2 rounded hover:bg-blue-400">Play</button>
          <button className="bg-gray-700 p-2 rounded hover:bg-gray-600">Next</button>
        </div>
        <div className="flex items-center space-x-4">
          <img
          //   src={track?.cover || 'default-cover.jpg'}
          //   alt={track?.title || 'Track Cover'}
          src="reaxt.svg"
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            {/* <h3 className="text-lg font-semibold">{track?.title || 'Track Title'}</h3>
            <p className="text-gray-400">{track?.artist || 'Artist Name'}</p> */}
            <h3 className="bg-emerald-500">jxnsjxn</h3>
            <p>ns xns xnsx</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Player;
  