import React, {useContext, useState} from 'react'
import './App.css'
import MainBody from "./components/mainBody";
import SearchAppBar from "./components/commons/appBar";

function App() {
  return (
    <div className="App">
        <SearchAppBar />
        <MainBody />
    </div>
  )
}

export default App
