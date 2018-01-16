import React, {Component} from 'react';
import styled from 'styled-components';
import {Card} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import AddContact from './components/add-contact';
import ContactList from './components/contact-list';

const AppContainer = styled(Card)`
  width: 600px;
  padding: 20px;
  margin: 0 auto;
`;

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      contacts: [{
        id: 1,
        firstName: 'Alex',
        lastName: 'Smith',
        dateOfBirth: '1940-01-01',
        phoneNumber: '555-34-34'
      }, {
        id: 2,
        firstName: 'Jane',
        lastName: 'Cone',
        dateOfBirth: '1955-01-01',
        phoneNumber: '383-71-96'
      }],
      lastId: 2
    };
  }

  onSave = (newContact) => {
    this.setState({
      contacts: [...this.state.contacts.filter(contact => contact.id !== newContact.id), {
        ...newContact,
        id: newContact.id || this.state.lastId + 1
      }],
      lastId: newContact.id ? this.state.lastId : this.state.lastId + 1,
      selectedTab: 0,
      targetContact: null
    })
  };

  onEdit = (contact) => {
    this.setState({targetContact: contact, selectedTab: 1});
  };

  onDelete = (contact) => {
    this.setState({contacts: this.state.contacts.filter(c => c !== contact)})
  };

  onSort = (sortField, order) => {
    this.setState({contacts: this.state.contacts.sort((a, b) => {
        const result = a[sortField].localeCompare(b[sortField]);
        return order === 'asc' ? result : -result;
      })});
  };

  render() {
    return (
      <AppContainer>
        <Tabs
          value={this.state.selectedTab}
          onChange={(value) => this.setState({selectedTab: value})}
        >
          <Tab label='Contacts' value={0}>
            <ContactList
              contacts={this.state.contacts}
              onSort={this.onSort}
              onEdit={this.onEdit}
              onDelete={this.onDelete} />
          </Tab>
          <Tab label='Add / Edit' value={1}>
            <AddContact onSave={this.onSave} target={this.state.targetContact} />
          </Tab>
        </Tabs>
      </AppContainer>
    );
  }
}
