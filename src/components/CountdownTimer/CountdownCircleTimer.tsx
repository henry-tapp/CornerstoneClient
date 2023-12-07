import { Props } from './useCountdown/types'
import { useCountdown } from './useCountdown/useCountdown'
import { getWrapperStyle, timeStyle } from './useCountdown/utils'

const CountdownCircleTimer = (props: Props) => {
  const { children, strokeLinecap, trailColor, trailStrokeWidth } = props
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown(props)

  return (
    <div style={getWrapperStyle(size)}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path}
          fill="none"
          stroke={trailColor ?? '#d9d9d9'}
          strokeWidth={trailStrokeWidth ?? strokeWidth}
        />
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeLinecap={strokeLinecap ?? 'round'}
          strokeWidth={strokeWidth}
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {typeof children === 'function' && (
        <div style={timeStyle}>
          {children({ remainingTime, elapsedTime, color: stroke })}
        </div>
      )}
    </div>
  )
}

CountdownCircleTimer.displayName = 'CountdownCircleTimer'

export { CountdownCircleTimer, useCountdown }

