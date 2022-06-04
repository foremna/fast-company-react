import React from 'react'
import PropTypes from 'prop-types'
import { badgeColor } from '../../../utils/badgeColor'

const Qualities = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <span key={quality._id} className={badgeColor(quality.color)}>
          {quality.name}
        </span>
      ))}
    </>
  )
}

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
}

export default Qualities
