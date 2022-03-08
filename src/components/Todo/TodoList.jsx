import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TodoList = (props) => {
  const [edittext, setEdittext] = useState(false);
  const [value, setValue] = useState("");
  const [checked, setcheckedAll] = useState(false);
  const {
    todos,
    onTodoClick,
    ontoggleTodo,
    onEditTodo,
    onDeleteTodo,
    onClear,
    cancelEditTodo,
    saveEditing,
    checkAll,
  } = props;
  const [filterCompelete, setfltCompelete] = useState(1);
  const handleClick = (todo) => {
    setClicktxt(todo);
    if (onTodoClick) {
      onTodoClick(todo);
    }
  };
  const toggleTodo = (todo) => {
    if (ontoggleTodo) {
      ontoggleTodo(todo);
    }
  };
  const editTodo = (todo) => {
    setEdittext(true);
    onEditTodo(todo);
  };
  const deleteTodo = (todo) => {
    if (onDeleteTodo) onDeleteTodo(todo);
  };
  const clearcompleted = (todos) => {
    if (onClear) onClear(todos);
  };
  const saveEditingTodoTitle = (todo) => {
    setEdittext(false);
    if (saveEditing) {
      saveEditing(todo, value);
    }
  };
  const changeEditingTodoTitle = (e) => {
    setValue(e.target.value);
  };
  const setClicktxt = (todo) => {
    setValue(todo.title);
  };
  const cancelEditingTodo = (todo) => {
    setEdittext(false);
    cancelEditTodo(todo);
  };
  const checkedAll = (checked) => {
    checkAll(checked);
  };
  const inputRef = useRef(null);
  useEffect(() => {
    if (edittext) {
      inputRef.current.focus();
    }
  }, [edittext]);

  return (
    <>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          data-reactid=".0.1.0"
          onClick={() => {
            setcheckedAll(!checked);
            checkedAll(checked);
          }}
        />
        <label htmlFor="toggle-all" data-reactid=".0.1.1"></label>
        <ul className="todo-list">
          {filterCompelete === 2
            ? todos.map((todo) =>
                todo.completed ? (
                  <li
                    key={todo.id}
                    onClick={() => handleClick(todo)}
                    className={classNames({
                      completed: todo.completed,
                      editing: todo.isEditing,
                    })}
                  >
                    <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo)}
                      />
                      <label onDoubleClick={() => editTodo(todo)}>
                        {todo.title}
                      </label>
                      <button
                        className="destroy"
                        onClick={() => deleteTodo(todo)}
                      />
                    </div>
                    {todo.isEditing ? (
                      <input
                        className="edit"
                        ref={inputRef}
                        value={value}
                        onBlur={() => saveEditingTodoTitle(todo)}
                        onChange={changeEditingTodoTitle(todo)}
                        onKeyDown={(event) => {
                          if (event.keyCode === 27) {
                            cancelEditingTodo(todo);
                          } else if (event.keyCode === 13) {
                            saveEditingTodoTitle(todo);
                          }
                        }}
                      />
                    ) : null}
                  </li>
                ) : (
                  <></>
                )
              )
            : filterCompelete === 3
            ? todos.map((todo) =>
                todo.completed === false ? (
                  <li
                    key={todo.id}
                    onClick={() => handleClick(todo)}
                    className={classNames({
                      completed: todo.completed,
                      editing: todo.isEditing,
                    })}
                  >
                    <div className="view">
                      <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo)}
                      />
                      <label onDoubleClick={() => editTodo(todo)}>
                        {todo.title}
                      </label>
                      <button
                        className="destroy"
                        onClick={() => deleteTodo(todo)}
                      />
                    </div>
                    {todo.isEditing ? (
                      <input
                        className="edit"
                        ref={inputRef}
                        value={value}
                        onBlur={() => saveEditingTodoTitle(todo)}
                        onChange={changeEditingTodoTitle}
                        onKeyDown={(event) => {
                          if (event.keyCode === 27) {
                            cancelEditingTodo(todo);
                          } else if (event.keyCode === 13) {
                            saveEditingTodoTitle(todo);
                          }
                        }}
                      />
                    ) : null}
                  </li>
                ) : (
                  <></>
                )
              )
            : todos.map((todo) => (
                <li
                  key={todo.id}
                  onClick={() => handleClick(todo)}
                  className={classNames({
                    completed: todo.completed,
                    editing: todo.isEditing,
                  })}
                >
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo)}
                    />
                    <label onDoubleClick={() => editTodo(todo)}>
                      {todo.title}
                    </label>
                    <button
                      className="destroy"
                      onClick={() => deleteTodo(todo)}
                    />
                  </div>
                  {todo.isEditing ? (
                    <input
                      className="edit"
                      ref={inputRef}
                      value={value}
                      onBlur={() => saveEditingTodoTitle(todo)}
                      onChange={changeEditingTodoTitle}
                      onKeyDown={(event) => {
                        if (event.keyCode === 27) {
                          cancelEditingTodo(todo);
                        } else if (event.keyCode === 13) {
                          saveEditingTodoTitle(todo);
                        }
                      }}
                    />
                  ) : null}
                </li>
              ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter((x) => x.completed === false).length}</strong>{" "}
          items left
        </span>
        <ul className="filters">
          <li>
            <a
              className={"all"}
              onClick={() => {
                setfltCompelete(1);
              }}
            >
              All
            </a>
          </li>{" "}
          <li>
            <a
              className={"active"}
              onClick={() => {
                setfltCompelete(3);
              }}
            >
              Active
            </a>
          </li>{" "}
          <li>
            <a
              className={"complete"}
              onClick={() => {
                setfltCompelete(2);
              }}
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={() => clearcompleted(todos)}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
TodoList.propTypes = {
  todos: PropTypes.array,
  onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
  todos: [],
  onTodoClick: null,
};
export default TodoList;
