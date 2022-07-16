import React, { useEffect, useState } from "react";
import api from "../../api";
import Comment from "../common/comment";
import PropTypes from "prop-types";
import AddComment from "./addComment";

const CommentsList = ({ userId }) => {
  const [comments, setComments] = useState();
  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(data);
      // console.log(comments, data);
    });
  }, []);

  // useEffect(() => {
  //   setComments(JSON.parse(localStorage.getItem("comments")));
  // }, [comments]);

  const handleDeleteComment = (id) => {
    api.comments.remove(id);
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(data);
      // console.log(comments, data);
    });
  };

  const handleAddComment = (commentData) => {
    api.comments.add(commentData);
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(data);
      // console.log(comments, data);
    });
  };

  return (
    <>
      {/* add comment */}
      <AddComment pageId={userId} addCommentFunc={handleAddComment} />

      {/* comments */}
      {comments && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                commentData={comment}
                onClick={handleDeleteComment}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

CommentsList.propTypes = {
  userId: PropTypes.string.isRequired
};

export default CommentsList;
