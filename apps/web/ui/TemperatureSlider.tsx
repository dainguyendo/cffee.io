import React from "react";
import {
  Box,
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
  styled,
  Text,
  Toggle,
  VisuallyHidden,
} from "ui";
import { Unit } from "../types/temperature";
import { MAX_FAHRENHEIT, MIN_FAHRENHEIT } from "../utils/constants";
import { round } from "../utils/number";
import { useCycle } from "./useCycle";

const Container = styled("div", {
  position: "relative",
  borderRadius: "$medium",
  width: "100%",
  maxWidth: "500px",
  padding: "$2 $4",
  minHeight: 150,
  display: "grid",
  alignItems: "center",

  "&:before": {
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: "inherit",
    width: 170,
    content: "attr(data-content)",
    color: "$linkpink",
    background: "white",
    fontWeight: "$bold",
    fontSize: "$7",
  },

  "&:after": {
    position: "absolute",
    right: "$4",
    bottom: 0,
    content: "attr(data-after)",
    color: "$linkpink",
    fontWeight: "$bold",
    fontSize: "$5",
  },
});

const TemperatureThumb = styled(SliderThumb, {
  width: 45,
  height: 45,
  borderRadius: "$circle",
  border: "2px solid $primary",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const TemperatureTrack = styled(SliderTrack, {
  backgroundColor: "$lightpink",
});

const UnitToggle = styled(Toggle, {
  position: "absolute",
  right: 0,
  top: 0,
  background: "white",
  border: "none",
  borderRadius: "$small",
});

const TemperatureRange = styled(SliderRange, {
  background: "$primary",
});
interface Props {
  fahrenheit: number;
  onTemperatureChange?: (fahrenheit: number) => void;
}

export const TemperatureSlider = ({
  fahrenheit,
  onTemperatureChange,
}: Props) => {
  const [unit, nextUnit] = useCycle<Unit>("fahrenheit", "celsius");

  const isFahrenheit = unit === "fahrenheit";

  const displayTemperature = round(
    temperatureUnit(fahrenheit, "fahrenheit", unit),
    1
  );

  return (
    <Container
      data-content={appendDegree(displayTemperature)}
      data-after={unit}
    >
      <UnitToggle pressed={isFahrenheit} onPressedChange={() => nextUnit()}>
        <Text variant="heading">
          {appendDegree(isFahrenheit ? "F" : "C", "pre")}
        </Text>
        <VisuallyHidden>
          Toggle to {isFahrenheit ? "Fahrenheit" : "Celsius"} unit
        </VisuallyHidden>
      </UnitToggle>
      <Box>
        <Slider
          value={[fahrenheit]}
          onValueChange={([t]) => {
            onTemperatureChange && onTemperatureChange(t);
          }}
          min={MIN_FAHRENHEIT}
          max={MAX_FAHRENHEIT}
          step={unit === "fahrenheit" ? 1 : 0.1}
          aria-label="Temperature"
        >
          <TemperatureTrack>
            <TemperatureRange />
          </TemperatureTrack>
          <TemperatureThumb>{displayTemperature}</TemperatureThumb>
        </Slider>
      </Box>
    </Container>
  );
};

function temperatureUnit(value: number, from: Unit, to: Unit): number {
  if (from === to) {
    return value;
  }

  if (from === "fahrenheit" && to === "celsius") {
    return ((value - 32) * 5) / 9;
  }

  if (from === "celsius" && to === "fahrenheit") {
    return (value * 9) / 5 + 32;
  }

  throw new Error("Unhandled case");
}

function appendDegree(
  value: number | string,
  placement: "pre" | "post" = "post"
): string {
  if (placement === "pre") {
    return `°${value}`;
  }
  return `${value}°`;
}
