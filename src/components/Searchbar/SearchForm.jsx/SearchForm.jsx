import { Form, FormButton, FormButtonLabel, FormInput } from './SearchFormStyled';

import { HiOutlineSearch } from "react-icons/hi";

import PropTypes from "prop-types";
import { useState } from 'react';

export default function SearchForm({onSubmit}) {
  const [searchName, setSearchName] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchName(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchName);
    reset()
  }

  const reset = () => {
    setSearchName("");
  }

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

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
