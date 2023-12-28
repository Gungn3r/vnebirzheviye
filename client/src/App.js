// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header, Sidebar, OTCBidDetails } from "./components";
import {
  Home,
  OTCBid,
  Login,
  Registration,
  OTCDealsPage,
  Profile,
} from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container maxWidth="lg">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Sidebar />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/otc-bid" element={<OTCBid />} />
              <Route path="/otc-bid-details/:id" element={<OTCBidDetails />} />
              <Route path="/otc-deals" element={<OTCDealsPage />} />
            </Routes>
          </div>
        </Container>
      </Router>
    </div>
  );
}

export default App;
