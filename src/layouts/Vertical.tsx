import { FC, useCallback } from "react";
import { glowIntensity, LightColor } from "../Config";
import { useControl } from "../contexts";

const Vertical: FC = () => {
  const { lightPosition, setLightPosition, blinkStatus } = useControl();

  const isRedOn = lightPosition === LightColor.Red && blinkStatus;
  const isYellowOn = lightPosition === LightColor.Yellow && blinkStatus;
  const isGreenOn = lightPosition === LightColor.Green && blinkStatus;

  const handleGreenLightClick = useCallback(() => {
    setLightPosition(LightColor.Green);
  }, []);

  const handleYellowLightClick = useCallback(() => {
    setLightPosition(LightColor.Yellow);
  }, []);

  const handleRedLightClick = useCallback(() => {
    setLightPosition(LightColor.Red);
  }, []);

  return (
    <svg
      width="100%"
      height="80%"
      viewBox="0 0 120 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="red-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation={glowIntensity}
            flood-color="red"
          />
        </filter>

        <filter id="yellow-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation={glowIntensity}
            flood-color="yellow"
          />
        </filter>

        <filter id="green-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation={glowIntensity}
            flood-color="lime"
          />
        </filter>
      </defs>
      <rect
        x="20"
        y="10"
        width="80"
        height="260"
        rx="20"
        ry="20"
        fill="#333"
        stroke="#000"
        stroke-width="4"
      />
      <circle
        cx="60"
        cy="60"
        r="25"
        fill={isRedOn ? "red" : "grey"}
        stroke="#000"
        stroke-width="2"
        filter={isRedOn ? "url(#red-glow)" : undefined}
        onClick={handleRedLightClick}
        style={{ cursor: "pointer" }}
      />
      <circle
        cx="60"
        cy="140"
        r="25"
        fill={isYellowOn ? "yellow" : "grey"}
        stroke="#000"
        stroke-width="2"
        filter={isYellowOn ? "url(#yellow-glow)" : undefined}
        onClick={handleYellowLightClick}
        style={{ cursor: "pointer" }}
      />
      <circle
        cx="60"
        cy="220"
        r="25"
        fill={isGreenOn ? "green" : "grey"}
        stroke="#000"
        stroke-width="2"
        filter={isGreenOn ? "url(#green-glow)" : undefined}
        onClick={handleGreenLightClick}
        style={{ cursor: "pointer" }}
      />
    </svg>
  );
};

export { Vertical };
