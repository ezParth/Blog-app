import React from "react";
import "./App.css";
import Header from "./Header";
import Post from "./Post";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./Pages/CreatePost";
import PostPage from "./Pages/PostPage";
import EditPost from "./Pages/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/edit/:id" element={<EditPost/>} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;

// learn about UserContext
