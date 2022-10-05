import { Component } from 'react'

import { Form, FormButton, FormButtonLabel, FormInput } from './SearchFormStyled';

import { HiOutlineSearch } from "react-icons/hi";

import PropTypes from "prop-types";

export default class SearchForm extends Component {
  state = {
    searchName: "",
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({...this.state});
    this.reset()
  }

  reset() {
    this.setState({
      searchName: ""
    })
  }
  
  render() {
    const { searchName } = this.state;
    const { handleSubmit, handleChange } = this;


    return (
        <Form onSubmit={handleSubmit}>
            <FormButton type="submit" onClick={handleSubmit}>
                <HiOutlineSearch />
                <FormButtonLabel></FormButtonLabel>
            </FormButton>

            <FormInput
                value={searchName}
                onChange={handleChange}
                name="searchName"
                type="text"
                autocomplete="off"
                autoFocus
                placeholder="Search images and photos"
                required
            />
        </Form>
    )
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
