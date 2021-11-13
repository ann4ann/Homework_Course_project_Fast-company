import React from "react";
import PropTypes from "prop-types";

const UserImage = ({ width, height }) => {
  return (
    <img
      src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .substring(7)}.svg`}
      className="rounded-circle shadow-1-strong me-3"
      alt="avatar"
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

UserImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default UserImage;
