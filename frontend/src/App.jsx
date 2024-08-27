import { Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* <Outlet />  */}
      {/* <Home /> */}
      <Admin />
      {/* <RightSection /> */}
    </div>
  );
}

export default App;
