import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./quality";
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
  onToggleBookMark
}) => {
  const allQualities = qualities.map((qualitie) => {
    return Qualitie(qualitie);
  });
  // console.log(onToggleBookMark);

  return (
    <tr key={_id}>
      <th scope="row">{name}</th>
      <td>{allQualities}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark status={status} onClick={() => onToggleBookMark(_id)} />
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

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  qualities: PropTypes.array.isRequired
};

export default User;
