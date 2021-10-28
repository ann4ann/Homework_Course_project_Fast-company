import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualitie from "../../ui/qualities/quality";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(id).then((data) => {
      setUser(data);
    });
  }, []);

  const handleGoToUsers = () => {
    history.push("/users");
  };

  return (
    <>
      <h2>{!user ? "loading..." : ""}</h2>
      {user && (
        <>
          <h1>{user.name}</h1>
          <h3>Профессия: {user.profession.name}</h3>
          <p>
            {user.qualities.map((qual) => (
              <Qualitie key={qual._id} {...qual} />
            ))}
          </p>
          <p>completedMeetings: {user.completedMeetings}</p>
          <h3>Rate: {user.rate}</h3>
          <button
            onClick={() => {
              handleGoToUsers();
            }}
          >
            Все пользователи
          </button>
        </>
      )}
    </>
  );
};

UserPage.propTypes = {
  id: PropTypes.string
};

export default UserPage;
