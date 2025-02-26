import React, { useState, useEffect } from 'react';
import logo from '../assets/logoP9.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [idioma, setIdioma] = useState('es'); // Por defecto español
  const [moneda, setMoneda] = useState('EUR'); // Por defecto EUR

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIdioma = localStorage.getItem('idioma') || 'es';
      const storedMoneda = localStorage.getItem('moneda') || 'EUR';
      setIdioma(storedIdioma);
      setMoneda(storedMoneda);

      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (user) {
        setLoggedInUser(user);
      }

      function handleStorageChange() {
        const updatedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(updatedUser || null);
      }

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('loggedInUser');
      setLoggedInUser(null);
      window.location.href = '/';
    }
  };

  const handleIdiomaChange = (e) => {
    const nuevoIdioma = e.target.value;
    setIdioma(nuevoIdioma);
    if (typeof window !== "undefined") {
      localStorage.setItem('idioma', nuevoIdioma);
      window.location.reload();
    }
  };

  const handleMonedaChange = (e) => {
    const nuevaMoneda = e.target.value;
    setMoneda(nuevaMoneda);
    if (typeof window !== "undefined") {
      localStorage.setItem('moneda', nuevaMoneda);
      window.location.reload();
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={logo.src} alt="CursosMason Logo" className="h-10 w-15 mr-2" />
            <span className="text-xl font-bold text-gray-800">CursosMason</span>
          </a>
        </div>

        {/* Selectores de idioma y moneda */}
        <div className="hidden md:flex items-center space-x-4">
          <select 
            value={idioma} 
            onChange={handleIdiomaChange} 
            className="border px-2 py-1 rounded cursor-pointer"
          >
            <option value="es">🇪🇸 Español</option>
            <option value="en">🇬🇧 English</option>
          </select>

          <select 
            value={moneda} 
            onChange={handleMonedaChange} 
            className="border px-2 py-1 rounded cursor-pointer"
          >
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>

        {/* Botón para móvil */}
        <div className="md:hidden">
          <button onClick={handleToggle} className="text-gray-700 focus:outline-none" aria-label="Toggle menu">
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Enlaces de navegación */}
        <div className={`flex-1 justify-end md:flex md:items-center md:static ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-2 md:mt-0">
            {loggedInUser ? (
              <>
                <li>
                  <a href="/misCursos" className="text-blue-600 hover:text-blue-800 px-4 py-1">
                    {idioma === 'es' ? 'Mis Cursos' : 'My Courses'}
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-50">
                    {idioma === 'es' ? 'Cerrar Sesión' : 'Logout'}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login" className="text-gray-700 px-4 py-1 border border-gray-300 rounded hover:bg-gray-100">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                    {idioma === 'es' ? 'Registrarse' : 'Sign Up'}
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
