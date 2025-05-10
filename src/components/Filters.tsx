import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useControl } from "../contexts";

const Filters = () => {
  const {
    layout,
    setLayout,
    isStarted,
    toggleStarted,
    incrementLightPosition,
    speedFactorPourcent,
    setSpeedFactorPourcent,
    isModeBlink,
    toggleModeBlink,
    speedFactorBlinkPourcent,
    setSpeedFactorBlinkPourcent,
  } = useControl();

  return (
    <>
      <Box>
        <Typography variant="h5" gutterBottom>
          Défilement des feux
        </Typography>
        <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }}>
          <Button
            variant="contained"
            color={isStarted ? "error" : "success"}
            onClick={() => toggleStarted()}
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
        <Switch checked={isModeBlink} onChange={toggleModeBlink} />
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
    </>
  );
};
export { Filters };
