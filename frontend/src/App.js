// import logo from './logo.svg';
// import './App.css';
import LandingPage from "./components/LandingPage";
import VideoPage from "./components/VideoPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
const ipAddress = "15.206.14.240:8082";
export const config = {
  endpoint: `https://xflix-backend-pijf.onrender.com/v1/videos`,
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
