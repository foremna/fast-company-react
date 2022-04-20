import React from 'react'
import PropTypes from 'prop-types'

const Qualities = ({ qualities }) => {
  const badgeColor = (el) => {
    return `badge mx-2 bg-${el}`
  }

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
  qualities: PropTypes.array
}

export default Qualities
