import PropTypes from 'prop-types';
import styles from "../ContactList/contactList.module.css";
const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number })=> {
        return (
          <li className={styles.itemContact} key={id}>
            {name}: {number}
            <button className={styles.buttonItem}
              onClick={() => {
                onDeleteContact(id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func,
};