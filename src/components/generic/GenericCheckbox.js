import React, { useEffect, useState } from 'react';
import { InputGroup } from 'react-bootstrap';

const GenericCheckbox = ({
  data,
  itemId,
  updateFunction,
  disabled = false,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    updateFunction(itemId, event.target.checked);
  };

  useEffect(() => {
    setIsChecked(data);
  }, [data]);
  return (
    <td className='d-flex justify-content-center'>
      <InputGroup.Checkbox
        checked={isChecked}
        onChange={handleCheckboxChange}
        aria-label='Checkbox for following text input'
        disabled={disabled}
      />
    </td>
  );
};

export default GenericCheckbox;
