import './App.css';
import {
  LandingPage, LessonLobby, AboutUs, Conversation1
 } from './ui-components';
 import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/">
          // TODO get all of these looking good on the same size frame
          <Route index element={<LandingPage display="flex"/>} />
          // TODO get AboutUs looking good
          <Route path="about-us" element={<AboutUs display="flex"/>} />
          <Route path="lobby" element={<LessonLobby display="flex"/>} />
          // TODO get this working
          <Route path="conversation1" element={<Conversation1 display="flex"/>} />
          // TODO add conversation2 path
          <Route path="*" element={<NoPage display="flex"/>} />
          // TODO add page for conversing and popup modal
        </Route>
      </Routes>
    </BrowserRouter>
     </div>
  );
}

export default App;

const NoPage = () => {
  return <h1>404 Not Found</h1>;
};