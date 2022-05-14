import React from 'react'
import PropTypes from 'prop-types'

import TableBody from './tableBody'
import TableHeader from './tableHeader'

const Table = ({ onSort, selectedSort, columns, data, handleUsers }) => {
  return (
    <table className="table">
      <TableHeader {...{ onSort, selectedSort }} columns={columns} />
      <TableBody {...{ columns, data, handleUsers }} />
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  handleUsers: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default Table
