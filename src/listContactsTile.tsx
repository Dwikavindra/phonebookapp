import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Contact from "./Contact";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalUpdateData from "./ModalUpdateData";
interface contactLists {
  contactList: Contact[];
  searchContactList: Contact[];
  nonsearchContacList: Contact[];
  setContactRemove1: Function;
  setContactRemove2: Function;
}
function ListContactTile(props: contactLists) {
  let individualContact: Contact = {
    img: "",
    id: 0,
    name: "",
    phoneNumber: "",
  };
  const [individualContactid, setIndivididualContactid] = useState<number>(
    individualContact.id
  );
  const [individualContactname, setIndivididualContactname] = useState<string>(
    individualContact.name
  );
  const [individualContactphoneNumber, setIndivididualContactphonenumber] =
    useState<string>(individualContact.name);
  const [individualIMG, setIndividualIMG] = useState<string>(
    individualContact.img
  );
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
    sessionStorage.setItem("contacts", JSON.stringify(newArray));
  }
  return (
    <div className="flex flex-col">
      {props.contactList.map((element, index) => {
        return (
          <div
            className="flex flex-row bg-gray-300 border-2 ml-5 mr-5 "
            key={index}
          >
            <img
              className="w-20 h-10 text-sm object-cover"
              alt="Photo not found"
              src={element.img}
            ></img>
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
                  setIndivididualContactid(element.id);
                  setIndivididualContactname(element.name);
                  setIndivididualContactphonenumber(element.phoneNumber);
                  setIndividualIMG(element.img);
                }}
              >
                Update
              </button>
            </div>
          </div>
        );
      })}
      <ModalUpdateData
        id={individualContactid}
        img={individualIMG}
        name={individualContactname}
        phoneNumber={individualContactphoneNumber}
        showModalContactUpdate={showModalContactUpdate}
        setShowModalContactUpdate={() => handleShowModalContactUpdate()}
        nonSearchContactList={[...props.nonsearchContacList]}
        searchContactList={[...props.searchContactList]}
        setContactList={props.setContactRemove1}
        setSearchContactList={props.setContactRemove2}
      ></ModalUpdateData>
    </div>
  );
}
//urutan Modalnya berpengaruh kalau di atas ke render atau initialized dulaun kalau di bawah ga
export default ListContactTile;
