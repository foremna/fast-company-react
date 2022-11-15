import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  goToPrevPage,
  goToNextPage
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize)
  if (pageCount === 1) return null
  const pages = _.range(1, pageCount + 1)

  return (
    <nav>
      <ul className="pagination">
        <li className={'page-item' + (currentPage === 1 ? ' disabled' : '')}>
          <a className="page-link" onClick={() => goToPrevPage(currentPage)}>
            Previous
          </a>
        </li>
        {pages.map((page) => (
          <li
            className={'page-item' + (page === currentPage ? ' active' : '')}
            key={`page_${page}`}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            'page-item' + (currentPage === pageCount ? ' disabled' : '')
          }
        >
          <a className="page-link" onClick={() => goToNextPage(currentPage)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  goToPrevPage: PropTypes.func.isRequired,
  goToNextPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination
