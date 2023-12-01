import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TooltipGen = ({ title, text }) => {
  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props} className='custom-tooltip'>
      <span>{text}</span>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement='right'
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <span style={{ cursor: 'pointer' }}>{title}</span>
    </OverlayTrigger>
  );
};

export default TooltipGen;
