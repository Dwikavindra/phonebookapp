import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Contact from "./Contact";
interface contactLists {
  contactList: Contact[];
}
function ListContactTile(props: contactLists) {
  return (
    <ul>
      {props.contactList.map((element) => {
        return (
          <li key={`${element}`}>
            {element.name} {element.phoneNumber}
          </li>
        );
      })}
    </ul>
  );
}

export default ListContactTile;
