import { useState } from "react";
import PropTypes from "prop-types";
import s from "./Form.module.css";

export default function Form({ onFormSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "name": {
        setName(value);
        break;
      }
      case "number":
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ name, number });
    reset();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className={s.form}>
        <label className={s.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            className={s.input}
          />
        </label>
        <label className={s.label}>
          Phone number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            className={s.input}
          />
        </label>

        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    </>
  );
}

Form.propType = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
