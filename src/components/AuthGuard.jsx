import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }
  }, []);

  return localStorage.getItem('authToken') ? children : null;
}