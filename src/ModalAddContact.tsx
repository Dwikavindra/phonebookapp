import React from "react";
import logo from "./logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCoffee,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function ModalAddContact() {
  return (
    <div className="container bg-black bg-opacity-50 absolute inset-0 flex justify-center">
      <div className=" flex bg-gray-100 mt-10 h-96">
        <div className=" flex flex-row">
          <h1>Add Contact</h1>
          <button className="flex inline-text ml-60">
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddContact;
