import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'
import { Menu } from 'react-feather'

interface Props {
  handleMainSidebar: () => void
}

const SearchBar: React.FC<Props> = (props) => {
  const { handleMainSidebar } = props

  return (
    <div className="app-fixed-search d-flex align-items-center">
      <div
        className="sidebar-toggle cursor-pointer d-block d-lg-none ml-1"
        onClick={handleMainSidebar}
      >
        <Menu size={21} />
      </div>
      <div className="d-flex align-content-center justify-content-between w-100">
        <InputGroup className="input-group-merge">
          <InputGroupAddon addonType="prepend">
            <InputGroupText></InputGroupText>
          </InputGroupAddon>
          <Input disabled />
        </InputGroup>
      </div>
    </div>
  )
}

export default SearchBar
