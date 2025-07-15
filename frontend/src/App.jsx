import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MediBotNavbar from './components/Navbar';
import HeroSection from './components/Home';
import ChatBot from './components/Chatbot';
import { FeedbackComponent } from './components/Feedback';
import RegistrationForm from './components/RegistrationForm';
import Features from './components/Features';
import Demo from './components/Demo';
import FAQAccordion from './components/Faq';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import PayPalCheckout from './components/PayPalCheckout'; // ✅ NEW IMPORT
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import CreateArticle from './components/CreateArticle';
import About from './components/About';

function App() {
  return (
    <Router>
      <MediBotNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
             
              <About/>
              
          
            </>
          }
        />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/feedback" element={<Dashboard/>} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/features" element={<Features />} />
        <Route path="/demo" element={<About/>} />
        <Route path="/faq" element={<FAQAccordion />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<PayPalCheckout />} /> {/* ✅ NEW ROUTE */}
        <Route path="/create" element={<CreateArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
