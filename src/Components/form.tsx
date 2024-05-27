import React, { useState, useEffect } from 'react';
import { addContact, deleteContact, editContact } from '../Redux/contactsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Form({ id, firstName, lastName, status }: { id: string; firstName: string; lastName: string; status: string; }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State to manage form input values
    const [formFirstName, setFormFirstName] = useState(firstName || '');
    const [formLastName, setFormLastName] = useState(lastName || '');
    const [formStatus, setFormStatus] = useState(status || '');

    // Update form values when props change
    useEffect(() => {
        setFormFirstName(firstName || '');
        setFormLastName(lastName || '');
        setFormStatus(status || '');
    }, [firstName, lastName, status]);

    // Handle form submission
    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const contactData = { id, firstName: formFirstName, lastName: formLastName, status: formStatus };
        if (id) {
            dispatch(editContact(contactData));
        } else {
            dispatch(addContact(contactData));
        }
        console.log('Form submitted');
        navigate('/');
    }

    // Handle cancel button click
    function onCancel() {
        console.log('Cancel button clicked');
        navigate('/');
    }

    return (
        <div className="w-screen flex justify-center px-4 md:px-0">
            <div className="w-full md:w-1/3 h-auto border border-white p-4">
                <form onSubmit={handleFormSubmit}>
                    {/* First Name input */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="border border-gray-300 p-2 w-full text-black"
                            autoComplete="off"
                            name="firstName"
                            value={formFirstName}
                            onChange={(e) => setFormFirstName(e.target.value)}
                        />
                    </div>
                    {/* Last Name input */}
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="border border-gray-300 p-2 w-full text-black"
                            autoComplete="off"
                            name="lastName"
                            value={formLastName}
                            onChange={(e) => setFormLastName(e.target.value)}
                        />
                    </div>
                    {/* Status radio buttons */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300">Status:</label>
                        <div className="flex flex-col space-y-2 mt-2">
                            <label htmlFor="active" className="flex items-center">
                                <input
                                    type="radio"
                                    id="active"
                                    name="status"
                                    value="active"
                                    className="mr-2"
                                    checked={formStatus === 'active'}
                                    onChange={(e) => setFormStatus(e.target.value)}
                                />
                                Active
                            </label>
                            <label htmlFor="inactive" className="flex items-center">
                                <input
                                    type="radio"
                                    id="inactive"
                                    name="status"
                                    value="inactive"
                                    className="mr-2"
                                    checked={formStatus === 'inactive'}
                                    onChange={(e) => setFormStatus(e.target.value)}
                                />
                                Inactive
                            </label>
                        </div>
                    </div>
                    {/* Submit and Cancel buttons */}
                    <div className="flex justify-center mt-4">
                        <button type="submit" className="border border-white p-2 hover:bg-[#F0564F]">Save Contact</button>
                        <button type="button" className="border border-white p-2 hover:bg-[#F0564F] ml-4" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
