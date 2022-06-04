import React from 'react'
import PropTypes from 'prop-types'

import TableBody from './tableBody'
import TableHeader from './tableHeader'

const Table = ({
  onSort,
  selectedSort,
  columns,
  data,
  handleUsers,
  children
}) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort }} columns={columns} />
          <TableBody {...{ columns, data, handleUsers }} />
        </>
      )}
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  handleUsers: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  children: PropTypes.array
}

export default Table
