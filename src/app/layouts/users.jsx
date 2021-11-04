import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUser from "../components/ui/EditUser";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  const { edit } = params;

  return (
    <>
      {edit && userId ? (
        <EditUser id={userId} />
      ) : userId ? (
        <UserPage id={userId} />
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
