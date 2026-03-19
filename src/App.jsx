import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body,{action as bodyAction,loader as bodyLoader} from "./pages/Body";
import Layout from "./components/Layout";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout/>}> 
    <Route index path="/" element={<Body/>} action={bodyAction} loader={bodyLoader}/>
  </Route>
))
function App() {

  return (
    <>
      <div className="w-100 h-100 mt-20  flex flex-col mx-auto items-center border">
        <RouterProvider router={router}/>
      </div>
    </>
  );
}

export default App;
