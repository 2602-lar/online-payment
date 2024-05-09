import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login';
import { Home } from './pages/Home';
import "react-toastify/dist/ReactToastify.css"
import { AuthProvider } from './Context/AuthContext';
import Dashboard from './pages/Dashboard';
import Transactions from './Nav-Components/Transactions';
import Profile from './Nav-Components/Profile';
import ContactUs from './Nav-Components/ContactUs';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home/' element={<Home />}>
              <Route path='' element={<Dashboard />} />
              <Route path='transactions' element = {<Transactions/>}/>
              <Route path = 'profile' element = {<Profile/>}/>
              <Route path = 'contact-us' element = {<ContactUs/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
