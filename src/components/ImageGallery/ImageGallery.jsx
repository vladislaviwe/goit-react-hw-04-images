import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import { Gallery } from './ImageGalleryStyled';

import PropTypes from "prop-types";

const ImageGallery = ({ items, onClick }) => {

    const elements = items.map(({ id, webformatURL, largeImageURL, tags }) => 
    <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} onClick={() => onClick({largeImageURL, tags})}/>);

    return <Gallery>{elements}</Gallery>;
}

export default ImageGallery;

ImageGallery.propTypes = {
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
}