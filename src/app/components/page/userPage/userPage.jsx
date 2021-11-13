import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualitie from "../../ui/qualities/quality";
import { useHistory } from "react-router-dom";
import CommentsList from "../../common/commentsList";
import UserImage from "../../common/form/userImage";

const UserPage = ({ id }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(id).then((data) => {
      setUser(data);
    });
  }, []);

  const handleChangeUser = () => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    history.push(history.location.pathname + "/edit");
  };

  return (
    <>
      <h2>{!user ? "loading..." : ""}</h2>
      {user && (
        <>
          <div className="container">
            <div className="row gutters-sm">
              {/* левая userPage */}
              <div className="col-md-4 mb-3">
                {/* user card */}
                <div className="card mb-3">
                  <div className="card-body">
                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                      <i className="bi bi-gear"></i>
                    </button>
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                      <UserImage width={150} height={150} />
                      <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                          {user.profession.name}
                        </p>
                        <div className="text-muted">
                          <i
                            className="bi bi-caret-down-fill text-primary"
                            role="button"
                          ></i>
                          <i
                            className="bi bi-caret-up text-secondary"
                            role="button"
                          ></i>
                          <span className="ms-2">{user.rate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* qualities card */}
                <div className="card mb-3">
                  <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                      <span>Qualities</span>
                    </h5>
                    <p className="card-text">
                      {user.qualities.map((qual) => (
                        <Qualitie key={qual._id} {...qual} />
                      ))}
                    </p>
                  </div>
                </div>
                {/* meetengs card */}
                <div className="card mb-3">
                  <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                      <span>Completed meetings</span>
                    </h5>
                    <h1 className="display-1">{user.completedMeetings}</h1>
                  </div>
                </div>
              </div>

              {/* правая Comments */}
              <div className="col-md-8">
                <CommentsList userId={user._id} />
              </div>
            </div>
          </div>

          <button
            className="btn btn-outline-primary"
            onClick={() => {
              handleChangeUser();
            }}
          >
            Изменить
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
