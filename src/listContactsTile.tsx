import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Contact from "./Contact";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import ModalUpdateData from "./ModalUpdateData";
interface contactLists {
  contactList: Contact[];
  searchContactList: Contact[];
  nonsearchContacList: Contact[];
  setContactRemove1: Function;
  setContactRemove2: Function;
}
function ListContactTile(props: contactLists) {
  const [showModalContactUpdate, setShowModalContactUpdate] =
    useState<string>("invisible");
  function handleShowModalContactUpdate() {
    showModalContactUpdate === "invisible"
      ? setShowModalContactUpdate("visible")
      : setShowModalContactUpdate("invisible");
  }
  function removeContact(id: number) {
    let oldArray: Contact[] = [...props.nonsearchContacList];
    let searchContactList: Contact[] = [...props.searchContactList];
    let newArray: Contact[] = oldArray.filter((items) => items.id != id);
    let newSearchContactList: Contact[] = searchContactList.filter(
      (items) => items.id != id
    );
    props.setContactRemove1(newArray);
    props.setContactRemove2(newSearchContactList);
    Cookies.set("contacts", JSON.stringify(newArray), { expires: 7 });
  }
  return (
    <div>
      {props.contactList.map((element) => {
        return (
          <div
            className="flex flex-row bg-gray-300 border-2 ml-5 mr-5 "
            key={element.id}
          >
            <div className="flex flex-col">
              <h2>{element.name}</h2>
              <h3>{element.phoneNumber}</h3>
            </div>
            <div className="flex w-screen justify-end items-end">
              <button
                className="ml-60 self-end items-end "
                onClick={() => removeContact(element.id)}
              >
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
              </button>
              <button
                onClick={() => {
                  setShowModalContactUpdate("visible");
                }}
              >
                Update
              </button>
            </div>
            <ModalUpdateData
              id={element.id}
              name={element.name}
              phoneNumber={element.phoneNumber}
              showModalContactUpdate={showModalContactUpdate}
              setShowModalContactUpdate={() => handleShowModalContactUpdate()}
              nonSearchContactList={[...props.nonsearchContacList]}
              searchContactList={[...props.searchContactList]}
              setContactList={props.setContactRemove1}
              setSearchContactList={props.setContactRemove2}
            ></ModalUpdateData>
          </div>
        );
      })}
    </div>
  );
}

export default ListContactTile;
