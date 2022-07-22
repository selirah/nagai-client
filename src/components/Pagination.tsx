import React, { MouseEvent } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

interface Props {
  pageCount: number
  currentPage: number
  handlePageClick: (e: MouseEvent<HTMLElement>, i: number) => void
}

const PaginationComponent: React.FC<Props> = (props) => {
  const renderPageItems = () => {
    return [...Array(pageCount)].map((page, i) => (
      <PaginationItem active={i === currentPage} key={i}>
        <PaginationLink onClick={(e) => handlePageClick(e, i)} href="#">
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ))
  }

  const { currentPage, handlePageClick, pageCount } = props
  return (
    <Pagination className="d-flex justify-content-end mr-2 mt-3">
      <PaginationItem className="prev-item" disabled={currentPage <= 0}>
        <PaginationLink
          onClick={(e) => handlePageClick(e, currentPage - 1)}
          previous
          href="#"
        />
      </PaginationItem>
      {renderPageItems()}
      <PaginationItem
        className="next-item"
        disabled={currentPage >= pageCount - 1}
      >
        <PaginationLink
          onClick={(e) => handlePageClick(e, currentPage + 1)}
          next
          href="#"
        />
      </PaginationItem>
    </Pagination>
  )
}

export default PaginationComponent
