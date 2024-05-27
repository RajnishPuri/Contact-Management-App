import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

// Define the Contact type
export interface Contact {
    id: string;
    firstname: string;
    lastname: string;
    status: string;
}

// Define the ContactsState type
interface ContactsState {
    contacts: Contact[];
}

// Define the initial state
const initialState: ContactsState = {
    contacts: []
};

// Create a slice for managing contacts
export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        // Reducer function for adding a contact
        addContact: (state, action: PayloadAction<{ firstName: string; lastName: string; status: string }>) => {
            state.contacts.push({
                id: nanoid(),
                firstname: action.payload.firstName,
                lastname: action.payload.lastName,
                status: action.payload.status
            });
        },
        // Reducer function for deleting a contact
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        },
        // Reducer function for editing a contact
        editContact: (state, action: PayloadAction<{ id: string; firstName: string; lastName: string; status: string }>) => {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = {
                    id: action.payload.id,
                    firstname: action.payload.firstName,
                    lastname: action.payload.lastName,
                    status: action.payload.status
                };
            }
        }
    }
});

// Export the actions
export const { addContact, deleteContact, editContact } = contactsSlice.actions;

// Export the reducer
export default contactsSlice.reducer;
