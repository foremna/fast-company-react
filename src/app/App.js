import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./components/api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  function handleUsers(userId) {
    const newUsers = users.filter((tag) => tag._id !== userId);
    setUsers(newUsers);
  }

  return users.length !== 0 ? (
    <>
      <SearchStatus length={users.length} />
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
          <Users users={users} deleteUser={handleUsers} />
        </tbody>
      </table>
    </>
  ) : (
    <>
      <SearchStatus length={users.length} />
    </>
  );
}

export default App;
