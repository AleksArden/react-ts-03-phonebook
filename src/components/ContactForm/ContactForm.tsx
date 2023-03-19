import { Component } from 'react';
import Notiflix from 'notiflix';

import { IContact, NewContact } from 'type/contact';
import css from './ContactForm.module.css';

interface IProps {
  addContact: (data: NewContact) => void,
  contacts: IContact[],
}

interface IState {
  name: string,
  number: string,
}

export class ContactForm extends Component<IProps, IState> {

  state: IState = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { name, value } }:React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [name]: value } as Pick<IState, keyof IState>);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { contacts } = this.props;
    const hasSameName = contacts.some(({ name }) => name === this.state.name);
    hasSameName
      ? Notiflix.Notify.warning(`${this.state.name} is already in contacts`, {
          position: 'center-center',
          cssAnimationStyle: 'zoom',
        })
      : this.props.addContact({ ...this.state });
    hasSameName || this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <div className={css.wrapper}>
          <label className={css.label}>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.handleChange}
            />
          </label>

          <label className={css.label}>
            Number
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <button className={css.button}>Add Contact</button>
      </form>
    );
  }
}
