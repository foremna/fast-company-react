import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({ width, height, classes }) => {
  return (
    <img
      src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .substring(7)}.svg`}
      className={classes}
      width={width}
      height={height}
    />
  )
}

const MemoizedAvatar = React.memo(Avatar)

Avatar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  classes: PropTypes.string
}

export default MemoizedAvatar
