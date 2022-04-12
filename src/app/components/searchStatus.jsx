import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
  function formatCount () {
    let classes = 'badge mx-2 '
    classes += length === 0 ? 'bg-danger' : 'bg-primary'
    return classes
  }

  function amountUserText () {
    const lengthUsers = length

    if (lengthUsers > 1 && lengthUsers < 5) {
      return 'человека тусанут с тобой сегодня'
    } else if (lengthUsers === 1 || lengthUsers >= 5) {
      return 'человек тусанет с тобой сегодня'
    } else if (lengthUsers === 0) {
      return 'Никто с тобой сегодня не тусанет :('
    }
  }

  return length !== 0
    ? (
      <h1>
        <span className={formatCount()}>
          {length} {amountUserText()}
        </span>
      </h1>
    )
    : (
      <h1>
        <span className={formatCount()}>{amountUserText()}</span>
      </h1>
    )
}

SearchStatus.propTypes = {
  length: PropTypes.number
}

export default SearchStatus
