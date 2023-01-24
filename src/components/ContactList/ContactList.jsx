import PropTypes from 'prop-types';
import styles from "../ContactList/contactList.module.css";


const ContactList = ({ contacts, removeContact }) => {

    const contact = contacts.map(({ id, name, number }) => <li key={id} className={styles.itemContact}>	
📱 {name}: {number}
        <button onClick={() => removeContact(id)} type="button" className={styles.buttonItem}>Delete</button></li>);

    return (
        <ul>

          { contact}
        </ul>
    )

}

export default ContactList;

ContactList.defaultProps = {
    items: []
}

ContactList.propTypes = {
    removeContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name:  PropTypes.string.isRequired,
        number:  PropTypes.string.isRequired,
    }))
}