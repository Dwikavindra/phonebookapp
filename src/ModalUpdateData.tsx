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
  const [showErrorNoname, setErrorNoname] = useState("invisible");
  const [showErrorInvalidLength, setErrorInvalidLength] = useState("invisible");
  const [errorCheckNamePass, setErrorCheckNamePass] = useState<boolean>(false);
  const [errorCheckNumberPatternPass, setErrorCheckNumberPatternPass] =
    useState<boolean>(false);
  const [errorCheckNumberLengthPass, setPhoneNumberLengthPass] =
    useState<boolean>(false);

  useEffect(() => {
    //useEffect use it to re render certain elements when called
    setName(props.name);
  }, [props.name]); //the other property tells use Effect to watchout if there is change then re render
  useEffect(() => {
    setPhoneNumber(props.phoneNumber);
  }, [props.phoneNumber]);

  function UpdateSessionStorage(contactList: Contact[]) {
    sessionStorage.setItem("contacts", JSON.stringify(contactList));
  }
  function updateContactList(id: number, name: string, phone: string) {
    let contactList: Contact[] = props.nonSearchContactList;
    contactList.find((item) => {
      if (item.id === id) {
        item.name = name;
        item.phoneNumber = phone;
      }
    });
    console.log(contactList);
    props.setContactList(contactList);
  }

  function updateSearchContactList(id: number, name: string, phone: string) {
    let searchContactList: Contact[] = props.searchContactList;
    searchContactList.find((item) => {
      if (item.id === id) {
        item.name = name;
        item.phoneNumber = phone;
      }
    });
    props.setSearchContactList(searchContactList);
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
  function ErrorCheckphoneNumberLength(phoneNumber: string) {
    let phoneNumberLength: number = phoneNumber.length;
    console.log(phoneNumberLength);
    let phoneNumberLengthLessThan11: boolean =
      phoneNumberLength <= 10 ? true : false;
    let phoneNumberLengthMorethan16: boolean =
      phoneNumberLength >= 16 ? true : false;
    if (
      phoneNumberLengthLessThan11 === true ||
      phoneNumberLengthMorethan16 === true
    ) {
      console.log("entered here");
      setErrorInvalidLength("visible");
      setPhoneNumberLengthPass(false);
    } else {
      setErrorInvalidLength("invisible");
      setPhoneNumberLengthPass(true);
    }
  }
  function ErrorCheckphoneNumberPattern(phoneNumber: string) {
    let regex: RegExp = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+) /g;
    let regexresult: boolean = regex.test(phoneNumber);
    if (regexresult === false) {
      setErrorInvalidPattern("visible");
      setErrorCheckNumberPatternPass(false);
    } else {
      setErrorInvalidPattern("invisible");
      setErrorCheckNumberPatternPass(true);
    }
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
              setErrorInvalidLength("invisible");
              setErrorInvalidPattern("invisible");
              setErrorNoname("invisible");
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
            ErrorCheckname(namemodal);
          }}
        ></input>
        <h3 className={`${showErrorNoname} text-red-500`}>
          Name cannot be empty
        </h3>

        <h3 className="mt-10">Phone Number</h3>

        <input
          key={props.id}
          className="flex ml-2 mr-2 border-2 border-solid border-black"
          type="text"
          value={phoneNumbermodal}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            ErrorCheckphoneNumberPattern(phoneNumbermodal);
            ErrorCheckphoneNumberLength(phoneNumbermodal);
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
              if (
                errorCheckNamePass === true &&
                errorCheckNumberPatternPass === true &&
                errorCheckNumberLengthPass === true
              ) {
                setErrorInvalidLength("invisible");
                setErrorInvalidPattern("invisible");
                updateContactList(props.id, namemodal, phoneNumbermodal);
                updateSearchContactList(props.id, namemodal, phoneNumbermodal);
                UpdateSessionStorage([...props.nonSearchContactList]);
                props.setShowModalContactUpdate("invisible");
              }
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
