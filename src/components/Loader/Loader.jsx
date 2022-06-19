import React from 'react';
import ReactLoading from 'react-loading';
import { ReactLoadingDiv } from './Loader.styled';

const Loader = () => (
  <ReactLoadingDiv>
    <ReactLoading type="spin" color="green" height="3%" width="3%" />
  </ReactLoadingDiv>
);

export default Loader;
