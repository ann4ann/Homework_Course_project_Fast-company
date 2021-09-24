import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, onClick }) => {
    const renderBookMark = () => {
        if (!status) {
            return (
                <button onClick={onClick}>
                    <i className="bi bi-bookmark"></i>
                </button>
            );
        } else {
            return (
                <button onClick={onClick}>
                    <i className="bi bi-bookmark-heart-fill"></i>
                </button>
            );
        }
    };

    return renderBookMark();
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
