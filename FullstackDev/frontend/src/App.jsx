import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/home/LandingPage';
import AnalysisForm from './pages/analysis/AnalysisForm';
import ResultPage from './pages/analysis/ResultPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AboutUs from './pages/AboutUs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen ">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/analysis" element={<AnalysisForm />} />
              <Route path="/result" element={<ResultPage />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;