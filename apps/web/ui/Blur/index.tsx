import { motion, MotionProps } from "framer-motion";
import { styled } from "ui";

const rotationProps = ({
  duration,
  x,
  y,
}: {
  duration: number;
  x: number;
  y: number;
}): MotionProps => ({
  initial: { x, y },
  animate: { rotate: 360 },
  transition: {
    loop: Infinity,
    ease: "linear",
    duration,
  },
});

const Svg = styled("svg", {
  mixBlendMode: "multiply",
  filter: "blur(15px)",
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
        <motion.path
          width="100%"
          height="100%"
          fill="url('#whiteToPrimary')"
          fillOpacity="80%"
          d="M41,-66C55,-62.9,69.4,-55.7,71.1,-44C72.9,-32.3,62,-16.1,59,-1.7C56,12.7,60.9,25.4,60,38.5C59.1,51.6,52.3,65.2,41.3,70.4C30.3,75.5,15.2,72.3,2.8,67.4C-9.5,62.5,-19.1,56.1,-27.8,49.6C-36.6,43.2,-44.6,36.8,-50.5,28.5C-56.4,20.2,-60.2,10.1,-62,-1C-63.7,-12.2,-63.5,-24.3,-58.2,-33.7C-52.9,-43,-42.7,-49.6,-32.1,-54.6C-21.6,-59.6,-10.8,-63.1,1.4,-65.5C13.5,-67.8,27,-69,41,-66Z"
          {...rotationProps({ duration: 30, x: 25, y: 25 })}
        />
        <motion.path
          width="100%"
          height="100%"
          fill="url('#secondaryToWhite')"
          fillOpacity="75%"
          d="M38.1,-68.9C48,-60.2,53.7,-47.3,63.3,-35.1C72.8,-22.9,86.2,-11.4,85.6,-0.3C85,10.7,70.4,21.5,62,35.6C53.5,49.6,51.1,67,41.8,74.3C32.5,81.5,16.3,78.5,2.2,74.8C-11.9,71,-23.8,66.4,-31.6,58.3C-39.3,50.2,-42.9,38.5,-49.2,28.2C-55.5,17.9,-64.6,9,-70.2,-3.2C-75.8,-15.4,-78,-30.9,-72.1,-41.8C-66.1,-52.8,-52.1,-59.3,-38.7,-66C-25.3,-72.7,-12.7,-79.6,0.7,-80.8C14.1,-82,28.2,-77.6,38.1,-68.9Z"
          {...rotationProps({ duration: 22, x: 45, y: 65 })}
        />
        <motion.path
          width="100%"
          height="100%"
          fill="url('#whiteToBackground')"
          fillOpacity="90%"
          d="M28.9,-48.4C39.1,-44.1,50.3,-39.8,56.1,-31.7C61.9,-23.6,62.4,-11.8,62.4,-0.1C62.3,11.7,61.5,23.4,57.1,33.8C52.6,44.3,44.3,53.4,34.2,62C24.1,70.6,12,78.8,0.6,77.7C-10.8,76.7,-21.6,66.4,-33.7,58.9C-45.9,51.5,-59.3,46.7,-70.3,37.4C-81.3,28,-89.9,14,-92.1,-1.3C-94.3,-16.5,-90.1,-33.1,-80.1,-44.1C-70.1,-55.2,-54.2,-60.7,-39.8,-62.6C-25.5,-64.6,-12.8,-62.9,-1.7,-59.9C9.3,-56.9,18.7,-52.7,28.9,-48.4Z"
          {...rotationProps({ duration: 28, x: 110, y: 85 })}
        />
      </g>
    </Svg>
  );
};
