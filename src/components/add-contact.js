import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';


const AddContactBase = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;  
`;


const initialFieldState = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phoneNumber: ''
};

export default class AddContact extends Component {

  constructor() {
    super();
    this.state = {
      ...initialFieldState
    };
  }

  componentWillReceiveProps(props) {
    if (props.target && props.target.id) {
      this.setState(props.target)
    }
  }

  handleSave = () => {
    const {id, firstName, lastName, dateOfBirth, phoneNumber } = this.state;
    if (firstName && lastName && dateOfBirth && phoneNumber) {
      this.props.onSave({id, firstName, lastName, dateOfBirth, phoneNumber});
      this.setState(initialFieldState);
      console.log('Entry saved');
    } else {
      console.log('Invalid entry');
    }
  };

  render () {
    return (
      <AddContactBase>
        <TextField
          hintText='First Name'
          value={this.state.firstName}
          onChange={event => this.setState({firstName: event.target.value})}
        />
        <TextField
          hintText='Last Name'
          value={this.state.lastName}
          onChange={event => this.setState({lastName: event.target.value})}
        />
        <TextField
          hintText='Date of Birth'
          value={this.state.dateOfBirth}
          onChange={event => this.setState({dateOfBirth: event.target.value})}
        />
        <TextField
          hintText='Phone Number'
          value={this.state.phoneNumber}
          onChange={event => this.setState({phoneNumber: event.target.value})}
        />
        <FlatButton label="Save" primary={true} onClick={this.handleSave} />
      </AddContactBase>
    );
  }
}
