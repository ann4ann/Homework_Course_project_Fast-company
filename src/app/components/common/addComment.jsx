import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import SelectField from "./form/selectField";
import api from "../../api";
import PropTypes from "prop-types";
import TextArea from "./form/textArea";

const AddComment = ({ pageId, addCommentFunc }) => {
  // console.log(pageId);
  const [data, setData] = useState({
    pageId: pageId,
    userId: "",
    content: ""
  });
  const [users, setUsers] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleChange = (target) => {
    // console.log("target: ", target);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Выберите пользователя"
      }
    },
    content: {
      isRequired: {
        message: "Текст комментария пуст"
      }
    }
  };

  useEffect(() => {
    validate();
    // console.log("data: ", data);
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  // const clearData = () => {

  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    // console.log(data);
    addCommentFunc(data);
    setData({
      pageId: pageId,
      userId: "",
      content: ""
    });
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h2>New comment</h2>
        <form onSubmit={handleSubmit}>
          {users && (
            <SelectField
              label="Выберите пользователя"
              defaultOption="Choose..."
              name="userId"
              options={users}
              onChange={handleChange}
              value={data.userId}
              error={errors.userId}
            />
          )}
          <TextArea
            name="content"
            value={data.content}
            onChange={handleChange}
            error={errors.content}
          />

          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

AddComment.propTypes = {
  addCommentFunc: PropTypes.func,
  pageId: PropTypes.string
};

export default AddComment;
