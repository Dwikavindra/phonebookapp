import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faCoffee } from "@fortawesome/free-solid-svg-icons";
import ModalAddContact from "./ModalAddContact";
import ListContactTile from "./listContactsTile";
import Contact from "./Contact";
import Cookies from "js-cookie";
function App() {
  document.body.style.background = "#F5F5F5";
  const [showModalContactAdd, setShowModalContactAdd] =
    useState<string>("invisible");
  const [contacts, setAddContacts] = useState<Contact[]>([]);
  const [searchcontacts, setSearchContacts] = useState<Contact[]>([
    ...contacts,
  ]);
  // const [disableSetContactAdd, setDisableContactAdd] = useState<boolean>(false);
  const [inputForm, setInputForm] = useState<string>("");
  const isNumeric = (val: string): boolean => {
    return !isNaN(Number(val));
  };
  function setContactAdd(contact: Contact) {
    let newContacts = [...contacts];
    newContacts.push(contact);
    setAddContacts(newContacts);
    Cookies.set("contacts", JSON.stringify(newContacts), { expires: 7 });
  }
  function handleShowModalContactAdd() {
    showModalContactAdd === "invisible"
      ? setShowModalContactAdd("visible")
      : setShowModalContactAdd("invisible");
  }
  function search(listofcontact: Contact[]) {
    let newlistsofcontacts: Contact[] = [
      ...listofcontact.filter((val) => {
        if (inputForm === "") {
          return val;
        } else if (
          val.name.toLowerCase().includes(inputForm.toLowerCase()) === true
        ) {
          return val;
        }
        if (isNumeric(inputForm[0]) === true) {
          return val.phoneNumber.includes(inputForm.toLowerCase());
        }
      }),
    ];
    setSearchContacts(newlistsofcontacts);
  }
  function getContactFromCookies(): Contact[] {
    let cookieslist = Cookies.get("contacts");
    if (cookieslist == undefined) {
      return contacts;
    } else {
      return JSON.parse(Cookies.get("contacts") as string) as Contact[];
    }
  }

  return (
    <div>
      <div className=" flex flex-row justify-center items-center">
        <FontAwesomeIcon icon={faAddressBook} className=" mt-3 text-3xl" />
        <h1 className=" ml-3 mt-3">Phone Book App</h1>
      </div>
      <div className="flex flex-row justify-center items-center space-x-80">
        <h2>Contacts</h2>
        <button
          onClick={() => {
            setShowModalContactAdd("visible");
          }}
          className=" mt-2 border-2 bg-blue-500 text-white rounded-sm border-transparent"
        >
          <h3 className="mt-1  ml-3 mr-4 mb-1 text-xs"> + Add Contact</h3>
        </button>
      </div>
      <div className="flex mr-1 mt-2">
        <input
          className="flex ml-5 mr-5 mb-5 border-2 border-solid border-black w-screen"
          type="text"
          value={inputForm}
          onChange={(e) => {
            setInputForm(e.target.value);
            setTimeout(() => console.log(), 1000);
            search([...contacts]);
          }}
        ></input>
      </div>

      <ListContactTile
        contactList={inputForm == "" ? getContactFromCookies() : searchcontacts}
        searchContactList={searchcontacts}
        nonsearchContacList={contacts}
        setContactRemove1={setAddContacts}
        setContactRemove2={setSearchContacts}
      ></ListContactTile>
      <ModalAddContact
        showModalContactAdd={showModalContactAdd}
        setShowModalContactAdd={() => handleShowModalContactAdd()}
        setContactAdd={setContactAdd}
      />
    </div>
  );
}
export default App;
