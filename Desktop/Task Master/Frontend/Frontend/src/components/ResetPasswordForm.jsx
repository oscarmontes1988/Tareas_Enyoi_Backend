import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyResetToken, setNewPassword } from '../api/login';

export default function ResetPasswordForm() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    console.log('[DEBUG] URL Params:', { uidb64, token });
    verifyResetToken(uidb64, token)
      .then(() => {
        setValidToken(true);
        setLoading(false);
      })
      .catch(() => {
        setError('El enlace de recuperación no es válido o ha expirado.');
        setLoading(false);
      });
  }, [uidb64, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const { data } = await setNewPassword({ uidb64, token, password });
      setSuccessMessage(data.detail || 'Contraseña restablecida correctamente.');
      setError('');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error('[ERROR] Reset password:', err);
      const backendError = err.response?.data?.detail || 'No se pudo restablecer la contraseña. Intenta nuevamente.';
      setError(backendError);
    }
  };

  if (loading) return <p className="text-center">Verificando enlace...</p>;

  if (error && !validToken) return (
    <p className="text-red-600 text-center mt-10">
      {error}
    </p>
  );

  return (
    <div className="password max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow">
        <h2 className="text-2xl mb-4 text-center">Nueva Contraseña</h2>

        {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
        {successMessage && <p className="text-green-600 mb-2 text-center">{successMessage}</p>}

        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">Contraseña</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Restablecer Contraseña
        </button>
      </form>
    </div>
  );
}
