import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  value,
  name,
  onChange,
  defaultOption,
  options,
  error
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id
        }))
      : options.map((option) => ({
        name: option.name,
        value: option._id
      }));
  // console.log(optionsArray);
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option
              // selected={profession._id === data.profession}
              value={option.value}
              key={option.value + option._id}
            >
              {option.name}
            </option>
          ))}
        {/* {professions &&
          professions.map((profession) => (
            <option
              // selected={profession._id === data.profession}
              value={profession._id}
              key={profession._id}>
              {profession.name}
            </option>
          ))} */}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
