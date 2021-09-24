import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import api from "../api/index";
import { paginate } from "../utils/paginate";
import Pagination from "./paginations";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    // const [professions, setProfession] = useState(api.professions.fetchAll());
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;

    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    const handleDelete = (userId) => {
        const newUsers = users.filter((user) => {
            return user._id !== userId;
        });
        setUsers(newUsers);
    };

    const handleToggleBookMark = (userId) => {
        const newUsers = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newUsers);
    };

    useEffect(() => {
        // console.log("send request");
        api.professions.fetchAll().then((data) =>
            // setProfession(
            //     Object.assign(data, {
            //         allProfession: { name: "Все профессии" }
            //     })
            // )
            setProfession(data)
        );
    }, []);

    // чтобы не пропадали люди при фильтре с пустой страницы
    useEffect(() => {
        setCurrentPage(1);
        // console.log(selectedProf);
    }, [selectedProf]);

    // // отображаем изменения элемента professions:
    // useEffect(() => {
    //     setCurrentPage(1);
    //     console.log(professions);
    // }, [professions]);

    // // useEffect вызывается каждый раз, когда мы монтируем что-то в DOM
    // // 1. можно его вызывать единожды при монтировании (плюс при изменнии состояния компонента в [])
    // // 2. или каждый раз при изменении компонента
    // // 3. или каждый раз, когда изменяется какое-то конкретное состояние

    // // ниже - вариант 2
    // useEffect(() => {
    //     console.log("render");
    // });

    // // ниже - вариант 1
    // // пустой массив - для того, чтобы передавать useEffect-у какой-то параметр,
    // // за которым необходимо наблюдать, если он пуст - только при первой загрузке компонента
    // useEffect(() => {
    //     console.log("render once");
    // }, []);

    // // Наблюдаем за изменением currentPage
    // useEffect(() => {
    //     console.log("change current page");
    // }, [currentPage]);

    // // сработает при удалении компонента (добавляем return):
    // useEffect(() => {
    //     console.log("change current page");
    //     return () => {
    //         console.log("unmount");
    //     };
    // }, []);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        // console.log(item);
    };
    // console.log(professions);

    const handlePageChange = (pageIndex) => {
        // console.log("page: ", pageIndex);
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        // следующее переносим в usersTable:
        // if (sortBy.iter === item) {
        //     setSortBy((prevState) => ({
        //         ...prevState,
        //         order: prevState.order === "asc" ? "desc" : "asc"
        //     }));
        // } else {
        //     setSortBy({ iter: item, order: "asc" });
        // }
        // и вместо этого (т.к. передаем уже целый объект) пишем:
        setSortBy(item);

        // setSortBy({ iter: item, order: "asc" });
        // console.log(item);
    };

    // можно реализовать разбиение на страницы здесь,
    // но луше в отдельном файле utils > paginate.js

    // cначала professions = undefined, поэтому используем в return
    // {professions && (<GroupList ... />)}
    // const paginateFilteredUsers = () => {};

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => _.isEqual(user.profession, selectedProf))
            : users;
        // count объявляем после filteredUsers, и вместо длины users считаем filteredUsers
        const count = filteredUsers.length;
        // orderBy - 1 парам - массив, 2 = по какому параметру, 3 - порядок (asc/desc)
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            // указываем, если в GroupList нет defaultProperty
                            // valueProperty="_id"
                            // contentProperty="name"
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}

                {users && (
                    <div className="d-flex flex-column">
                        <SearchStatus length={count} />
                        {count > 0 && (
                            <UserTable
                                users={usersCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookMark={handleToggleBookMark}
                            />
                        )}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
    return "Loading...";
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
