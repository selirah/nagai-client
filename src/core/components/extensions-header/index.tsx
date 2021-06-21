import React from 'react'
import { Row, Col } from 'reactstrap'

interface ExtensionsHeaderProps {
  title: string
  subTitle: string
  link?: string
}

const ExtensionsHeader: React.FC<ExtensionsHeaderProps> = (props) => {
  return (
    <Row className="mb-2">
      <Col sm="12" className="ml-50">
        <p
          className="font-medium-5 mt-1 extension-title"
          data-tour="extension-title"
        >
          {props.title}
        </p>
        {props.link ? (
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            {props.subTitle}
          </a>
        ) : (
          <p className="text-primary">{props.subTitle}</p>
        )}
      </Col>
    </Row>
  )
}

export default ExtensionsHeader
