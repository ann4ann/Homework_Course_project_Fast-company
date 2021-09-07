import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const usersAmount = length;
    const renderPhrase = () => {
        const ending = usersAmount > 1 && usersAmount < 5 ? "а" : "";
        if (usersAmount) {
            return (
                <span className="badge bg-primary">
                    {usersAmount} человек{ending} тусанет с тобой сегодня
                </span>
            );
        } else {
            return (
                <span className="badge bg-danger">
                    Никто с тобой не тусанет
                </span>
            );
        }
    };

    return <div>{renderPhrase()}</div>;
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
