import React, { useState } from 'react';
import { requestPasswordReset } from '../api/login';
import { Link } from 'react-router-dom';

export default function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await requestPasswordReset(email); // ✅ PASAMOS SOLO EL EMAIL
      setMessage(data.detail);
      setError('');
    } catch (err) {
      setMessage('');
      setError('Error al enviar correo de recuperación.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="reset max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl mb-4 text-center">Recuperar Contraseña</h2>

      {message && <p className="text-green-600 text-center mb-2">{message}</p>}
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600"
      >
        Enviar correo
      </button>

      <p className="mt-4 text-center">
        <Link to="/login" className="text-blue-500 hover:underline">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </p>
    </form>
  );
}
