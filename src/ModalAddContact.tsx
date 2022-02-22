import React, { useState } from "react";
import logo from "./logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Contact from "./Contact";
import { useFilePicker } from "use-file-picker";
import {
  faAddressBook,
  faCoffee,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { isReturnStatement } from "typescript";
type AddContactProps = {
  showModalContactAdd: string;
  setShowModalContactAdd: Function;
  setContactAdd: Function;
};
function ModalAddContact(props: AddContactProps) {
  let individualContact: Contact = {
    img: "",
    id: Math.floor(Math.random() * 1000),
    name: "",
    phoneNumber: "",
  };
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [img, setIMG] = useState<string>("");
  const [showErrorInvalidPattern, setErrorInvalidPattern] =
    useState<string>("invisible");
  const [showErrorNoname, setErrorNoname] = useState<string>("invisible");
  const [showErrorInvalidLength, setErrorInvalidLength] =
    useState<string>("invisible");
  const [errorCheckNamePass, setErrorCheckNamePass] = useState<boolean>(false);
  const [errorCheckNumberLengthPass, setPhoneNumberLengthPass] =
    useState<boolean>(false);
  const [errorCheckNumberPatternPass, setErrorCheckNumberPatternPass] =
    useState<boolean>(false);
  function AddContact(
    contact: Contact,
    name: string,
    phone: string,
    img: string
  ) {
    individualContact.img = img;
    individualContact.name = name;
    individualContact.phoneNumber = phone;
    props.setContactAdd(individualContact);
  }
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    limitFilesConfig: { max: 1 },
    // minFileSize: 0.1, // in megabytes
    maxFileSize: 50,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    return <div>Error...</div>;
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
      className={`${props.showModalContactAdd} bg-black bg-opacity-50 absolute inset-0 flex justify-center w-screen  `}
    >
      <div className=" flex flex-col bg-gray-100 mt-10 h-5/6">
        <div className=" flex flex-row">
          <h1>Add Contact</h1>
          <button
            className="flex inline-text ml-60"
            onClick={() => {
              props.setShowModalContactAdd();
              setErrorInvalidLength("invisible");
              setErrorInvalidPattern("invisible");
              setErrorNoname("invisible");
              filesContent.pop();
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
          onChange={(e) => {
            ErrorCheckname(name);
            setName(e.target.value);
          }}
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
            ErrorCheckphoneNumberLength(phoneNumber);
            ErrorCheckphoneNumberPattern(phoneNumber);
            setPhoneNumber(e.target.value);
          }}
        ></input>
        <h3 className={`${showErrorInvalidPattern} text-red-500`}>
          Invalid Pattern
        </h3>
        <h3 className={`${showErrorInvalidLength} text-red-500`}>
          Invalid Length must be 11 characters at least and 15 at most
        </h3>
        <div className="flex flex-col justify-center items-center">
          <button
            className="mb-20"
            onClick={() => {
              openFileSelector();
            }}
          >
            Add Image
          </button>
          {filesContent.map((file, index) => {
            console.log(file.content);
            return (
              <div
                className=" flex-col justify-center items-center"
                key={index}
              >
                <div className=" flex flex-row justify-center items-center w-20 h-10">
                  <img
                    className="object-scale-down items-center"
                    alt={file.name}
                    src={file.content}
                  ></img>
                </div>
                <br />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          <button
            className=" mt-10 flex justify-center items-center border-2 bg-blue-500 text-white rounded-lg border-transparent"
            onClick={() => {
              ErrorCheckname(name);
              ErrorCheckphoneNumberLength(phoneNumber);
              ErrorCheckphoneNumberPattern(phoneNumber);
              if (
                errorCheckNamePass === true &&
                errorCheckNumberPatternPass === true &&
                errorCheckNumberLengthPass == true
              ) {
                setErrorInvalidLength("invisible");
                setErrorInvalidPattern("invisible");
                setErrorNoname("invisible");

                AddContact(
                  individualContact,
                  name,
                  phoneNumber,
                  filesContent[0].content
                );
                setName("");
                setPhoneNumber("");
                props.setShowModalContactAdd("invisible");
                filesContent.pop();
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
