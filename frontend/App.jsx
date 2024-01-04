import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import GasBoilersPage from './pages/GasBoilersPage.jsx'
import Login from './pages/Login.jsx';


export default function App() {
  return (
      <NotificationProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/visualisations/hourlygasboilers" element={<GasBoilersPage />} />
            </Routes>
            <ToastContainer />
        </Router>
      </NotificationProvider>
  )
}

