import PropTypes from 'prop-types';
import { ImageGalleryUl } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';

export default function ImageGallery({ images, onClick }) {
  const element = images.map(image => (
    <ImageGalleryItem onClick={onClick} image={image} key={image.id} />
  ));
  return <ImageGalleryUl>{element}</ImageGalleryUl>;
}

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
