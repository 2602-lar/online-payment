import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login';
import { Home } from './pages/Home';
import "react-toastify/dist/ReactToastify.css"
import { AuthProvider } from './Context/AuthContext';
import Dashboard from './pages/Dashboard';
import Transactions from './Nav-Components/Transactions';
import Profile from './Nav-Components/Profile';
import ContactUs from './Nav-Components/ContactUs';
import Clients from './Nav-Components/Clients.jsx';
import MessagesAdmin from './Nav-Components/MessagesAdmin.jsx';
import Withdrawals from './Nav-Components/Withdrawals.jsx';
import Deposits from './Nav-Components/Deposits.jsx'
import TransactionsAdmin from './Nav-Components/TransactionsAdmin.jsx';
import DashboardAdmin from './pages/DashboardAdmin.jsx';


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
              <Route path = 'clients' element = {<Clients/>}/>
              <Route path = 'messages-admin' element = {<MessagesAdmin/>}/>
              <Route path = 'deposits' element = {<Deposits/>}/>
              <Route path = 'withdrawals' element = {<Withdrawals/>}/>
              <Route path = 'transactions-admin' element = {<TransactionsAdmin/>}/>
              <Route path = 'dashboard-admin' element = {<DashboardAdmin/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
