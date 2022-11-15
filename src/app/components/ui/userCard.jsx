import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import MemoizedAvatar from './avatar'

const UserCard = ({ data }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link
          to={`/users/${data._id}/edit`}
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
        >
          <i className="bi bi-gear"></i>
        </Link>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <MemoizedAvatar width="150" classes="rounded-circle" />
          <div className="mt-3">
            <h4>{data.name} </h4>
            <p className="text-secondary mb-1">{data.profession.name} </p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{data.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  data: PropTypes.object.isRequired
}

export default UserCard
