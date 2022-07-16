import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  // useEffect(() => {
  //   console.log(professions);
  // }, [professions]);

  const handleChange = (target) => {
    // console.log(target);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
      min: { message: "Пароль должен состоять минимум из 8 символов", value: 8 }
    },
    profession: {
      isRequired: { message: "Обязательно выберите вашу профессию" }
    },
    license: {
      isRequired: {
        message:
          "Вы не можете испльзовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <>
      {professions && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Электронная почта"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            label="Пароль"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />
          <SelectField
            label="Выберите вашу профессию:"
            defaultOption="Choose..."
            name="profession"
            options={professions}
            onChange={handleChange}
            value={data.profession}
            error={errors.profession}
          />
          <RadioField
            options={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
              { name: "Other", value: "other" }
            ]}
            value={data.sex}
            name="sex"
            onChange={handleChange}
            label="Выберите ваш пол:"
          />
          <MultiSelectField
            options={qualities}
            onChange={handleChange}
            name="qualities"
            label="Выберите ваши качества:"
          />
          <CheckBoxField
            value={data.license}
            onChange={handleChange}
            name="license"
            error={errors.license}
          >
            Подтвердить <a href="">лицензионное соглашение</a>
          </CheckBoxField>

          {/* <div className="mb-4">
        <label htmlFor="validationCustom04" className="form-label">
          State
        </label>
        <select
          className="form-select"
          id="validationCustom04"
          name="profession"
          value={data.profession}
          onChange={handleChange}
        >
          <option disabled value="">
            Choose...
          </option>
          {professions &&
            professions.map((profession) => (
              <option
                // selected={profession._id === data.profession}
                value={profession._id}
                key={profession._id}
              >
                {profession.name}
              </option>
            ))}
        </select>
        <div className="invalid-feedback">Please select a valid state.</div>
      </div> */}

          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default RegisterForm;
