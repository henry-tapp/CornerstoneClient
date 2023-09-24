import { useTimer } from "react-timer-hook";

interface TimerProps {
  expiryTimestamp: Date;
  textClass?: string;
  onExpire?: () => void;
}

export function onPause() {}

export function CountdownTimer({
  expiryTimestamp,
  textClass,
  onExpire,
}: TimerProps) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: onExpire,
  });

  return (
    <div className={textClass}>
      <span>{format(hours)}</span>:<span>{format(minutes)}</span>:
      <span>{format(seconds)}</span>
    </div>
  );
}

function format(integer: number) {
  if (integer === 0) {
    return "00";
  }

  if (integer < 10) {
    return `0${integer}`;
  }

  return integer;
}
