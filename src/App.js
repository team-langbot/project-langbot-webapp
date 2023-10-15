import './App.css';
import {
  LandingPage1, LessonLobby2, AboutUs
 } from './ui-components';
 import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/">
          <Route index element={<LandingPage1 />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="lobby" element={<LessonLobby2 />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
     </div>
  );
}

export default App;

// TODO move layout and no page to another page -- create a pages directory
// TODO remove layout if not necessary
const RouterLayout = () => {
  // TODO make this layout nice
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/lobby">Lobby</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

const NoPage = () => {
  return <h1>404 Not Found</h1>;
};