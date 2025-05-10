import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  defaultBlinkInterval,
  defaultLightInterval,
  Layout,
  LightColor,
} from "../Config";

type ControlContextType = {
  layout: Layout;
  setLayout: (layout: Layout) => void;
  lightPosition: LightColor;
  setLightPosition: (lightPosition: LightColor) => void;
  isStarted: boolean;
  toggleStarted: () => void;
  speedFactorPourcent: number;
  setSpeedFactorPourcent: (speedFactorPourcent: number) => void;
  isModeBlink: boolean;
  toggleModeBlink: () => void;
  blinkStatus: boolean;
  setBlinkStatus: (blinkStatus: boolean) => void;
  speedFactorBlinkPourcent: number;
  setSpeedFactorBlinkPourcent: (speedFactorBlinkPourcent: number) => void;
  incrementLightPosition: () => void;
};

const ControlContext = createContext<ControlContextType | undefined>(undefined);

const ControlProvider = ({ children }: { children: ReactNode }) => {
  const [layout, setLayout] = useState<Layout>("vertical");
  const [lightPosition, setLightPosition] = useState<LightColor>(
    LightColor.Green,
  );
  const [isStarted, setStarted] = useState<boolean>(false);
  const [speedFactorPourcent, setSpeedFactorPourcent] = useState<number>(5);
  const [isModeBlink, setModeBlink] = useState<boolean>(false);
  const [blinkStatus, setBlinkStatus] = useState<boolean>(true);
  const [speedFactorBlinkPourcent, setSpeedFactorBlinkPourcent] =
    useState<number>(5);

  const incrementLightPosition = useCallback(() => {
    setLightPosition((prev) => (prev + 1) % 3);
  }, []);

  useEffect(() => {
    let interval = undefined;
    if (isStarted) {
      const timeout =
        (defaultLightInterval[lightPosition] * (11 - speedFactorPourcent)) / 10;
      interval = setInterval(incrementLightPosition, timeout);
    }

    return () => clearInterval(interval);
  }, [isStarted, lightPosition, speedFactorPourcent, incrementLightPosition]);

  useEffect(() => {
    let interval = undefined;
    if (isModeBlink) {
      const timeout =
        (defaultBlinkInterval * (11 - speedFactorBlinkPourcent)) / 10;
      interval = setInterval(() => {
        setBlinkStatus((prev) => !prev);
      }, timeout);
    }

    return () => clearInterval(interval);
  }, [isModeBlink, speedFactorBlinkPourcent]);

  const toggleStarted = useCallback(() => {
    if (!isStarted) {
      setModeBlink(false);
      setBlinkStatus(true);
    }

    setStarted(!isStarted);
  }, [isStarted]);

  const toggleModeBlink = useCallback(() => {
    if (isModeBlink) {
      setBlinkStatus(true);
    }
    setModeBlink((prev) => !prev);
  }, [isModeBlink]);

  return (
    <ControlContext.Provider
      value={{
        layout,
        setLayout,
        lightPosition,
        setLightPosition,
        isStarted,
        toggleStarted,
        speedFactorPourcent,
        setSpeedFactorPourcent,
        isModeBlink,
        toggleModeBlink,
        blinkStatus,
        setBlinkStatus,
        speedFactorBlinkPourcent,
        setSpeedFactorBlinkPourcent,
        incrementLightPosition,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};

const useControl = (): ControlContextType => {
  const context = useContext(ControlContext);
  if (!context) {
    throw new Error("useControl must be used within a ControlProvider");
  }
  return context;
};

export { ControlProvider, useControl };
