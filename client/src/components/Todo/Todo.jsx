import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodos,
  deleteTodos,
  editingTodos,
  fetchTodos,
  updateTodos,
} from "./../../features/todoSlice";
import Loader from "react-js-loader";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "./todo.module.sass";
import ModeEdit from "@mui/icons-material/ModeEdit";

const Todo = () => {
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const dispatch = useDispatch();
  const { todo, error, isLoading } = useSelector((state) => state.todo);
  
  const isCompleted = [];
  const isActive = [];

  todo.map((item) =>
    item.completed === true ? isCompleted.push(item) : isActive.push(item)
  );

  const percent = ((isCompleted.length / todo.length) * 100).toFixed(2);

  useEffect(() => {
    dispatch(fetchTodos("All"));
  }, [dispatch]);

  const handleCheck = (id, completed) => {
    dispatch(updateTodos({ id, completed }));
  };

  const handleEdit = (id, editing, text) => {
    dispatch(editingTodos({ id, editing, text }));
  };

  const addTodo = () => {
    if (value && todo.length < 8) {
      dispatch(createTodos(value));
      setValue("");
    }
  };

  const handleRemove = (id) => {
    dispatch(deleteTodos(id));
  };

  return (
    <div className={style.container}>
      <div className={style.info}>
        <h1>Всего: {todo.length}</h1>
        <h1 style={{ color: "green" }}>Завершено : {isCompleted.length}</h1>
        <h1 style={{ color: "blue" }}>Активные : {isActive.length}</h1>
        <h1 style={{ color: "red" }}>Процент: {percent > 0 ? percent : 0}%</h1>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Новая задача..."
          maxLength='12'
        />
        <button onClick={addTodo}>Добавить</button>
      </form>
      {error && <h1 className={style.err}>{error}</h1>}
      <div className={style.tasks}>
        {isLoading ? (
          <div className={style.preLoader}>
            <Loader type="spinner-cub" bgColor={"#000"} size={80} />
          </div>
        ) : !todo.length ? (
          <h2 className={style.notTasks}>Пока нет задач!</h2>
        ) : (
          todo.map((item) => {
            return (
              <>
                <div key={item._id} className={style.todo}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(item._id, item.completed)}
                    checked={item.completed}
                  />
                  <div className={style.date}>{new Date(item.createdAt).toLocaleString()}</div>
                  {item.editing ? (
                    <input
                      placeholder="Редактировать..."
                      className={style.edit}
                      defaultValue={item.text}
                      onChange={(e) => setEditValue(e.target.value)}
                      maxLength='12'
                    />
                  ) : (
                    <span
                      style={{ cursor: "pointer" }}
                      className={item.completed ? "status" : ""}
                    >
                      {item.text}
                    </span>
                  )}
                  {item.editing ? (
                    <IconButton className={style.addEdit}>
                      <CheckIcon
                        onClick={() => {
                          handleEdit(item._id, item.editing, editValue);
                        }}
                      />
                    </IconButton>
                  ) : (
                    <div className={style.icon}>
                      <IconButton
                        style={{ color: "blue" }}
                        onClick={() =>
                          handleEdit(item._id, item.editing, item.text)
                        }
                      >
                        <ModeEdit />
                      </IconButton>
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => handleRemove(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Todo;
