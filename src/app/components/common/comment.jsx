import React from "react";
import PropTypes from "prop-types";
import UserImage from "./form/userImage";

const Comment = ({ commentData, onClick }) => {
  const getUserName = (userId) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user._id === userId);
    return user.name;
  };

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <UserImage width={65} height={65} />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {getUserName(commentData.userId)}
                    <span className="small ms-3">{commentData.created_at}</span>
                  </p>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={() => onClick(commentData._id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{commentData.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  commentData: PropTypes.object,
  onClick: PropTypes.func
};

export default Comment;
