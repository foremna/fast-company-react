import React, { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import Pagination from './components/pagination'
import api from './api'
import { paginate } from './utils/paginate'

function App () {
  const [users, setUsers] = useState(api.users.fetchAll())
  const [currentPage, setCurrentPage] = useState(1)

  function handleUsers (userId) {
    const newUsers = users.filter((tag) => tag._id !== userId)
    setUsers(newUsers)
  }

  const count = users.length
  const pageSize = 4

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const goToPrevPage = (pageIndex) => {
    setCurrentPage(pageIndex - 1)
  }

  const goToNextPage = (pageIndex) => {
    setCurrentPage(pageIndex + 1)
  }

  const userCrop = paginate(users, currentPage, pageSize)

  if (userCrop.length === 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1)
  }

  return count > 0
    ? (
      <>
        <SearchStatus length={count} />
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
            <Users users={users} deleteUser={handleUsers} userCrop={userCrop} />
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
        />
      </>
    )
    : (
      <>
        <SearchStatus length={count} />
      </>
    )
}

export default App
