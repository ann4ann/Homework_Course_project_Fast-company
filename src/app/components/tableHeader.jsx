import React from "react";
import PropTypes from "prop-types";
// устанавливаем bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const renderSortArrow = (selectedSort) => {
        if (selectedSort.order === "asc") {
            return <i className="bi bi-caret-down-fill"></i>;
        } else if (selectedSort.order === "desc") {
            return <i className="bi bi-caret-up-fill"></i>;
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        scope="col"
                    >
                        {columns[column].name}
                        {selectedSort.path &&
                        selectedSort.path === columns[column].path
                            ? renderSortArrow(selectedSort)
                            : ""}
                    </th>
                ))}
                {/* <th onClick={() => handleSort("name")} scope="col">
                    Имя
                </th>
                <th scope="col">Качества</th>
                <th onClick={() => handleSort("profession.name")} scope="col">
                    Профессия
                </th>
                <th onClick={() => handleSort("completedMeetings")} scope="col">
                    Встретился, раз
                </th>
                <th onClick={() => handleSort("rate")} scope="col">
                    Оценка
                </th>
                <th onClick={() => handleSort("bookmark")} scope="col">
                    Избранное
                </th>
                <th scope="col"></th>
                <th /> */}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
