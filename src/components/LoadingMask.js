import React from "react";

const LoadingMask = ({ isLoading }) => (isLoading ? <div className="lmask" /> :'');

export default LoadingMask;