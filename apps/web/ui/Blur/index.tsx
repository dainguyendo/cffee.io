import { motion, MotionProps } from "framer-motion";
import { styled } from "ui";

const rotationProps = ({
  duration,
  x,
  y,
  clockwise = true,
}: {
  duration: number;
  x: number;
  y: number;
  clockwise?: boolean;
}): MotionProps => ({
  initial: { x, y },
  animate: { rotate: clockwise ? 360 : -360 },
  transition: {
    loop: Infinity,
    ease: "linear",
    duration,
  },
});

const Svg = styled("svg", {
  mixBlendMode: "multiply",
  filter: "blur(25px)",
  "& g": {
    isolation: "isolate",
  },
});

export const Blur = () => {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="whiteToPrimary">
          <stop offset="10%" stopColor="hsl(60, 100%, 100%)" />
          <stop offset="95%" stopColor="hsl(346, 100%, 77%)" />
        </linearGradient>
        <linearGradient id="secondaryToWhite">
          <stop offset="10%" stopColor="hsl(359, 100%, 89%)" />
          <stop offset="95%" stopColor="hsl(60, 100%, 100%)" />
        </linearGradient>
        <linearGradient id="whiteToBackground">
          <stop offset="10%" stopColor="hsl(60, 100%, 100%)" />
          <stop offset="95%" stopColor="hsl(22, 66%, 94%)" />
        </linearGradient>
      </defs>
      <g>
        {/* <motion.path
          width="100%"
          height="100%"
          fill="url('#whiteToPrimary')"
          fillOpacity="80%"
          d="M41,-66C55,-62.9,69.4,-55.7,71.1,-44C72.9,-32.3,62,-16.1,59,-1.7C56,12.7,60.9,25.4,60,38.5C59.1,51.6,52.3,65.2,41.3,70.4C30.3,75.5,15.2,72.3,2.8,67.4C-9.5,62.5,-19.1,56.1,-27.8,49.6C-36.6,43.2,-44.6,36.8,-50.5,28.5C-56.4,20.2,-60.2,10.1,-62,-1C-63.7,-12.2,-63.5,-24.3,-58.2,-33.7C-52.9,-43,-42.7,-49.6,-32.1,-54.6C-21.6,-59.6,-10.8,-63.1,1.4,-65.5C13.5,-67.8,27,-69,41,-66Z"
          {...rotationProps({ duration: 30, x: 77, y: 91, clockwise: false })}
        /> */}
        <motion.path
          width="100%"
          height="100%"
          fill="url('#secondaryToWhite')"
          fillOpacity="75%"
          d="M38.1,-68.9C48,-60.2,53.7,-47.3,63.3,-35.1C72.8,-22.9,86.2,-11.4,85.6,-0.3C85,10.7,70.4,21.5,62,35.6C53.5,49.6,51.1,67,41.8,74.3C32.5,81.5,16.3,78.5,2.2,74.8C-11.9,71,-23.8,66.4,-31.6,58.3C-39.3,50.2,-42.9,38.5,-49.2,28.2C-55.5,17.9,-64.6,9,-70.2,-3.2C-75.8,-15.4,-78,-30.9,-72.1,-41.8C-66.1,-52.8,-52.1,-59.3,-38.7,-66C-25.3,-72.7,-12.7,-79.6,0.7,-80.8C14.1,-82,28.2,-77.6,38.1,-68.9Z"
          {...rotationProps({ duration: 22, x: 109, y: 65 })}
        />
        <motion.path
          width="100%"
          height="100%"
          fill="url('#whiteToBackground')"
          fillOpacity="90%"
          d="M28.9,-48.4C39.1,-44.1,50.3,-39.8,56.1,-31.7C61.9,-23.6,62.4,-11.8,62.4,-0.1C62.3,11.7,61.5,23.4,57.1,33.8C52.6,44.3,44.3,53.4,34.2,62C24.1,70.6,12,78.8,0.6,77.7C-10.8,76.7,-21.6,66.4,-33.7,58.9C-45.9,51.5,-59.3,46.7,-70.3,37.4C-81.3,28,-89.9,14,-92.1,-1.3C-94.3,-16.5,-90.1,-33.1,-80.1,-44.1C-70.1,-55.2,-54.2,-60.7,-39.8,-62.6C-25.5,-64.6,-12.8,-62.9,-1.7,-59.9C9.3,-56.9,18.7,-52.7,28.9,-48.4Z"
          {...rotationProps({ duration: 24, x: 100, y: 100 })}
        />
        <motion.path
          width="100%"
          height="100%"
          fill="url('#whiteToPrimary')"
          fillOpacity="90%"
          d="M40.2,-71C51.5,-63.1,59.7,-51.1,62.7,-38.6C65.7,-26.1,63.6,-13.1,64,0.2C64.3,13.5,67.2,27,61.2,34.3C55.2,41.6,40.3,42.8,28.6,48.6C17,54.5,8.5,64.8,-3.3,70.5C-15.1,76.2,-30.1,77.2,-40.6,70.8C-51.1,64.3,-57.1,50.3,-65.6,37.3C-74.1,24.2,-85.2,12.1,-84,0.7C-82.8,-10.8,-69.4,-21.5,-61.6,-35.9C-53.8,-50.2,-51.7,-68,-42.4,-77.1C-33.1,-86.1,-16.5,-86.4,-1,-84.6C14.4,-82.8,28.9,-78.9,40.2,-71Z"
          {...rotationProps({ duration: 28, x: 87, y: 114, clockwise: false })}
        />
        <motion.path
          width="100%"
          height="100%"
          fill="url('#secondaryToWhite')"
          fillOpacity="90%"
          d="M34.9,-55C47.1,-53.3,60.2,-47.8,71.1,-38C82,-28.2,90.7,-14.1,87.4,-1.9C84.1,10.3,68.7,20.6,59.4,33.1C50.1,45.7,46.8,60.5,37.9,71.7C29,82.8,14.5,90.3,0.2,90C-14.2,89.7,-28.4,81.8,-35.8,69.8C-43.2,57.7,-43.8,41.7,-45.8,29.4C-47.7,17.1,-51,8.6,-57.8,-3.9C-64.6,-16.4,-74.8,-32.8,-71.9,-43.4C-69.1,-54.1,-53,-59.1,-38.8,-59.7C-24.7,-60.3,-12.3,-56.4,-0.5,-55.6C11.3,-54.7,22.6,-56.7,34.9,-55Z"
          {...rotationProps({ duration: 35, x: 120, y: 123 })}
        />
      </g>
    </Svg>
  );
};
