import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ label, name, value, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: [target.name], value: target.value });
  };

  const getInputClasses = () => {
    return "form-control h-100" + (error ? " is-invalid" : "");
  };

  return (
    <div className="form-floating mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          className={getInputClasses()}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        ></textarea>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
    // <div className="mb-4">
    //   <label htmlFor={name}>{label}</label>
    //   <div className="input-group has-validation">
    //     <input
    //       type={showPassword ? "text" : type}
    //       id={name}
    //       name={name}
    //       value={value}
    //       onChange={handleChange}
    //       className={getInputClasses()}
    //     />
    //     {type === "password" && (
    //       <button
    //         className="btn btn-outline-secondary"
    //         type="button"
    //         onClick={toggleShowPassword}
    //       >
    //         <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
    //       </button>
    //     )}
    //     {error && <div className="invalid-feedback">{error}</div>}
    //   </div>
    // </div>
  );
};

TextArea.defaultProps = {
  type: "text"
};
TextArea.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextArea;
