import { Component } from "react";
import PropTypes from 'prop-types';
import styles from  "../GetContactForm/getContactForm.module.css";

export class GetContactForm extends Component{
  state = {
    name: '',
    number: '',
  }

changeContact = event => {
  const { name, value } = event.currentTarget;
  this.setState({[name]: value})
}
contactSubmit = event => {
  event.preventDefault();
  this.props.onSubmit(this.state)
  this.reset();
}
reset = () => {
  this.setState({
    name: '',
    number: '',
  })
}
  render() {
    return (
      <form  onSubmit={this.contactSubmit}>
        <label className={styles.labelForm}>
          Name{' '}
          <input className={styles.imputForm}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.changeContact}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={styles.labelFormTel}>
          Phone{' '}
          <input className={styles.imputFormTel}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.changeContact}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={styles.buttonAdd} type="submit">Add contact</button>
      </form>
    );
  }
}

export default GetContactForm;


GetContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  changeContact: PropTypes.func,
  contactSubmit: PropTypes.func,
  reset: PropTypes.func,
  render: PropTypes.func,
};