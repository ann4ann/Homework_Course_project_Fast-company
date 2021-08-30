import React, { useState } from "react";
// import User from "./user"
import api from "../api";   //убрать

const Users = () => {
  // // api.users.fetchAll
  const [users, setUsers] = useState(api.users.fetchAll());

  const renderQualities = (user) => {
    const allQualities = user.qualities.map((qualitie) => {
      return (
        <span key={qualitie._id} className={"badge m-1 bg-" + qualitie.color}>
          {qualitie.name}
        </span>
      );
    });
    return allQualities;
  };

  const handleDelete = (userId) => {
    setUsers(
      users.filter((user) => {
        return user._id !== userId;
      })
    );
  };

  const renderPhrase = (number) => {
    const usersCount = number.length;
    const ending = usersCount > 1 && usersCount < 5 ? "а" : "";
    if (usersCount) {
      return (
        <span className="badge bg-primary">
          {usersCount} человек{ending} тусанет с тобой сегодня
        </span>
      );
    } else {
      document.querySelector(".table").innerHTML = "";
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
    }
  };

  return (
    <>
      <h2>{renderPhrase(users)}</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <th scope="row">{user.name}</th>
                <td>{renderQualities(user)}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-primary bg-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
