import { Header } from './SearchbarStyled';

import SearchForm from './SearchForm.jsx/SearchForm';

import PropTypes from "prop-types";

const Searchbar = ({onSearch}) => {
    return (
        <Header>
            <SearchForm onSubmit={onSearch}/>
        </Header>
    )
  }

  export default Searchbar;

  Searchbar.propTypes = {
    onSearch: PropTypes.func.isRequired
  }