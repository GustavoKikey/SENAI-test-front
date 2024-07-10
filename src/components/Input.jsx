import React from "react";

const Input = ({ label, type, name, onChange, onBlur, value, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Input;
