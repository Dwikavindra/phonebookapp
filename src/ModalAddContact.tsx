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
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showErrorInvalidPattern, setErrorInvalidPattern] =
    useState("invisible");
  const [showErrorNoname, setErrorNoname] = useState("invisible");
  const [showErrorInvalidLength, setErrorInvalidLength] = useState("invisible");
  const [errorCheckNamePass, setErrorCheckNamePass] = useState<boolean>(false);
  const [errorCheckNumberPass, setErrorCheckNumberPass] =
    useState<boolean>(false);
  const [isPhoneNumberLengthPass, setPhoneNumberLengthPass] =
    useState<boolean>(false);
  function AddContact(contact: Contact, name: string, phone: string) {
    individualContact.name = name;
    individualContact.phoneNumber = phone;
    props.setContactAdd(individualContact);
  }

  function ErrorCheckname(name: string) {
    let nameLength: number = name.length;
    if (nameLength > 0) {
      setErrorCheckNamePass(true);
      setErrorNoname("invisible");
    } else {
      setErrorNoname("visible");
      setErrorCheckNamePass(false);
    }
  }
  function ErrorCheckphoneNumber(phoneNumber: string) {
    let phoneNumberLength = phoneNumber.length;
    let regex: RegExp = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+) /g;
    let regexresult: boolean = regex.test(phoneNumber);
    console.log(phoneNumberLength);

    if (phoneNumberLength < 11 || phoneNumberLength > 15) {
      setErrorInvalidPattern("invisible");
      setErrorInvalidLength("visible");
    } else {
      setPhoneNumberLengthPass(true);
    }
    if (regexresult === false) {
      setErrorInvalidLength("invisible");
      setErrorInvalidPattern("visible");
    }
    if (regexresult === true && isPhoneNumberLengthPass === true) {
      setErrorCheckNumberPass(true);
    }
  }
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
        <h3 className={`${showErrorNoname} text-red-500`}>
          Name cannot be empty
        </h3>
        <h3 className="mt-10">Phone Number</h3>
        <input
          className="flex ml-2 mr-2 border-2 border-solid border-black"
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        ></input>
        <h3 className={`${showErrorInvalidPattern} text-red-500`}>
          Invalid Pattern
        </h3>
        <h3 className={`${showErrorInvalidLength} text-red-500`}>
          Invalid Length must be 11 characters at least and 15 at most
        </h3>
        <div className="flex justify-center items-center">
          <button
            className=" mt-10 flex justify-center items-center border-2 bg-blue-500 text-white rounded-lg border-transparent"
            onClick={() => {
              ErrorCheckname(name);
              ErrorCheckphoneNumber(phoneNumber);
              if (
                errorCheckNamePass === true &&
                errorCheckNumberPass === true
              ) {
                setErrorInvalidLength("invisible");
                setErrorInvalidPattern("invisible");
                setErrorNoname("invisible");
                AddContact(individualContact, name, phoneNumber);
                setName("");
                setPhoneNumber("");
                props.setShowModalContactAdd("invisble");
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
