import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar
      expand='lg'
      data-bs-theme='dark'
      className='navbar navbar-expand-lg bg-primary'
    >
      <Navbar.Brand href='#home'>DKMS_WD Management</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ms-auto d-flex align-items-center justify-content-center'>
          <Link className='mx-3' to='/'>
            Customers
          </Link>
          <Link className='mx-3' to='/allJobs'>
            Jobs
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
