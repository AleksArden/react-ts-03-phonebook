import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

import css from './App.module.css';
import { IContact, NewContact } from 'type/contact';

interface IState {
  contacts: IContact[],
  filter: string,
}

export class App extends Component<{}, IState> {
  state: IState = {
    contacts: [],
    filter: '',
  };
  componentDidMount = (): void => {
    const contacts: IContact[] | null = JSON.parse(localStorage.getItem('contacts') ||'null');
    if (contacts) {
      this.setState({ contacts });
    }
  };

  componentDidUpdate = (_:{}, prevState: IState): void => {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  };

  addContact = (data: NewContact): void => {
    const newContact: IContact = {
      id: nanoid(),
      ...data,
    };
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };
  handleSearch = ({ target: { value } }:React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({filter: value });
  };
  handleDelete = (id: string): void => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <div className={css.wrapper}>
        <h1 className={css.title}>Phonebook</h1>

        <ContactForm addContact={this.addContact} contacts={contacts} />

        <h2 className={css.subtitle}>Contacts</h2>
        <div className={css.container}>
          <Filter onChange={this.handleSearch} value={filter} />
          <ContactList onDelete={this.handleDelete} contacts={filterContacts} />
        </div>
      </div>
    );
  }
}
