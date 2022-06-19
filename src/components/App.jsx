import React, { Component } from 'react';
import Searchbar from './Searchbar';
import imagesApi from '../services/imagesApi';
import ImageGallery from './ImageGallery';
import Button from './Button';
import './App.css';
import Modal from './Modal';
import Loader from './Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    loading: false,
    status: 'idle',
    limit: 12,
    openButton: false,
    totalHits: 0,
    largeImageURL: '',
    showModal: false,
    imgTags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.query;
    const nextName = this.state.query;
    const differentName = prevName !== nextName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const differentPage = prevPage !== nextPage;

    if (differentName || differentPage) {
      if (differentName) {
        this.setState({
          status: 'pending',
          openButton: false,
        });
      }

      imagesApi
        .fetchImages(nextName, this.state.limit, nextPage)
        .then(images => {
          if (!images.hits.length) {
            return this.setState({
              openButton: false,
              status: 'rejected',
            });
          }

          if (differentName) {
            return this.setState({
              images: [...images.hits],
              openButton: true,
              status: 'resolved',
              totalHits: images.totalHits,
            });
          }

          if (differentPage) {
            return this.setState(state => ({
              images: [...state.images, ...images.hits],
              status: 'resolved',
              openButton: true,
              loading: false,
            }));
          }
        })
        .catch(error => this.setState({ error: error, status: 'error' }));
    }
  }

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  handleOpenModal = (largeImageURL = '', imgTags = '') => {
    this.setState({ largeImageURL, imgTags });
    this.toggleModal();
  };

  onChangeQuery = ({ query }) => {
    this.setState({ query: query, page: 1, error: null });
  };

  loadMore = () => {
    this.setState(state => {
      return {
        page: state.page + 1,
        loading: true,
      };
    });
  };

  render() {
    const {
      images,
      largeImageURL,
      imgTags,
      showModal,
      status,
      openButton,
      loading,
      totalHits,
      error,
      query,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onChangeQuery} />
        {status === 'pending' && <Loader />}
        {status === 'idle' && <h1>введите имя картинки в поле поиска</h1>}
        {status === 'rejected' && (
          <h1>изображения с названием "{query}" отсутсвуют</h1>
        )}
        {status === 'error' && <h1>{error.message}</h1>}
        {status === 'resolved' && (
          <ImageGallery images={images} onClick={this.handleOpenModal} />
        )}
        {showModal && (
          <Modal showModal={this.handleOpenModal}>
            <img src={largeImageURL} alt={imgTags} />
          </Modal>
        )}
        {loading && <Loader />}
        {openButton && !loading && images.length !== totalHits && (
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}
