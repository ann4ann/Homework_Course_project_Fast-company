import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";

const UserTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark,
  onDelete,
  ...rest
}) => {
  // Переносим handleSort и tableHeader в tableHeader.jsx
  const columns = {
    name: {
      name: "Имя",
      component: (user) => <Link to={`users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился, раз"
    },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <BookMark
          status={user.bookmark}
          onClick={() => onToggleBookMark(user._id)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          onClick={() => onDelete(user._id)}
          className="btn btn-primary bg-danger"
        >
          delete
        </button>
      )
    }
  };
  // console.log(columns);

  return (
    // <Table>
    //     <TableHeader {...{ onSort, selectedSort, columns }} />
    //     <TableBody {...{ columns, data: users }} />
    // </Table>
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserTable;
