// // src/components/MediBotNavbar.jsx

// import React, { useEffect, useState } from 'react';
// import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';

// const MediBotNavbar = () => {
//   const [userEmail, setUserEmail] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const email = localStorage.getItem('userEmail');
//     if (token && email) {
//       setUserEmail(email);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setUserEmail(null);
//     navigate('/');
//   };

//   return (
//     <Navbar
//       bg="light"
//       expand="lg"
//       className="shadow-sm fixed sticky-top"
//       style={{ zIndex: 1000, boxShadow: '0 0 9px rgba(0,0,0,0.1)' }}
//     >
//       <Container>
//         <Navbar.Brand
//   as={Link}
//   to="/"
//   className="fw-bold"
//   style={{
//     fontFamily: 'Poppins, Segoe UI, Arial, sans-serif',
//     color: '#218838',
//     fontSize: '2.2rem',
//     letterSpacing: '1px'
//   }}
// >
//   Knowledge Base
// </Navbar.Brand>

//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link as={Link} to="/">Home</Nav.Link>

//             {/* ✅ ARTICLES DROPDOWN */}
//             <NavDropdown title="Articles" id="articles-dropdown">
              
//               <NavDropdown.Item
//                 onClick={() => {
//                   if (userEmail) {
//                     navigate('/features');
//                   } else {
//                     alert('⚠️ Please login to create an article.');
//                     navigate('/login');
//                   }
//                 }}
//               > View Articles</NavDropdown.Item>
//               <NavDropdown.Item
//                 onClick={() => {
//                   if (userEmail) {
//                     navigate('/create');
//                   } else {
//                     alert('⚠️ Please login to create an article.');
//                     navigate('/login');
//                   }
//                 }}
//               >
//                 Create Article
//               </NavDropdown.Item>
//             </NavDropdown>

//             <Nav.Link as={Link} to="/demo">About Us</Nav.Link>

//             {/* ✅ Show Dashboard only if logged in */}
//             {userEmail && (
//               <Nav.Link as={Link} to="/feedback">Dashboard</Nav.Link>
//             )}
//           </Nav>

//           <div className="d-flex ms-lg-3 mt-2 mt-lg-0">
//             {!userEmail ? (
//               <>
//                 <Button
//   style={{
//     backgroundColor: '#34d3998c', // light green
//     color: '#065f46',           // dark green text
//     border: 'none',
//     fontWeight: 'bold'
//   }}
//   className="me-2"
//   as={Link}
//   to="/login"
// >
//   Login
// </Button>
// <Button
//   style={{
//     backgroundColor: '#1f8034ff', // thick green
//     color: '#fff',
//     border: 'none',
//     fontWeight: 'bold'
//   }}
//   as={Link}
//   to="/register"
// >
//   Sign Up
// </Button>
//               </>
//             ) : (
//               <NavDropdown title={userEmail} id="profile-dropdown" align="end">
//                 <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//               </NavDropdown>
//             )}
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default MediBotNavbar;


// src/components/MediBotNavbar.jsx

import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const MediBotNavbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserEmail(null);
    navigate('/');
  };

  const navLinkStyle = {
    color: '#065f46',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  };

  const navLinkHover = {
    backgroundColor: '#e6fffa',
    transform: 'scale(1.05)',
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm fixed sticky-top"
      style={{
        zIndex: 1000,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s ease-in-out',
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold"
          style={{
            fontFamily: 'Poppins, Segoe UI, Arial, sans-serif',
            color: '#16a34a',
            fontSize: '2.0rem',
            letterSpacing: '1px',
            transition: 'transform 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
         ✨ KNOWLEDGE-BASE
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={navLinkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, navLinkHover)}
              onMouseLeave={(e) =>
                Object.assign(e.target.style, navLinkStyle)
              }
            >
              Home
            </Nav.Link>

            <NavDropdown
              title="Articles"
              id="articles-dropdown"
              style={navLinkStyle}
            >
              <NavDropdown.Item
                onClick={() => {
                  if (userEmail) {
                    navigate('/features');
                  } else {
                    alert('⚠️ Please login to view articles.');
                    navigate('/login');
                  }
                }}
              >
                View Articles
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  if (userEmail) {
                    navigate('/create');
                  } else {
                    alert('⚠️ Please login to create an article.');
                    navigate('/login');
                  }
                }}
              >
                Create Article
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              as={Link}
              to="/demo"
              style={navLinkStyle}
              onMouseEnter={(e) => Object.assign(e.target.style, navLinkHover)}
              onMouseLeave={(e) =>
                Object.assign(e.target.style, navLinkStyle)
              }
            >
              About Us
            </Nav.Link>

            {userEmail && (
              <Nav.Link
                as={Link}
                to="/feedback"
                style={navLinkStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, navLinkHover)}
                onMouseLeave={(e) =>
                  Object.assign(e.target.style, navLinkStyle)
                }
              >
                Dashboard
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex ms-lg-3 mt-2 mt-lg-0">
            {!userEmail ? (
              <>
                <Button
                  style={{
                    backgroundColor: '#bbf7d0',
                    color: '#065f46',
                    border: 'none',
                    fontWeight: 'bold',
                    transition: 'transform 0.3s ease',
                  }}
                  className="me-2"
                  as={Link}
                  to="/login"
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  Login
                </Button>
                <Button
                  style={{
                    backgroundColor: '#15803d',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 'bold',
                    transition: 'transform 0.3s ease',
                  }}
                  as={Link}
                  to="/register"
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <NavDropdown
                title={userEmail}
                id="profile-dropdown"
                align="end"
                style={navLinkStyle}
              >
                <NavDropdown.Item as={Link} to="/checkout">
                  Become a Premium User
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MediBotNavbar;
