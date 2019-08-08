import React from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  className?: string
  children: React.ReactNode
}

type CellProps = {
  isOneLine?: boolean
} & Props

export const Row: React.FC<Props> = ({ children }) => <div className={css.row}>{children}</div>

export const Cell: React.FC<CellProps> = ({ children, isOneLine }) => (
  <div className={classnames(css.cell, isOneLine && css.oneLine)}>{children}</div>
)

export const Table: React.FC<Props> = ({ className, children }) => (
  <div className={classnames(css.table, className)}>{children}</div>
)
