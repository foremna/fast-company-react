import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { badgeColor } from '../../../utils/badgeColor'

const UserPage = ({ api, userId }) => {
  const [usersId, setUsersId] = useState(false)

  useEffect(() => {
    api.users.getById(userId).then((usersId) => setUsersId(usersId))
  }, [usersId])

  return usersId ? (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-header">Карточка пользователя</div>
            <div className="card-body">
              <h5 className="card-title">{usersId.name}</h5>
              <p>
                {usersId.profession.name
                  ? usersId.profession.name
                  : usersId.profession}
              </p>
              {usersId.qualities.map((quality) => (
                <span
                  key={quality._id}
                  className={badgeColor(quality.color) + ' mb-2'}
                >
                  {quality.name}
                </span>
              ))}
              <p>Количество встреч: {usersId.completedMeetings}</p>
              <p>{usersId.rate}</p>
              <Link
                to={`/users/${usersId._id}/edit`}
                className="btn btn-primary"
              >
                Change
              </Link>
            </div>
            <div className="card-footer text-muted">
              <Link to="/users">назад</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h3>Loading..</h3>
  )
}

UserPage.propTypes = {
  api: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

export default UserPage
