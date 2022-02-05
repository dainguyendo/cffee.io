import Link from "next/link";
import React from "react";
import { Button, ButtonLink, Flex, Grid, Text } from "ui";
import { Caption } from "./Caption";
import { useCycle } from "./useCycle";

type TimerState = "idle" | "active";

const INTERVAL = 10;

export const Stopwatch = () => {
  const [time, setTime] = React.useState(0);
  const [state, nextState] = useCycle<TimerState>("idle", "active");
  const [laps, setLaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    let interval: any;

    if (state === "active") {
      interval = setInterval(() => {
        setTime((prev) => prev + INTERVAL);
      }, INTERVAL);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  });

  const isActive = state === "active";
  const hasTime = time > 0;

  return (
    <>
      <Flex direction="column" css={{ alignItems: "center" }}>
        <Text css={{ fontSize: "$7", fontWeight: "$bold" }}>
          {millisecondsToTime(time)}
        </Text>

        {laps && laps.length
          ? laps.map((l, i) => {
              const display = millisecondsToTime(l);
              return (
                <Grid
                  key={i}
                  css={{
                    gap: "$2",
                    gridTemplateColumns: "repeat(3, minmax(50px, 1fr))",
                  }}
                >
                  <Caption>#{i}</Caption>
                  <Caption>{display}</Caption>
                  <Caption>
                    {i === 0 ? display : millisecondsToTime(l - laps[i - 1])}
                  </Caption>
                </Grid>
              );
            })
          : null}
        <Grid
          css={{
            gap: "$2",
            gridTemplateColumns: "repeat(3, minmax(50px, 1fr))",
          }}
        >
          <div>
            {hasTime && (
              <Button
                variant="outline"
                onClick={() => {
                  setTime(0);
                  nextState(0);
                  setLaps([]);
                }}
              >
                Reset
              </Button>
            )}
          </div>
          <div>
            <Button onClick={() => nextState()}>
              {isActive ? "Pause" : "Start"}
            </Button>
          </div>
          <div>
            {isActive && (
              <Button onClick={() => setLaps((prev) => [...prev, time])}>
                Lap
              </Button>
            )}
            {!isActive && hasTime && (
              <Link
                href={{
                  pathname: "/brew",
                  query: {
                    time,
                    laps,
                  },
                }}
              >
                <a>Create brew entry</a>
              </Link>
            )}
          </div>
        </Grid>
      </Flex>
    </>
  );
};

function millisecondsToTime(milli: number) {
  const milliseconds = milli % 1000;
  const seconds = Math.floor((milli / 1000) % 60);
  const minutes = Math.floor((milli / (60 * 1000)) % 60);

  return minutes + ":" + seconds + "." + milliseconds;
}
