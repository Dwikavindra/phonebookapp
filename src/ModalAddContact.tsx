import React, { useState } from "react";
import logo from "./logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Contact from "./Contact";
import {
  faAddressBook,
  faCoffee,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type AddContactProps = {
  showModalContactAdd: string;
  setShowModalContactAdd: Function;
  setContactAdd: Function;
};
function ModalAddContact(props: AddContactProps) {
  let individualContact: Contact = {
    id: Math.floor(Math.random() * 1000),
    name: " ",
    phoneNumber: " ",
  };
  function AddContact(contact: Contact, name: string, phone: string) {
    individualContact.name = name;
    individualContact.phoneNumber = phone;
    props.setContactAdd(individualContact);
  }
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  //   console.log("From ModalAddContact " + props.showModalContactAdd);
  return (
    <div
      className={`${props.showModalContactAdd} bg-black bg-opacity-50 absolute inset-0 flex justify-center w-screen `}
    >
      <div className=" flex flex-col bg-gray-100 mt-10 h-96">
        <div className=" flex flex-row">
          <h1>Add Contact</h1>
          <button
            className="flex inline-text ml-60"
            onClick={() => {
              props.setShowModalContactAdd();
            }}
          >
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>
        <h3 className="mt-10">Name</h3>
        <input
          className="flex ml-2 mr-2 border-2 border-solid border-black"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <h3 className="mt-10">Phone Number</h3>
        <input
          className="flex ml-2 mr-2 border-2 border-solid border-black"
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            console.log(phoneNumber);
          }}
        ></input>
        <div className="flex justify-center items-center">
          <button
            className=" mt-10 flex justify-center items-center border-2 bg-blue-500 text-white rounded-lg border-transparent"
            onClick={() => {
              console.log(name);
              console.log(phoneNumber);
              AddContact(individualContact, name, phoneNumber);
              setName(" ");
              setPhoneNumber(" ");
            }}
          >
            <h3 className="mt-1  ml-3 mr-4 mb-1 text-xs"> Add Contact</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddContact;
