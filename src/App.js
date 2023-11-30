import './App.css';
import { Container } from 'react-bootstrap';
import Navigation from './components/navigation/Navigation';
import { AppProvider } from './Context/context';

import AllCustomers from './components/allCustomers/AllCustomers';
import { Route, Routes } from 'react-router-dom';
import AddEditComponent from './components/generic/AddEditComponent';
import EditableTable from './components/generic/EditableTable';
import AllJobs from './components/allJobs.js/AllJobs';

function App() {
  return (
    <div className='App'>
      <Container>
        <AppProvider>
          <Navigation />
          <Routes>
            <Route path='/' element={<AllCustomers />} />
            <Route path='/allJobs' element={<AllJobs />} />
            <Route path='addEdit/:action/:id' element={<AddEditComponent />} />
            <Route path='details/:id' element={<EditableTable />} />
          </Routes>
        </AppProvider>
      </Container>
    </div>
  );
}

export default App;
