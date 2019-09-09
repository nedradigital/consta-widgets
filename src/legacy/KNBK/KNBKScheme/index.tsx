import React from 'react'

import classnames from 'classnames'
import { isNil } from 'lodash'

import css from './index.css'

type Props = {
  className?: string
  values?: number[]
}

const Disk = () => (
  <svg width="51" height="10" viewBox="0 0 51 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="25.5" cy="4.72972" rx="25.5" ry="4.45946" fill="url(#paint0_linear)" />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="25.5"
        y1="0.270264"
        x2="25.5"
        y2="9.18918"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#215CC4" stopOpacity="0.11" />
        <stop offset="1" stopColor="#215CC4" stopOpacity="0.81" />
      </linearGradient>
    </defs>
  </svg>
)

const DiskWithGradient = () => (
  <svg width="51" height="33" viewBox="0 0 51 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M51 27.8374C51 30.3004 39.5841 32.2968 25.5 32.2968C11.4159 32.2968 0 30.3004 0 27.8374V4.45898C0 6.92198 11.4159 8.91844 25.5 8.91844C39.5841 8.91844 51 6.92198 51 4.45898V27.8374Z"
      fill="url(#paint0_linear_p)"
    />
    <ellipse cx="25.5" cy="4.45946" rx="25.5" ry="4.45946" fill="url(#paint1_linear_p)" />
    <defs>
      <linearGradient
        id="paint0_linear_p"
        x1="25.5"
        y1="3.39931"
        x2="25.5"
        y2="31.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#215CC4" stopOpacity="0.5" />
        <stop offset="1" stopColor="#215CC4" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_p"
        x1="25.5"
        y1="0"
        x2="25.5"
        y2="8.91892"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#215CC4" stopOpacity="0.11" />
        <stop offset="1" stopColor="#215CC4" stopOpacity="0.81" />
      </linearGradient>
    </defs>
  </svg>
)

export const KNBKScheme: React.FC<Props> = ({ className, values = [] }) => {
  if (!values.length) {
    return null
  }

  return (
    <div className={classnames(css.knbkScheme, className)}>
      {values.map((value, index) => {
        return (
          <div className={css.item} style={isNil(value) ? {} : { bottom: `${value}%` }} key={index}>
            <Disk />
            <DiskWithGradient />
          </div>
        )
      })}
    </div>
  )
}
