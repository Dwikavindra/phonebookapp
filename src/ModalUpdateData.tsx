import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Contact from "./Contact";
import Cookies from "js-cookie";
import {
  faAddressBook,
  faCoffee,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
type UpdateContactProps = {
  id: number;
  name: string;
  phoneNumber: string;
  showModalContactUpdate: string;
  setShowModalContactUpdate: Function;
  nonSearchContactList: Contact[];
  searchContactList: Contact[];
  setContactList: Function;
  setSearchContactList: Function;
};
function ModalUpdateData(props: UpdateContactProps) {
  const [namemodal, setName] = useState(props.name);

  const [phoneNumbermodal, setPhoneNumber] = useState(props.phoneNumber);
  const [showErrorInvalidPattern, setErrorInvalidPattern] =
    useState("invisible");
  const [showErrorInvalidLength, setErrorInvalidLength] = useState("invisible");
  useEffect(() => {
    setName(props.name);
  }, [props.name]);
  useEffect(() => {
    setPhoneNumber(props.phoneNumber);
  }, [props.phoneNumber]);

  function UpdateData(id: number, name: string, phone: string) {
    let contactList: Contact[] = props.nonSearchContactList;
    let searchContactList: Contact[] = props.searchContactList;
    for (let i = 0; i < contactList.length; i++) {
      if (contactList[i].id == id) {
        contactList[i].name = name;
        contactList[i].phoneNumber = phone;
      }
    }
    for (let i = 0; i < searchContactList.length; i++) {
      if (searchContactList[i].id == id) {
        searchContactList[i].name = name;
        searchContactList[i].phoneNumber = phone;
      }
    }
    props.setContactList(contactList);
    props.setSearchContactList(searchContactList);
    Cookies.set("contacts", JSON.stringify(contactList), { expires: 7 });
  }
  return (
    <div
      className={`${props.showModalContactUpdate} bg-black bg-opacity-50 absolute inset-0 flex justify-center w-screen `}
    >
      <div className=" flex flex-col bg-gray-100 mt-10 h-96">
        <div className=" flex flex-row">
          <h1>Update Data</h1>
          <button
            className="flex inline-text ml-60"
            onClick={() => {
              props.setShowModalContactUpdate();
            }}
          >
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>
        <h3 className="mt-10">Name</h3>
        <input
          className="flex ml-2 mr-2 border-2 border-solid border-black"
          type="text"
          value={namemodal}
          onChange={(e) => {
            setName("");
            setName(e.target.value);
          }}
        ></input>
        {/* <h3 className={`${showErrorInvalidPattern} text-red-500`}>
          Invalid Pattern
        </h3> */}
        {/* <h3 className={`${showErrorInvalidLength} text-red-500`}>
          Invalid Length must be 11 characters at least and 15 at most
        </h3> */}
        <h3 className="mt-10">Phone Number</h3>
        <input
          key={props.id}
          className="flex ml-2 mr-2 border-2 border-solid border-black"
          type="text"
          value={phoneNumbermodal}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        ></input>
        <div className="flex justify-center items-center">
          <button
            className=" mt-10 flex justify-center items-center border-2 bg-blue-500 text-white rounded-lg border-transparent"
            onClick={() => {
              //   let regex: RegExp = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+) /g;
              //   let regexresult: boolean = regex.test(phoneNumber);

              //   let phoneNumberLength = phoneNumber.length;
              //   if (phoneNumberLength < 11 || phoneNumberLength > 15) {
              //     setErrorInvalidPattern("invisible");
              //     setErrorInvalidLength("visible");
              //   } else {
              //     if (regexresult === false) {
              //       setErrorInvalidLength("invisible");
              //       setErrorInvalidPattern("visible");
              //     } else {
              //       setErrorInvalidLength("invisible");
              //       setErrorInvalidPattern("invisible");
              UpdateData(props.id, namemodal, phoneNumbermodal);
              props.setShowModalContactUpdate("invisible");
              //     }
              //   }
            }}
          >
            <h3 className="mt-1  ml-3 mr-4 mb-1 text-xs"> Update Contact</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdateData;
