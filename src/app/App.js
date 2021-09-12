import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api/index";

function App() {
    // const initialState = api.users.fetchAll().map((initUser) => {
    //     return { ...initUser, status: false };
    // });
    const [users, setUsers] = useState();
    // console.log(users);

    useEffect(() => {
        // console.log("one");
        api.users.fetchAll().then((data) => {
            console.log(data);
            setUsers(data.map((item) => ({ ...item, status: false })));
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
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </div>
    );
}

export default App;
