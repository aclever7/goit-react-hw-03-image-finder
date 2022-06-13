import PropTypes from 'prop-types';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ image, onClick }) {
  return (
    <ImageGalleryItemLi onClick={() => onClick(image.largeImageURL)}>
      <ImageGalleryItemImage src={image.webformatURL} alt={image.tags} />
    </ImageGalleryItemLi>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
};
