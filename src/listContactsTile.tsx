import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Contact from "./Contact";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
interface contactLists {
  contactList: Contact[];
}
function ListContactTile(props: contactLists) {
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
              <button className="ml-60 self-end items-end ">
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListContactTile;
