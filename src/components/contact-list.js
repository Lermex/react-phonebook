import React, {Component} from 'react';
import DataTables from 'material-ui-datatables';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'react-material-icons/icons/editor/mode-edit';
import DeleteIcon from 'react-material-icons/icons/action/delete';
import AutoComplete from 'material-ui/AutoComplete';

export default class ContactList extends Component {

  tableColumns = [
    {
      key: 'firstName',
      label: 'First Name',
      sortable: true
    }, {
      key: 'lastName',
      label: 'Last Name',
      sortable: true
    }, {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      sortable: true
    }, {
      key: 'phoneNumber',
      label: 'Phone Number',
      sortable: true
    }, {
      key: 'edit',
      render: (key, data) => <IconButton><EditIcon onClick={() => this.props.onEdit(data)}/></IconButton>
    }, {
      key: 'delete',
      render: (key, data) => <IconButton><DeleteIcon onClick={() => this.props.onDelete(data)}/></IconButton>
    }
  ];

  handleUpdateSearch = searchText => {
    this.setState({searchText});
  };

  render() {
    const contacts = this.props.contacts;
    const listData = this.state && this.state.searchText
      ? contacts.filter(contact => Object.values(contact)
        .find(value => typeof value === 'string' &&
          value.toLowerCase().startsWith(this.state.searchText.toLowerCase())))
      : contacts;

    return (
      <div>
        <AutoComplete
          hintText="Search"
          dataSource={[
            ...contacts.map(contact => contact.firstName),
            ...contacts.map(contact => contact.lastName),
            ...contacts.map(contact => contact.dateOfBirth),
            ...contacts.map(contact => contact.phoneNumber)
          ]}
          filter={AutoComplete.caseInsensitiveFilter}
          onUpdateInput={this.handleUpdateSearch}
        />
        <DataTables
          height={'auto'}
          selectable={false}
          showRowHover
          showFooterToolbar={false}
          columns={this.tableColumns}
          data={listData}
          onSortOrderChange={this.props.onSort}
          showCheckboxes={false}
          page={1}
          count={100}
        />
      </div>
    );
  }
}
