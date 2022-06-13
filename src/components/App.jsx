import React, { Component } from 'react';
import Searchbar from './Searchbar';
import imagesApi from '../services/imagesApi';
import ImageGallery from './ImageGallery';
import Button from './Button';
import './App.css';

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
              status: 'error',
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
        .catch(error => this.setState({ error: error, status: 'rejected' }));
    }
    console.log(this.state.status);
  }

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  handleOpenModal = (largeImageURL = '') => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  onChangeQuery = ({ query }) => {
    this.setState({ query: query, page: 1, images: [], error: null });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      loading: true,
      page: page + 1,
    }));
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onChangeQuery} />
        {this.state.status === 'rejected' && (
          <h1>{this.state.error.massage}</h1>
        )}
        <ImageGallery images={images} onClick={this.handleOpenModal} />
        <Button onClick={this.loadMore} />
      </div>
    );
  }
}
