import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeAdmin from './components/admin/HomeAdmin.jsx'
import Tracks from './components/admin/Tracks.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Genre from './components/admin/Genre.jsx'
import Artist from './components/admin/Artist.jsx'
import Album from './components/admin/Album.jsx'
import CreateAlbum from './components/admin/CreateAlbum.jsx'
import CreateGenre from './components/admin/CreateGenre.jsx'
import CreateArtist from './components/admin/CreateArtist.jsx'
import CreateTracks from './components/admin/CreateTracks.jsx'
import Home from './components/user/Home.jsx'
import AlbumUser from './components/user/AlbumUser.jsx'
import ArtistUser from './components/user/ArtistUser.jsx'
import GenreUser from './components/user/GenreUser.jsx'
import HistoryUser from './components/admin/HistoryUser.jsx'
import TracksUser from './components/user/TracksUser.jsx'
import Favorite from './components/user/Favorite.jsx'
const router = createBrowserRouter([{
  path: "/",
  element : <App />,
  children : [
    {
      path:"/",
      element : <Login />
    },
    {
      path:"/user",
      element : <Home />
    },
    {
      path:"/tracksUser",
      element : <TracksUser />
    },
    {
      path:"/albumUser",
      element : <AlbumUser />
    },
    {
      path:"/artistUser",
      element : <ArtistUser />
    },
    {
      path:"/genreUser",
      element : <GenreUser />
    },
    {
      path:"/favorite",
      element : <Favorite />
    },
    {
      path:"/signin",
      element : <SignIn />
    },
    {
      path:"/signup",
      element : <SignUp />
    },
    {
      path:"/tracks",
      element : <Tracks />
    },
    {
      path:"/genre",
      element : <Genre />
    },
    {
      path:"/artist",
      element : <Artist />
    },
    {
      path:"/album",
      element : <Album />
    },
    {
      path:"/createAlbum",
      element : <CreateAlbum />
    },
    {
      path:"/createGenre",
      element : <CreateGenre />
    },
    {
      path:"/createArtist",
      element : <CreateArtist />
    },
    {
      path:"/createTracks",
      element : <CreateTracks />
    },
    {
      path:"/historyUser",
      element : <HistoryUser />
    },
    {
      path:"/admin",
      element : <HomeAdmin />
    }
  ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
