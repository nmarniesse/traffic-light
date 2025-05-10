import { useCallback, useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Vertical } from "./layout/Vertical";
import { Horizontal } from "./layout/Horizontal";
import {
  defaultBlinkInterval,
  defaultLightInterval,
  Layout,
  LightColor,
} from "./Config";

const App = () => {
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

  const handleStartChange = useCallback((value: boolean) => {
    if (!value) {
      setModeBlink(false);
      setBlinkStatus(true);
    }

    setStarted(value);
  }, []);

  const handleChangeModeBlink = useCallback(() => {
    if (isModeBlink) {
      setBlinkStatus(true);
    }
    setModeBlink((prev) => !prev);
  }, [isModeBlink]);

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
    <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid
          size={layout === "horizontal" ? 12 : 6}
          sx={{ textAlign: "center" }}
        >
          {layout === "vertical" && (
            <Vertical
              isRedOn={lightPosition === 2 && blinkStatus}
              isYellowOn={lightPosition === 1 && blinkStatus}
              isGreenOn={lightPosition === 0 && blinkStatus}
              onRedLightClick={handleRedLightClick}
              onYellowLightClick={handleYellowLightClick}
              onGreenLightClick={handleGreenLightClick}
            />
          )}
          {layout === "horizontal" && (
            <Horizontal
              isRedOn={lightPosition === 2 && blinkStatus}
              isYellowOn={lightPosition === 1 && blinkStatus}
              isGreenOn={lightPosition === 0 && blinkStatus}
            />
          )}
        </Grid>
        <Grid size={layout === "horizontal" ? 12 : 6}>
          <Box>
            <Typography variant="h5" gutterBottom>
              Défilement des feux
            </Typography>
            <Stack
              spacing={2}
              direction="row"
              sx={{ alignItems: "center", mb: 1 }}
            >
              <Button
                variant="contained"
                color={isStarted ? "error" : "success"}
                onClick={() => handleStartChange(!isStarted)}
              >
                {isStarted ? "Stop" : "Start"}
              </Button>
              <Button
                disabled={isStarted}
                variant="contained"
                onClick={incrementLightPosition}
              >
                Change
              </Button>
            </Stack>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            Vitesse
            <Slider
              aria-label="Vitesse"
              min={0}
              max={10}
              value={speedFactorPourcent}
              onChange={(_, number) => setSpeedFactorPourcent(number)}
              disabled={!isStarted}
            />
          </Box>

          <Divider sx={{ marginTop: "20px" }} />
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Clignotement
            </Typography>
            <Switch checked={isModeBlink} onChange={handleChangeModeBlink} />
            {isModeBlink ? "Start" : "Stop"}
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            Vitesse
            <Slider
              aria-label="Vitesse clignotement"
              min={0}
              max={10}
              value={speedFactorBlinkPourcent}
              onChange={(_, number) => setSpeedFactorBlinkPourcent(number)}
              disabled={!isModeBlink}
            />
          </Box>

          <Divider sx={{ marginTop: "20px" }} />
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Orientation
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={layout}
              onChange={(event) =>
                setLayout(event.target.value as "horizontal" | "vertical")
              }
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="vertical"
                control={<Radio />}
                label="Vertical"
              />
              <FormControlLabel
                value="horizontal"
                control={<Radio />}
                label="Horizontal"
              />
            </RadioGroup>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
