import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";

// Configure the Redux store with the contacts reducer
export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
    }
});

// Define the type for the root state
export type RootState = ReturnType<typeof store.getState>;

// Define the type for the dispatch function
export type AppDispatch = typeof store.dispatch;
