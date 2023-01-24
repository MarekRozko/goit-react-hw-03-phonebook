import { Component } from "react";
import PropTypes from 'prop-types';
import initinalState from "./initinalState";
import styles from  "../GetContactForm/getContactForm.module.css";

export class GetContactForm extends Component{

  state = { ...initinalState }
  
  handleSubmit = (e) => {
        e.preventDefault();
        const {onSubmit} = this.props;
         onSubmit({...this.state});
        this.reset();
        
    }

    reset = () => {
  this.setState({
    name: '',
    number: '',
  })
}

   handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value
        })
    }

  render() {
        const {handleChange, handleSubmit} = this;
        const {name, number} = this.state;
    return (
      <form  onSubmit={handleSubmit}>
        <label className={styles.labelForm}>
          Name{' '}
          <input className={styles.imputForm}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
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
            value={number}
            onChange={handleChange}
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
    onSubmit: PropTypes.func.isRequired,
}