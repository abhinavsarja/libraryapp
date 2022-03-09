import React from "react";

const LoadingMask = ({ isLoading }) => (isLoading ? <div data-testid="mask" className="lmask" /> :'');

export default LoadingMask;