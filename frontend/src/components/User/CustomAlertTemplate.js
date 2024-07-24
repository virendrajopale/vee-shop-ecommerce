// CustomAlertTemplate.js
import React from 'react';
import { useAlert } from 'react-alert';

const CustomAlertTemplate = ({ style, options, message, close }) => {
  const alert = useAlert();

  return (
    <div style={{ ...style, color: 'white',backgroundColor:'red' }}>
      {message}
      <button onClick={() => close()}>Close</button>
    </div>
  );
};

export default CustomAlertTemplate;
