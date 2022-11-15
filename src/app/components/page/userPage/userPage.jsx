import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import CommentsList from '../../ui/commentsList'

const UserPage = ({ api, userId }) => {
  const [usersId, setUsersId] = useState(false)

  useEffect(() => {
    api.users.getById(userId).then((usersId) => setUsersId(usersId))
  }, [usersId])

  return usersId ? (
    <>
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard data={usersId} />
          <QualitiesCard data={usersId.qualities} />
          <MeetingsCard />
        </div>
        <div className="col-md-8">
          <CommentsList />
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
