import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api/login';
import { useNavigate } from 'react-router-dom';

export default function ProfileEdit() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    documento: '',
    telefono: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Si no hay token, redirige inmediatamente al login
    if (!token) {
      navigate('/login');
      return;
    }

    getProfile(token)
      .then(({ data }) => setFormData(data))
      .catch((err) => {
        console.error('Error al obtener perfil:', err);
        // Si el token es inválido o expiró
        if (err.response?.status === 401) {
          localStorage.removeItem('accessToken');
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await updateProfile(token, formData);
      setMessage(data.message || 'Perfil actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('accessToken');
        navigate('/login');
      } else {
        setMessage('Error al actualizar perfil');
      }
    }
  };

  return (
    <div className="editar">
      <h2 className="text-2xl mb-4">Editar Perfil</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      <form onSubmit={handleSubmit}>
        {['username', 'email', 'documento', 'telefono'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block capitalize">{field}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
