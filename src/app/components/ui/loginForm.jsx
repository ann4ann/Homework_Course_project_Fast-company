import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
// !!!!! Валидация с помощью yup
// import * as yup from "yup";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});

  // чтобы контролировать несколько полей, можно создать для каждого useState, но это не оптимально
  // const [password, setPassword] = useState("");
  // const handleChange = (e) => {
  //     setEmail(e.target.value);
  //     // console.log(e.target.value, "changed");
  // };
  // const handleChange = ({ target }) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value
  //   }));
  //   // console.log(target.name, target.value);
  // };
  // Заменяем на следующее:
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  // !!!!! Валидация с помощью yup
  // const validateSchema = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required("Пароль обязателен для заполнения")
  //     .matches(
  //       // здесь: ?= - выполняется ли, .* - один символ совпадает с, [...] - c чем совпадает
  //       /(?=.*[A-Z])/,
  //       "Пароль должен содержать хотя бы одну заглавную букву"
  //     )
  //     .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одну цифру")
  //     .matches(
  //       /(?=.*[!@*#$%^&])/,
  //       "Пароль должен содержать один из специальных символов !@*#$%^&"
  //     )
  //     // проверяем количество символом - зд. минимум 8
  //     .matches(/(?=.{8,})/, "Пароль должен состоять минимум из 8 символов"),
  //   email: yup
  //     .string()
  //     .required("Электронная почта обязательна для заполнения")
  //     .email("Email введен некорректно")
  // });

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
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    // !!!!! Валидация с помощью yup
    // // validateSchema.validate(data, {abortEarly:false}).then(()=>{}).catch((err)=>)
    // validateSchema
    //   .validate(data)
    //   .then(() => setErrors({}))
    //   .catch((err) => setErrors({ [err.path]: err.message }));
    // // for (const fieldName in data) {
    // //     if (data[fieldName].trim() === "") {
    // //         errors[fieldName] = `${fieldName} обязательно для заполнения`;
    // //     }
    // // }   // вместо этого:
    // // validator();

    setErrors(errors);
    // // return Object.keys(errors).length === 0?true:false  // эквивалентно v
    // // return Object.keys(errors).length === 0 || false; // также зд можно вообще обойтись без false
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    // отменяем обновление страницы (действие по умолчанию) при нажатии кнопки
    e.preventDefault();
    // console.log(e); // -> target -> action: "http://localhost:3000/login" - то, что отменили с пом. preventDefault()

    // проверяем форму перед отправкой v
    // validate();
    // if (Object.keys(errors).length !== 0) return;  // или так
    const isValid = validate();
    if (!isValid) return;

    console.log(data); // вернет объект со значениями из формы
    // !!!!! есть нюанс - может сработать submit до того, как мы получим все значения из полей
  };

  // доступ к значениям полей получаем через атрибут value или onChange
  // value - то значение, которое передаем в поле
  // onChange - даные об изменении содержания поля
  // контролируемое поле в Реакт - когда в нем есть value и onChange
  // Неконтролируемое - без них
  return (
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      {/* кнопке необязательно добавлять type:"submit", т.к. он у всех кнопок в форме по дефолту
              если кнапка не submit, ей необходимо добавить type:"button" */}
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
      {/* <div>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />
        </div> */}
      {/* <div>
          <div>
              <label htmlFor="radio1">Radio 1</label>
              <input type="radio" id="radio1" name="radio" />
          </div>
          <div>
              <label htmlFor="radio2">Radio 2</label>
              <input type="radio" id="radio2" name="radio" />
          </div>
      </div> */}
    </form>
  );
};

export default LoginForm;
