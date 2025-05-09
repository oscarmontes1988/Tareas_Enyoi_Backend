import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../api/task";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTask() {
      const res = await getTaskById(id);
      const task = res.data;

      setValue("title", task.title);
      setValue("description", task.description);
      setValue("priority", task.priority);
      setValue("status", task.status);
      setValue("due_date", task.due_date ? new Date(task.due_date) : null);

      setLoading(false);
    }
    loadTask();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedTask = {
        ...data,
        due_date: data.due_date
          ? data.due_date.toISOString().split("T")[0]
          : null,
      };
      await updateTask(id, updatedTask);
      navigate("/tasks");
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  if (loading) return <p>Cargando tarea...</p>;

  return (
    <div className="form-container">
      <h1>Editar Tarea</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="task-form">
        <label>ID de la tarea: {id}</label>
        <label>ID de la tarea:</label>
        <input type="text" value={id} readOnly className="readonly-input" />

        <input
          type="text"
          placeholder="Nombre"
          {...register("title", { required: true })}
        />
        {errors.title && <span>Este campo es obligatorio</span>}

        <textarea
          rows="3"
          placeholder="Descripción"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>Este campo es obligatorio</span>}

        <Controller
          control={control}
          name="due_date"
          render={({ field }) => (
            <DatePicker
              placeholderText="YYYY-MM-DD"
              dateFormat="yyyy-MM-dd"
              selected={field.value}
              onChange={field.onChange}
              className="custom-datepicker"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          )}
        />

        <select {...register("priority", { required: true })}>
          <option value="">Selecciona prioridad</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <select {...register("status", { required: true })}>
          <option value="">Selecciona estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>

        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
