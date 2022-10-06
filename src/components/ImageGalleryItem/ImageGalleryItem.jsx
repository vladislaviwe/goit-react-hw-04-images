import { GalleryItem, GalleryItemImage } from "./ImageGalleryItemStyled"
import PropTypes from "prop-types";

export default function ImageGalleryItem({ webformatURL, tags, onClick }) {
    return (
        <GalleryItem>
            <GalleryItemImage src={webformatURL} alt={tags} onClick={onClick} />
        </GalleryItem>
    )
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}