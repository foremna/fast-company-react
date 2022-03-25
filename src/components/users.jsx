import React, { useState } from "react"
import api from '../api/'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  console.log(users)

  function handleUsers (id) {
    setUsers((prevState) => prevState.filter((tag) => tag !== id))
  }

  function badgeColor (el) {
    return `badge mx-2 bg-${el}`
  }

  function renderPhrase () {
    return users.map((user) => (
      <tr key={user._id}>
        <th scope="row">{user.name}</th>
        <td>
          <>
          {user.qualities.map((quality) => (
            <span 
              key={quality._id} 
              className={badgeColor(quality.color)}
            >
              {quality.name}
            </span>
          ))}
          </>
        </td>
        <td>
          <span key={user.profession._id}>{user.profession.name}</span>
        </td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button 
            className="btn btn-danger" 
            onClick={()=>handleUsers(user)}>
              delete
          </button>
          </td>
      </tr>
    ))
  }

  function amountUserText () {
    let lengthUsers = users.length

    if (lengthUsers > 1 && lengthUsers < 5) {
      return 'человека тусанут с тобой сегодня'
    } else if (lengthUsers === 1 || lengthUsers >= 5) {
      return 'человек тусанет с тобой сегодня'
    } else if (lengthUsers === 0) {
      return 'Никто с тобой сегодня не тусанет :('
    }
  }

  function formatCount () {
    let classes = 'badge mx-2 '
    classes += users.length === 0 ? 'bg-danger' : 'bg-primary'
    return classes
  }

  function amountUser () {
    return users.length !== 0 ? <h1>
      <span className={formatCount()}>
        {users.length} {amountUserText()}
      </span>
    </h1> 
    :
    <h1>
      <span className={formatCount()}>
        {amountUserText()}
      </span>
    </h1>
  }
  
  return users.length !== 0 ?
  <>
    {amountUser()}
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{renderPhrase()}</tbody>
    </table>
  </> 
  :
  <>
  {amountUser()}
  </>
}

export default Users