import React from 'react'
import PropTypes from 'prop-types'

const UserCard = ({ data }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
          <i className="bi bi-gear"></i>
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src="" className="rounded-circle" width="150" />
          <div className="mt-3">
            <h4>UserName</h4>
            <p className="text-secondary mb-1">Profession</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  data: PropTypes.array.isRequired
}

export default UserCard
