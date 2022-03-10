import React from "react";
import PropTypes from 'prop-types';

const LoadingMask = ({ isLoading }) => (isLoading ? <div data-testid="mask" className="lmask" /> :'');

LoadingMask.propTypes = {
    isLoading : PropTypes.bool.isRequired,
};

export default LoadingMask;