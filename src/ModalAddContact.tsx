import React, { useState } from "react";
import logo from "./logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Contact from "./Contact";
import {
  faAddressBook,
  faCoffee,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
type AddContactProps = {
  showModalContactAdd: string;
  setShowModalContactAdd: Function;
  setContactAdd: Function;
};
function ModalAddContact(props: AddContactProps) {
  let individualContact: Contact = {
    id: Math.floor(Math.random() * 1000),
    name: "",
    phoneNumber: "",
  };
  function AddContact(contact: Contact, name: string, phone: string) {
    individualContact.name = name;
    individualContact.phoneNumber = phone;
    props.setContactAdd(individualContact);
  }
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [
    phoneNumberErrorVisibilityLength,
    setPhoneNumberErrorVisibilityLength,
  ] = useState<string>("invisible");
  const [
    phoneNumberErrorVisibilityInvalidPattern,
    setPhoneNumberErrorVisibilityInvalidPattern,
  ] = useState<string>("invisible");
  return (
    <div
      className={`${props.showModalContactAdd} bg-black bg-opacity-50 absolute inset-0 flex justify-center w-screen `}
    >
      <div className=" flex flex-col bg-gray-100 mt-10 h-96">
        <div className=" flex flex-row">
          <div className=" items-center">
            <h1>Add Contact</h1>
          </div>
          <div className="flex ml-[79%]">
            <button
              className="flex inline-text items-end"
              onClick={() => {
                props.setShowModalContactAdd();
              }}
            >
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </button>
          </div>
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
          }}
        ></input>
        <h2 className={`${phoneNumberErrorVisibilityLength} text-red-600`}>
          Phone Number must be 11 Characters and 15 Characters max
        </h2>
        <h2
          className={`${setPhoneNumberErrorVisibilityInvalidPattern} text-red-600`}
        >
          Please Enter a valid number pattern
        </h2>
        <div className="flex justify-center items-center">
          <button
            className=" mt-10 flex justify-center items-center border-2 bg-blue-500 text-white rounded-lg border-transparent"
            onClick={() => {
              let regexPhoneNumberPattern: RegExp = new RegExp(
                "/+?([ -]?d+)+|(d+)([ -]d+)/g"
              );
              if (phoneNumber == "") {
                setPhoneNumberErrorVisibilityLength("invisible");
                setPhoneNumberErrorVisibilityInvalidPattern("invisible");
              }
              if (phoneNumber.length > 15 && phoneNumber.length < 11) {
                setPhoneNumberErrorVisibilityLength("visible");
              } else if (regexPhoneNumberPattern.test(phoneNumber) == false) {
                setPhoneNumberErrorVisibilityInvalidPattern("visible");
              } else {
                setPhoneNumberErrorVisibilityLength("invisible");
                setPhoneNumberErrorVisibilityInvalidPattern("invisible");
                AddContact(individualContact, name, phoneNumber);
                setName("");
                setPhoneNumber("");
                props.setShowModalContactAdd();
              }
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
