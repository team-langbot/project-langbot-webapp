import './App.css';
import {
  LandingPage, LessonLobby, AboutUs, Conversation1
 } from './ui-components';
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { API } from 'aws-amplify';

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
  const apiName = 'projectLangbotApi'; // replace this with your api name.
  const path = '/text'; //replace this with the path you have configured on your API
  const myInit = {
    body: {"conversationId": 2, "stepNumber": 1, "attemptNumber": 1, "text": "hola"},
    headers: {} // OPTIONAL
  };
  
  API.post(apiName, path, myInit)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });
  return <h1>404 Not Found</h1>;
};