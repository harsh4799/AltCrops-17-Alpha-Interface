import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/logo-react.png"
      style={{
        height: "32px"
      }}
      {...props}
    />
  );
};

export default Logo;
