import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  status,
  onDelete,
  onToggleBookMark,
}) => {
  const allQualities = qualities.map((qualitie) => {
    return Qualitie(qualitie);
  });
  //   console.log(onToggleBookMark)

  return (
    <tr key={_id}>
      <th scope="row">{name}</th>
      <td>{allQualities}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <button onClick={() => onToggleBookMark(_id)}>
          <BookMark status={status} />
        </button>
      </td>
      <td>
        <button
          onClick={() => onDelete(_id)}
          className="btn btn-primary bg-danger"
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
