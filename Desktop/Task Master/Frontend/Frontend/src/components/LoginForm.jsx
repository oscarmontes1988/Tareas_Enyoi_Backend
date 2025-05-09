import React, { useState } from 'react';
import { login } from '../api/login';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setCreds({ ...creds, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(creds);
      localStorage.setItem('accessToken', data.access);
      // ✅ Redirigir al listado de tareas
      navigate('/tasks');
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-card card p-4 shadow">
        <h2 className="text-2xl mb-4 text-center">Iniciar Sesión</h2>
        {error && <p className="text-danger mb-2">{error}</p>}

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={creds.username}
            onChange={onChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={creds.password} // ✅ Faltaba esto
            onChange={onChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Entrar</button>

        <p className="mt-3 text-center">
          <a href="/request-reset-password" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
        </p>
        <p className="mt-2 text-center">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-blue-500 hover:underline">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
}
