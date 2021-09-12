import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./paginations";
import { paginate } from "../utils/paginate";
import User from "./user";
import api from "../api/index";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import _ from "lodash";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    // const [professions, setProfession] = useState(api.professions.fetchAll());
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const pageSize = 2;

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
        console.log(selectedProf);
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

    // можно реализовать разбиение на страницы здесь,
    // но луше в отдельном файле utils > paginate.js

    // cначала professions = undefined, поэтому используем в return
    // {professions && (<GroupList ... />)}
    // const paginateFilteredUsers = () => {};

    const getUsersByProfession = () => {
        return allUsers.filter((user) =>
            _.isEqual(user.profession, selectedProf)
        );
    };

    const filteredUsers =
        selectedProf && allUsers ? getUsersByProfession() : allUsers;
    // count объявляем после filteredUsers, и вместо длины allUsers считаем filteredUsers
    const count = allUsers ? filteredUsers.length : 0;

    const users = paginate(filteredUsers, currentPage, pageSize);

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

            {allUsers && (
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Имя</th>
                                    <th scope="col">Качества</th>
                                    <th scope="col">Профессия</th>
                                    <th scope="col">Встретился, раз</th>
                                    <th scope="col">Оценка</th>
                                    <th scope="col">Избранное</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <User key={user._id} {...user} {...rest} />
                                ))}
                            </tbody>
                        </table>
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
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
