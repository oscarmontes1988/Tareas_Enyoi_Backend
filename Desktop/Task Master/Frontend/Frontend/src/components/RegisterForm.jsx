import React, { useState } from 'react';
import { register } from '../api/login';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterForm() {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = e => setUserData({ ...userData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    try {
      await register(userData);
      navigate('/login');
    } catch {
      setError('Error en el registro');
    }
  };

  return (
    <form onSubmit={onSubmit} className="Registro">
      <h2 className="text-2xl mb-4">Registrarse</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        name="username"
        placeholder="Usuario"
        onChange={onChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        onChange={onChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={onChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full py-2 rounded bg-indigo-600 text-white"
      >
        Registrarse
      </button>
      <p className="mt-4 text-center">
        <Link to="/login" className="text-blue-500 hover:underline">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </p>
    </form>
  );
}