import React, { useCallback } from 'react'
import moment from 'moment'
import { DBUser } from '@classes/index'
import { Card, CardHeader, CardBody, Badge } from 'reactstrap'
import { getInitials } from '@utils/index'
import { userRoles } from '@utils/ability'

interface Props {
  user: DBUser | null
}

const Details: React.FC<Props> = (props) => {
  const { user } = props

  const renderAvatar = (user: DBUser) => {
    if (user && user.avatar) {
      return (
        <img
          className="img-fluid w-100 h-100"
          src={user.avatar}
          style={{ objectFit: 'cover', borderRadius: '100%' }}
          alt="Card"
        />
      )
    } else {
      return (
        <div
          style={{ borderRadius: '100%' }}
          className={`d-flex w-100 h-100 font-size-xl justify-content-center align-items-center avatar-variant-lg bg-light-info`}
        >
          {getInitials(
            user.firstName
              ? `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`
              : user.email
          )}
        </div>
      )
    }
  }

  const renderBadge = useCallback((role: string) => {
    switch (role) {
      case userRoles.admin:
        return (
          <Badge className="text-uppercase" color="primary" pill>
            {role}
          </Badge>
        )
      case userRoles.agent:
        return (
          <Badge className="text-uppercase" color="secondary" pill>
            {role}
          </Badge>
        )
      case userRoles.dispatch:
        return (
          <Badge className="text-uppercase" color="info" pill>
            {role.toUpperCase()}
          </Badge>
        )
    }
  }, [])

  const renderVerified = useCallback((verified: boolean) => {
    switch (verified) {
      case true:
        return (
          <Badge className="text-uppercase" color="success" pill>
            Verified
          </Badge>
        )
      case false:
        return (
          <Badge className="text-uppercase" color="danger" pill>
            Not Verified
          </Badge>
        )
    }
  }, [])

  return (
    <Card className="card-profile border">
      <CardHeader>
        <hr className="mb-2" />
      </CardHeader>
      <CardBody>
        <div className="profile-image-wrapper mb-3">
          <div
            className="profile-image"
            style={{ width: '150px', height: '150px', overflow: 'hidden' }}
          >
            {user ? renderAvatar(user) : ''}
          </div>
        </div>
        <Badge className="text-uppercase mr-1" color="primary" pill>
          {user
            ? user.firstName
              ? `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`
              : user.email
            : null}
        </Badge>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">First Name</h6>
            <h6 className="mb-0">
              {user
                ? user.firstName
                  ? user.firstName.toUpperCase()
                  : null
                : null}
            </h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Last Name
            </h6>
            <h6 className="mb-0 text-right">
              {user
                ? user.lastName
                  ? user.lastName.toUpperCase()
                  : null
                : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Phone</h6>
            <h6 className="mb-0">{user ? user.phone : null}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">Email</h6>
            <h6 className="mb-0 text-right">{user ? user.email : null}</h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Role</h6>
            <h6 className="mb-0">{user ? renderBadge(user.role) : null}</h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Verified
            </h6>
            <h6 className="mb-0 text-right">
              {user ? renderVerified(user.isVerified) : null}
            </h6>
          </div>
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between align-items-center text-left">
          <div>
            <h6 className="text-muted font-weight-bolder">Date added</h6>
            <h6 className="mb-0">
              {user ? moment(user.createdAt).format('MMM Do, YYYY') : null}
            </h6>
          </div>
          <div>
            <h6 className="text-muted font-weight-bolder text-right">
              Date modified
            </h6>
            <h6 className="mb-0 text-right">
              {user ? moment(user.updatedAt).format('MMM Do, YYYY') : null}
            </h6>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Details
