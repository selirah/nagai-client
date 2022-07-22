import React from 'react'

interface RepeaterProps {
  count: number
  tag: any
  children?: any
}

const Repeater: React.FC<RepeaterProps> = (props) => {
  const { count, tag, children, ...rest } = props

  // custom tag
  const Tag = tag

  // default items
  const items = []

  // loop passed count times and push it to items array
  for (let i = 0; i < count; i++) {
    items.push(children(i))
  }

  return <Tag {...rest}>{items}</Tag>
}

Repeater.defaultProps = {
  tag: 'div'
}

export default Repeater
