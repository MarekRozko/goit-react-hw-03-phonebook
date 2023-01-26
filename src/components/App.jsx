import { Component } from "react";
import { nanoid } from 'nanoid';
import GetContactForm from "./GetContactForm/GetContactForm";
import ContactList from "./ContactList/ContactList";
import FilterContact from "./FilterContact/FilterContact";
// import contacts from './contact';
import styles from "../components/app.module.css";


 export class App extends Component {

    state = {
        contacts: [],
        filter: "",
    }

    removeContact = (id) => {
        this.setState(({contacts}) => {
            const newContact = contacts.filter(contact => contact.id !== id);
            return {contacts: newContact}
        })
    }

    addContact = ({name, number}) => {
        if(this.isDublicate(name, number)) {
          alert(`${name} is already contacts`); 
          return false;
        }

        this.setState(prevState => {
            const {contacts} = prevState;

            const newContact = {
                id: nanoid(),
                name,
                number,
            }

            return {contacts: [newContact, ...contacts]}
        })
        return true;
    }

    handleFilter = ({target})=> {
        this.setState({filter: target.value})
    }

    isDublicate(name, number) {
        const normalizedName = name.toLowerCase();
        const normalizedNumber = number;
        const {contacts} = this.state;
        const result = contacts.find(({name, number}) => {
            return (name.toLowerCase() === normalizedName && number === normalizedNumber)
        })

        return Boolean(result)
    }

    getFilteredContacts() {
        const {filter, contacts} = this.state;
        if(!filter) {
            return contacts;
        }
        
        const normalizedFilter = filter.toLowerCase()
        const result = contacts.filter(({name, number})=> {
            return (name.toLowerCase().includes(normalizedFilter) ||  number.toLowerCase().includes(normalizedFilter))
        })

        return result;
    }
   
   componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({ contacts});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

   

    render() {
        const {addContact, removeContact, handleFilter} = this;
        const contacts = this.getFilteredContacts();
        const isContacts = Boolean(contacts.length);
  
        return (
            <div className={styles.containerPhonebook}>
                 <h1 className={styles.titlePhone}>Phonebook</h1>
                <div>
                    <div>
                        <GetContactForm onSubmit={addContact} />
                    </div>
                    <div>
                        <h2 className={styles.titleContact}>Contacts</h2>
                        <FilterContact handleChange={handleFilter} />
                        {isContacts && <ContactList removeContact={removeContact} contacts={contacts} />}
                        {!isContacts && <p className={styles.addCont}>No any contact! Add new</p>}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;