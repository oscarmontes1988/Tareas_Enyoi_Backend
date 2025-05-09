import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RequestPasswordReset from './components/RequestPasswordReset';
import ResetPasswordForm from './components/ResetPasswordForm';
import ProfileEdit from './components/ProfileEdit';
import { EditTask } from './pages/EditTask';
import { TaskFormPage } from './pages/TaskFormPage';  
import { TaskList } from './components/TaskList'; 

function App() {
  const token = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        {/* Página de inicio y login */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Recuperación de contraseña */}
        <Route path="/request-reset-password" element={<RequestPasswordReset />} />
        <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordForm />} />

        {/* Perfil protegido */}
        <Route path="/profile" element={token ? <ProfileEdit /> : <Navigate to="/login" replace />} />

        {/* Lista de tareas protegida */}
        <Route path="/tasks" element={token ? <TaskList /> : <Navigate to="" replace />} />

        {/* Crear tarea protegida 👇 */}
        <Route path="/tasks/create" element={token ? <TaskFormPage /> : <Navigate to="/login" replace />} />

        {/* Editar tarea protegida */}
        <Route path="/tasks/edit/:id" element={token ? <EditTask /> : <Navigate to="/login" replace />} />

        {/* Catch-all para rutas no válidas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
