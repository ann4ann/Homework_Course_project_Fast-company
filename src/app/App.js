import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
    const initialState = api.users.fetchAll().map((initUser) => {
        return { ...initUser, status: false };
    });
    const [users, setUsers] = useState(initialState);
    // console.log(users);

    const handleDelete = (userId) => {
        const newUsers = users.filter((user) => {
            return user._id !== userId;
        });
        setUsers(newUsers);
    };

    const handleToggleBookMark = (userId) => {
        const newUsers = users.map((user) => {
            if (user._id === userId) {
                if (user.status) {
                    user.status = false;
                } else {
                    user.status = true;
                }
            }
            return user;
        });
        setUsers(newUsers);
    };

    return (
        <div>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </div>
    );
}

export default App;
