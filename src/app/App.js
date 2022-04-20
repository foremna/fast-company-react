import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import Pagination from './components/pagination'
import GroupList from './components/groupList'
import api from './api'
import { paginate } from './utils/paginate'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())
  const [professions, setProfession] = useState(api.professions.fetchAll())
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()

  useEffect(() => {
    api.users.fetchAll().then((usersData) => setUsers(usersData))
  }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  const handleUsers = (userId) => {
    const newUsers = users.filter((tag) => tag._id !== userId)
    setUsers(newUsers)
  }

  const handleProfessionalsSelect = item => {
    setSelectedProf(item)
  }

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

  const clearFiltered = () => {
    setSelectedProf()
  }

  const filteredUsers = selectedProf ? users.filter(user => _.isEqual(user.profession, selectedProf)) : users
  const count = filteredUsers.length
  const userCrop = paginate(filteredUsers, currentPage, pageSize)

  console.log('selectedProf ', selectedProf)

  if (userCrop.length === 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1)
  }

  return count > 0
    ? (
      <>
        <SearchStatus length={count} />
        <div className="d-flex">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                items={professions}
                selectedItem={selectedProf}
                onItemSelect={handleProfessionalsSelect}
              />
              <button className='btn btn-secondary m-2' onClick={clearFiltered}>Clear</button>
            </div>
          )}
          <div className="d-flex flex-column">
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
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
              />
            </div>
          </div>
        </div>
      </>
    )
    : (
      <>
        <SearchStatus length={count} />
      </>
    )
}

export default App
