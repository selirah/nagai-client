import React from 'react'
import classnames from 'classnames'
import Chart from 'react-apexcharts'
import { Card, CardBody } from 'reactstrap'

interface StatisticsCardsProps {
  statTitle: string
  className?: any
  hideChart?: boolean
  iconRight?: boolean
  iconBg?: string
  icon: React.ReactNode
  stat: string
  options?: object
  series?: any[]
  type?:
    | 'line'
    | 'area'
    | 'bar'
    | 'histogram'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'treemap'
    | 'boxPlot'
    | 'candlestick'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
  height?: string
}

const StatisticsCards: React.FC<StatisticsCardsProps> = (props) => {
  const {
    className,
    hideChart,
    iconRight,
    iconBg,
    icon,
    stat,
    statTitle,
    options,
    series,
    type,
    height
  } = props

  return (
    <Card>
      <CardBody
        className={classnames('stats-card-body d-flex pt-2', {
          [className]: className,
          'flex-column align-items-start': !iconRight && !hideChart,
          'justify-content-between flex-row-reverse align-items-center':
            iconRight,
          'justify-content-center flex-column text-center':
            hideChart && !iconRight,
          'pb-0': !hideChart,
          'pb-2': hideChart
        })}
      >
        <div className="icon-section">
          <div
            className={`avatar avatar-stats p-50 m-0 ${
              iconBg ? `bg-light-${iconBg}` : 'bg-light-primary'
            }`}
          >
            <div className="avatar-content">{icon}</div>
          </div>
        </div>
        <div className="title-section">
          <h2 className="font-weight-bold mt-1 mb-25">{stat}</h2>
          <p className="mb-0">{statTitle}</p>
        </div>
      </CardBody>
      {!hideChart && (
        <Chart
          options={options}
          series={series}
          type={type}
          height={height ? height : 100}
        />
      )}
    </Card>
  )
}

export default StatisticsCards
