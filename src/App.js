import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import Form from "./components/Form";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import s from "./App.css";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

function App() {
  const defaultContactsList = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ];
  const [contacts, setContacts] = useLocalStorage(
    "contact",
    defaultContactsList
  );
  const [filter, setFilter] = useState("");

  const addContact = ({ name, number }) => {
    console.log(contacts);
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast.error(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    setContacts((prevContacts) => [contact, ...prevContacts]);
    setFilter("");
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();

  const getVisibleContacts = normalizedFilter
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
    : contacts;

  const onDeleteBtn = (e) => {
    const id = e.target.id;
    const newContacts = contacts.filter((contact) => contact.id !== id);

    setContacts(newContacts);
  };

  return (
    <div className={s.div}>
      <h1>Phonebook</h1>
      <Form onFormSubmit={addContact} />
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            background: "#36363695",
            color: "#fff",
          },
        }}
      />

      {contacts.length > 0 && <h1>Contacts</h1>}
      {contacts.length > 0 && <Filter value={filter} onChange={changeFilter} />}
      {contacts && (
        <ContactList contacts={getVisibleContacts} onDeleteBtn={onDeleteBtn} />
      )}
    </div>
  );
}

export default App;
