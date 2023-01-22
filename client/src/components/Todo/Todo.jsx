import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodos,
  deleteAllTodos,
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
  const dispatch = useDispatch();

  const { todo, error, isLoading } = useSelector((state) => state.todo);

  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [warning, setWarning] = useState(false);
  const [unique, setUnique] = useState(false);

  const isCompleted = [];
  const isActive = [];

  const uniq = todo.find((item) => item.text === value);
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
    setEditValue(text);
    dispatch(editingTodos({ id, editing, text }));
  };

  const addTodo = () => {
    if (value && !uniq) {
      setUnique(false);
      dispatch(createTodos(value));
      setValue("");
    } else if (value) {
      setUnique(true);
    }
  };

  const handleRemove = (id, completed) => {
    if (completed) {
      setWarning(false);
      setUnique(false);
      dispatch(deleteTodos({ id, completed }));
    } else {
      setWarning(true);
    }
  };

  const handleRemoveAll = () => {
    dispatch(deleteAllTodos());
    setWarning(false);
    setUnique(false);
  };

  return (
    <div className={style.container}>
      <div className={style.info}>T O D O</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Новая задача..."
          maxLength="20"
        />
        <button onClick={addTodo}>Добавить</button>
      </form>
      {error && <h1 className={style.err}>{error}</h1>}
      {warning && (
        <h1 className={style.warning}>
          Можно удалять только завершённые задачи!
        </h1>
      )}
      {unique && <h1 className={style.uniq}>Такая задача уже существует!</h1>}
      <div className={style.block}>
        <div
          className={style.tasks}
          style={todo.length > 8 ? { overflowY: "scroll" } : null}
        >
          {isLoading ? (
            <div className={style.preLoader}>
              <Loader type="spinner-cub" bgColor={"#000"} size={80} />
            </div>
          ) : !todo.length ? (
            <h2 className={style.notTasks}>Пока нет задач!</h2>
          ) : (
            todo.map((item, index) => {
              return (
                <>
                  <div key={item._id} className={style.todo}>
                    <div className={style.number}>{index + 1} )</div>
                    <input
                      type="checkbox"
                      className={style.check}
                      onChange={() => handleCheck(item._id, item.completed)}
                      checked={item.completed}
                    />
                    <div className={style.date}>
                      <span>
                        {"Создана: " +
                          new Date(item.createdAt).toLocaleTimeString()}
                      </span>
                        <span>
                          {item.completed ? "Завершена: " + new Date(item.updatedAt).toLocaleTimeString() : 'Завершена: '}
                        </span>
                    </div>
                    {item.editing ? (
                      <input
                        placeholder="Редактировать..."
                        className={style.edit}
                        onChange={(e) => setEditValue(e.target.value)}
                        defaultValue={editValue}
                        maxLength="18"
                      />
                    ) : (
                      <span
                        style={{ cursor: "pointer", marginLeft: '60px' }}
                        className={item.completed ? "status" : ""}
                      >
                        {item.text}
                      </span>
                    )}
                    {item.editing ? (
                      <IconButton className={style.addEdit}>
                        <CheckIcon
                          onClick={() => {
                            editValue.length > 0 &&
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
                          onClick={() => handleRemove(item._id, item.completed)}
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
        <div className={style.information}>
          <h1>Всего: {todo.length}</h1>
          <h1 style={{ color: "green" }}>Завершено : {isCompleted.length}</h1>
          <h1 style={{ color: "blue" }}>Активные : {isActive.length}</h1>
          <h1 style={{ color: "red" }}>
            Процент: {percent > 0 ? percent : 0}%
          </h1>
        </div>
      </div>
      <div className={style.removeAll}>
        <button onClick={handleRemoveAll}>Удалить все</button>
      </div>
    </div>
  );
};

export default Todo;
