import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faCoffee } from "@fortawesome/free-solid-svg-icons";
import ModalAddContact from "./ModalAddContact";

function App() {
  document.body.style.background = "#F5F5F5";
  return (
    <div>
      <div className=" flex flex-row justify-center items-center">
        <FontAwesomeIcon icon={faAddressBook} className=" mt-3 text-3xl" />
        <h1 className=" ml-3 mt-3">Phone Book App</h1>
      </div>
      <div className="flex flex-row justify-center items-center space-x-80">
        <h2>Contacts</h2>
        <button className=" mt-2 border-2 bg-blue-500 text-white rounded-sm border-transparent">
          <h3 className="mt-1  ml-3 mr-4 mb-1 text-xs"> + Add Contact</h3>
        </button>
      </div>
      <ModalAddContact></ModalAddContact>
    </div>
  );
}

export default App;
