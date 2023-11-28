import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { convertToLabel } from '../../genericFunctions/converters';
import { addEditCustomer } from '../../CRUD functions/customerFunctions';
import { isResponseSuccess } from '../../genericFunctions/functions';
import { useDispatch } from 'react-redux';
import { getCustomers } from '../../store/customersSlice';
import ErrorComponent from './ErrorComponent';

const AddEditComponent = () => {
  const [initialObject, setInitialObject] = useState({});
  const [message0, setMessage0] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { action } = useParams();

  useEffect(() => {
    switch (action) {
      case 'addCustomer':
        setInitialObject({
          firstName: '',
          lastName: '',
          companyName: '',
          phoneNumber: '',
          phoneNumber2: '',
          email: '',
          email2: '',
          extraDetails: '',
        });
        break;

      default:
        break;
    }
  }, [action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialObject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addEditCustomer(initialObject, action);
    const isSuccess = isResponseSuccess(response);
    if (isSuccess) {
      setMessage0(response.data);
      dispatch(getCustomers());
      navigate('/');
    } else {
      console.log(response.data);
      setMessage0(response.data);
    }
  };
  return (
    <Card className=' mt-3'>
      <CardHeader className=' text-center h3'>
        {convertToLabel(action)}
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit} className=' mt-3'>
          <Form.Group controlId='firstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              name='firstName'
              value={initialObject.firstName}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </Form.Group>

          <Form.Group controlId='lastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              name='lastName'
              value={initialObject.lastName}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </Form.Group>

          <Form.Group controlId='companyName'>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type='text'
              name='companyName'
              value={initialObject.companyName}
              onChange={handleChange}
              maxLength={100}
            />
          </Form.Group>

          <Form.Group controlId='phoneNumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='tel'
              name='phoneNumber'
              value={initialObject.phoneNumber}
              onChange={handleChange}
              maxLength={50}
              required
            />
          </Form.Group>

          <Form.Group controlId='phoneNumber2'>
            <Form.Label>Phone Number 2</Form.Label>
            <Form.Control
              type='tel'
              name='phoneNumber2'
              value={initialObject.phoneNumber2 || ''}
              onChange={handleChange}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={initialObject.email}
              onChange={handleChange}
              maxLength={200}
              required
            />
          </Form.Group>

          <Form.Group controlId='email2'>
            <Form.Label>Email 2</Form.Label>
            <Form.Control
              type='email'
              name='email2'
              value={initialObject.email2 || ''}
              onChange={handleChange}
              maxLength={200}
            />
          </Form.Group>

          <Form.Group controlId='extraDetails'>
            <Form.Label>Extra Details</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              name='extraDetails'
              value={initialObject.extraDetails || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit' className=' mt-2'>
            Submit
          </Button>
        </Form>
      </CardBody>
      <CardFooter>
        {message0 !== '' && <ErrorComponent variant='danger' data={message0} />}
      </CardFooter>
    </Card>
  );
};

export default AddEditComponent;
