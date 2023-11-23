import Alert from 'react-bootstrap/Alert';

const NoData = ({ variant, data }) => {
  return (
    <Alert variant={variant} className=' text-center'>
      {data}
    </Alert>
  );
};

export default NoData;
