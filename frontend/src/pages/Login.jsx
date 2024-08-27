
const Login = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black text-white">
      <img
        src="img/gif/colorful-wave.gif"
        alt=""
        className="absolute bottom-0 left-0 w-full h-[500px] mix-blend-color-dodge z-[-9]"
      />
      <div className="flex flex-col items-center w-[350px]">
        <div className="flex flex-col items-center mb-8">
          <a href="#" className="text-purple-500 text-6xl font-bold flex items-center gap-2 mb-2 cursor-pointer">
            <img src="img/icons/purple-play-button.png" alt="" className="w-[100px] h-[100px] object-cover" />
            Musicly
          </a>
          <p className="text-gray-400 text-center">
            Musicly is a digital music service that gives you access to millions of songs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            to="/login"
            className="bg-white text-black py-2 px-4 rounded-full font-bold transition-colors duration-300 hover:border hover:border-gray-300 hover:bg-transparent"
          >
            Log in
          </a>
          <a
            to="/signup"
            className="bg-white text-black py-2 px-4 rounded-full font-bold transition-colors duration-300 hover:border hover:border-gray-300 hover:bg-transparent"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
