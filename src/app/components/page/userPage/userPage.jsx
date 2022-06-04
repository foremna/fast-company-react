import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { badgeColor } from '../../../utils/badgeColor'

const UserPage = ({ api, userId }) => {
  const [usersId, setUsersId] = useState(false)

  useEffect(() => {
    api.users.getById(userId).then((usersId) => setUsersId(usersId))
  }, [usersId])

  return usersId
    ? (
      <>
        <h1>{usersId.name}</h1>
        <p>{usersId.profession.name}</p>
        {usersId.qualities.map((quality) => (
          <span key={quality._id} className={badgeColor(quality.color)}>
            {quality.name}
          </span>
        ))}
        <p>Количество встреч: {usersId.completedMeetings}</p>
        <span>{usersId.rate}</span>
      </>
    )
    : (
      <h3>Loading..</h3>
    )
}

UserPage.propTypes = {
  api: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

export default UserPage
