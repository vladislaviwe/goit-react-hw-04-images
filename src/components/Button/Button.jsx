import PropTypes from "prop-types";
import { LoadMoreButton } from "./ButtonStyled";

const Button = ({loadMore}) => {
    return (
        <LoadMoreButton onClick={loadMore}>Load more</LoadMoreButton>
    )
}

export default Button;

Button.propTypes = {
    loadMore: PropTypes.func.isRequired
}