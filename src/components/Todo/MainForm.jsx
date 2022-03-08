import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const MainForm = () => {
  const [numberID, setnumberID] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const handletoggleClick = (todo) => {
    todo.completed = !todo.completed;
    const newTodoList = [...todoList];
    setTodoList(newTodoList);
  };
  const checkedAll = (checked) => {
    if (checked) {
      todoList.map((todo) => {
        todo.completed = true;
      });
    }else{
      todoList.map((todo) =>{
        todo.completed = false;
      })
    }
  };
  function handleTodoClick() {}
  function handleTodoFormSubmit(formValues) {
    setnumberID(numberID + 1);
    const newTodo = {
      id: numberID,
      ...formValues,
    };

    if (formValues.title.trim() === "") return;

    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }
  function handletoComplete() {}

  function clearCompleted() {
    const newTodoList = [];
    todoList.map((todo, idx) => {
      if (!todo.completed) {
        newTodoList.push(todo);
      }
    });
    setTodoList(newTodoList);
  }

  function handleTodoDelete(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }
  function editTodo(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList[index].isEditing = true;
    setTodoList(newTodoList);
  }
  function cancelEditingTodo(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList[index].isEditing = false;
    setTodoList(newTodoList);
  }
  function saveEditingTodo(todo, value) {
    if (value.trim()) {
      const index = todoList.findIndex((x) => x.id === todo.id);
      if (index < 0) return;
      const newTodoList = [...todoList];
      newTodoList[index].title = value;
      newTodoList[index].isEditing = false;
      setTodoList(newTodoList);
    } else {
      cancelEditingTodo(todo);
    }
  }
  return (
    <div className="todoapp">
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList
        todos={todoList}
        onTodoClick={handleTodoClick}
        onDeleteTodo={handleTodoDelete}
        ontoggleTodo={handletoggleClick}
        onClear={clearCompleted}
        onEditTodo={editTodo}
        cancelEditTodo={cancelEditingTodo}
        saveEditing={saveEditingTodo}
        checkAll = {checkedAll}
      />
    </div>
  );
};

export default MainForm;
