import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router";

const EditUser = ({ id }) => {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem("currentUser"));
  const currentDefaultQualities = userData.qualities.map((qualitie) => ({
    label: qualitie.name,
    value: qualitie._id
  }));

  console.log("userData", userData);

  const [data, setData] = useState({
    name: userData.name,
    email: userData.email,
    profession: userData.profession._id,
    sex: userData.sex,
    qualities: currentDefaultQualities
  });
  const [qualities, setQualities] = useState({});
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => {
      setQualities(data);
    });
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    name: {
      isRequired: {
        message: "Укажите имя"
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
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

  const updateUserData = () => ({
    name: data.name,
    email: data.email,
    sex: data.sex,

    qualities: data.qualities.map((qualitie) => {
      const currentQualitie = Object.values(qualities).find(
        (qual) => qual._id === qualitie.value
      );
      return currentQualitie;
    }),
    profession: Object.values(professions).find(
      (profession) => profession._id === data.profession
    )
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    const newUserData = updateUserData();
    api.users.update(id, newUserData);

    localStorage.removeItem("currentUser");
    history.push("/users");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <SelectField
              label="Профессия"
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
              label="Пол"
            />
            <MultiSelectField
              defaultValue={data.qualities}
              options={qualities}
              onChange={handleChange}
              name="qualities"
              label="Качества"
            />

            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

EditUser.propTypes = {
  id: PropTypes.string,
  api: PropTypes.any
};

export default EditUser;
