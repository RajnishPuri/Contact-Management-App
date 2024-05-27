import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "./form";
import { RootState } from "../Redux/store";
import { Contact, deleteContact } from "../Redux/contactsSlice";

const ContactList: React.FC = () => {
  // Get contacts from Redux store
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Handler to set the contact for editing
  const editHandler = (contact: Contact) => {
    setEditingContact(contact);
  };

  // Handler to cancel editing
  const cancelEdit = () => {
    setEditingContact(null);
  };

  // Handler to delete a contact
  const deleteHandler = (contactId: string) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="text-white">
      {editingContact ? (
        // Render the form for editing a contact
        <Form
          id={editingContact.id}
          firstName={editingContact.firstname}
          lastName={editingContact.lastname}
          status={editingContact.status}
          // Pass onCancel prop to handle canceling edit
        />
      ) : (
        <>
          {contacts.length === 0 ? (
            <div>No Contact is Available</div>
          ) : (
            // Render the list of contacts
            <div className="flex flex-wrap gap-10 p-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="border flex flex-col items-center p-2 gap-2 bg-[#754895]"
                >
                  <div>
                    {contact.firstname} {contact.lastname}
                  </div>

                  <div>Status: {contact.status}</div>
                  <button
                    className="border border-white p-1 hover:bg-[#F0564F] text-white"
                    onClick={() => editHandler(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="border border-white p-1 hover:bg-[#F0564F] text-white"
                    onClick={() => deleteHandler(contact.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContactList;
