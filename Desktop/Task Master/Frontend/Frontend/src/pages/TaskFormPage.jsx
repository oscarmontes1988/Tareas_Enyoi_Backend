import React from "react";
import { useForm } from "react-hook-form";
import { createTask } from "../api/task";
import { useNavigate } from "react-router-dom";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const taskData = {
        title: data.title,
        description: data.description,
        due_date: data.due_date,
        priority: data.priority,
        status: data.status,
        category: data.category,
      };

      await createTask(taskData);
      navigate("/tasks");
    } catch (error) {
      console.error("Error al crear la tarea", error);
    }
  });

  return (
    <div className="form-container">
      <h1>Registro de tareas</h1>
      <form onSubmit={onSubmit} className="task-form">
        <input
          type="text"
          placeholder="Nombre de la tarea"
          {...register("title", { required: true })}
        />
        {errors.title && <span>El título es requerido</span>}

        <textarea
          rows="3"
          placeholder="Descripción de la tarea"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>La descripción es requerida</span>}

        <input
          type="date"
          {...register("due_date", { required: true })}
        />
        {errors.due_date && <span>La fecha es requerida</span>}

        <select {...register("priority", { required: true })}>
          <option value="">Selecciona prioridad</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        {errors.priority && <span>La prioridad es requerida</span>}

        <select {...register("status", { required: true })}>
          <option value="">Selecciona estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>
        {errors.status && <span>El estado es requerido</span>}

        <select {...register("category", { required: true })}>
          <option value="">Selecciona categoría</option>
          <option value="urgente e importante">Urgente e importante</option>
          <option value="urgente y no importante">Urgente y no importante</option>
          <option value="no urgente, pero importante">No urgente, pero importante</option>
          <option value="no urgente y no importante">No urgente y no importante</option>
        </select>
        {errors.category && <span>La categoría es requerida</span>}

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
