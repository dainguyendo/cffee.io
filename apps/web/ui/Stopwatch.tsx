import Link from "next/link";
import React from "react";
import {
  Anchor,
  Box,
  Button,
  Grid,
  ScrollArea,
  ScrollAreaCorner,
  ScrollAreaScrollBar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  Text,
} from "ui";
import { msToTime } from "../utils/time";
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
  const { milliseconds, seconds, minutes } = msToTime(time);

  return (
    <Grid
      css={{
        height: "auto",
        gridTemplateRows: "1fr 1fr auto",
        "@bp1": {
          height: "100%",
        },
      }}
    >
      <Grid
        css={{
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          placeSelf: "center",
          flexGrow: 1,
          alignItems: "baseline",
        }}
      >
        <Text bold css={{ fontSize: "$7", "&::after": { content: ":" } }}>
          {minutes}
        </Text>
        <Text bold css={{ fontSize: "$7" }}>
          {seconds}
        </Text>
        <Text bold css={{ fontSize: "$5", color: "$gray400" }}>
          {milliseconds}
        </Text>
      </Grid>

      <Box css={{ justifySelf: "center", p: "$5" }}>
        <ScrollArea css={{ overflow: "hidden", height: 225 }}>
          <ScrollAreaViewport>
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
                        {i === 0
                          ? display
                          : millisecondsToTime(l - laps[i - 1])}
                      </Caption>
                    </Grid>
                  );
                })
              : null}
          </ScrollAreaViewport>
          <ScrollAreaScrollBar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollBar>
          <ScrollAreaCorner />
        </ScrollArea>
      </Box>

      <Grid
        css={{
          gap: "$2",
          gridTemplateColumns: "repeat(3, 1fr)",
          placeSelf: "center",
          p: "$7 $4",
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
          <Button
            onClick={() => {
              nextState();
            }}
          >
            {isActive ? "Pause" : time ? "Resume" : "Start"}
          </Button>
        </div>
        <div style={{ placeSelf: "center" }}>
          {isActive && (
            <Button onClick={() => setLaps((prev) => [...prev, time])}>
              Lap
            </Button>
          )}
          {!isActive && hasTime && (
            <Link
              passHref
              href={{
                pathname: "/brew",
                query: {
                  time,
                  laps,
                },
              }}
            >
              <Anchor>Create brew entry</Anchor>
            </Link>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

function millisecondsToTime(milli: number) {
  const milliseconds = milli % 1000;
  const seconds = Math.floor((milli / 1000) % 60);
  const minutes = Math.floor((milli / (60 * 1000)) % 60);

  return minutes + ":" + seconds + "." + milliseconds;
}
