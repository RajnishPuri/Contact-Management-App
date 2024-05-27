import React, { useState } from "react";
import Form from "../Components/form";
import ContactList from "../Components/contactList";
import { useDispatch } from 'react-redux';
import { addContact } from '../Redux/contactsSlice';

const Contact: React.FC = () => {
  // State to toggle between showing the form or the contact list
  const [showForm, setShowForm] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Function to toggle the showForm state
  const clickHandler = () => {
    setShowForm(!showForm);
  };

  // Function to reset the showForm state when canceling edit
  const cancelEdit = () => {
    setShowForm(false);
  };

  return (
    <div className="m-10 text-white flex flex-col items-center gap-10">
      {/* Create Contacts button */}
      <div className="w-screen h-auto flex justify-center">
        <div className="h-10 w-auto border border-white flex justify-center items-center p-3 hover:bg-[#F0564F] cursor-pointer" onClick={clickHandler}>
          <h1>{showForm ? "Show Contacts" : "Create Contacts"}</h1>
        </div>
      </div>
      {/* Show Form or Contact List based on showForm state */}
      <div>
        {showForm ? (
          <Form
            id=""
            firstName=""
            lastName=""
            status=""
          />
        ) : (
          <ContactList />
        )}
      </div>
    </div>
  );
};

export default Contact;
