import classnames from 'classnames'

import css from './index.css'

type Props = {
  height: number
  isVisible?: boolean
  onResize: (delta: number) => void
  onDoubleClick: () => void
}

/* Сделано классом, чтобы хэндлеры событий на document могли иметь доступ к актуальному стэйту/пропсам без пересоздания подписок */
export class Resizer extends React.Component<Props, { isDragging: boolean }> {
  state = {
    isDragging: false,
  }

  render() {
    return (
      <div
        className={classnames(
          css.main,
          this.state.isDragging && css.isDragging,
          this.props.isVisible && css.isVisible
        )}
        style={{ height: this.props.height }}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.props.onDoubleClick}
      />
    )
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  onMouseDown = () => {
    this.setState({ isDragging: true })

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseMove = (e: MouseEvent) => {
    if (e.movementX) {
      this.props.onResize(e.movementX)
    }
  }

  onMouseUp = () => {
    this.setState({ isDragging: false })

    this.removeListeners()
  }

  removeListeners = () => {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }
}
