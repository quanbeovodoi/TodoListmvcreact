import React, { useState } from "react";
import PropTypes from "prop-types";

const TodoForm = (props) => {
  const { onSubmit } = props;
  const [value, setValue] = useState("");

  const handleValueChange = (e) => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSubmit) return;
    const formValue = {
      title: value,
      active: true,
      completed:false,
      isEditing:false
    };
    onSubmit(formValue);
    setValue("");
  };
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="new-todo"
            type="text"
            value={value}
            onChange={handleValueChange}
          />
        </form>
      </header>
    </>
  );
};

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
  onSubmit: null,
};
export default TodoForm;
