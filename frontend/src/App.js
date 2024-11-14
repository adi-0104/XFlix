// import logo from './logo.svg';
// import './App.css';
import LandingPage from "./components/LandingPage";
import VideoPage from "./components/VideoPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
const BACKEND_URL = "https://xflix-backend.fly.dev/v1/videos"; 
export const config = {
  endpoint: BACKEND_URL,
};

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <Routes>
          <Route path="/videos/:id" element={<VideoPage/>} />
            {/* <VideoPage/>
          </Route> */}
          <Route exact path="/" element={<LandingPage/>}/>
            {/* <LandingPage />
          </Route> */}
        </Routes>
      </div>
    </React.StrictMode>
  );
}

export default App;
