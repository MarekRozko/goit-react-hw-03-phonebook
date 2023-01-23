import { Component } from "react";
import { nanoid } from 'nanoid';
import GetContactForm from "./GetContactForm/GetContactForm";
import ContactList from "./ContactList/ContactList";
import FilterContact from "./FilterContact/FilterContact";
import PropTypes from 'prop-types';
import styles from "../components/app.module.css";


 export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    const isInName = newContact.name.toLowerCase();
    this.state.contacts.find(contact => contact.name.toLowerCase() === isInName)
      ? alert(data.name + ' is already in contacts')
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFiltredContacts = () => {
    const { contacts, filter } = this.state;
    const normalisedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filtredContacts = this.getFiltredContacts();

    return (
      <div className={styles.containerPhonebook}>
        <h1 className={styles.titlePhone}>Phonebook</h1>
        <GetContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={styles.titleContact}>Contacts</h2>
        <FilterContact value={filter} onChange={this.changeFilter} />
        {contacts.length > 0 ? (
          <ContactList
            contacts={filtredContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <p className={styles.addCont}>No any contact! Add new</p>
        )}
      </div>
    );
  }
}

export default App;

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
  formSubmitHandler: PropTypes.func,
  deleteContact: PropTypes.func,
  changeFilter: PropTypes.func,
  getFiltredContacts: PropTypes.func,
};


