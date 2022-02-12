export function msToTime(ms: number) {
  const milliseconds = (ms % 1000) * 0.1;
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (60 * 1000)) % 60);

  return {
    milliseconds,
    seconds,
    minutes,
  };
}
