import React, { Fragment, useState } from 'react'
import { Manufacturer } from 'classes'
import { Selector, Dispatch } from 'redux/selector-dispatch'

const View = () => {
  const store = Selector((state) => state.manufacturers)
  return (
    <Fragment>
      <div id="user-profile" className="mt-2">
        <section id="profile-info"></section>
      </div>
    </Fragment>
  )
}

export default View
