import { useEffect, useState } from 'react'
import './App.css'
import { Box, Button, Container, Divider, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Slider, Switch } from '@mui/material';
import { Vertical } from './layout/Vertical';
import { Horizontal } from './layout/Horizontal';

const lights = ['green', 'yellow', 'red'];
const defaultLightInterval = [3000, 1000, 3000];
const defaultBlinkInterval = 500;

const App = () => {
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('vertical');
  const [lightIndex, setLightIndex] = useState<number>(0);

  const [isStarted, setStarted] = useState<boolean>(false);
  const [speedFactorPourcent, setSpeedFactorPourcent] = useState<number>(5);

  const [isModeBlink, setModeBlink] = useState<boolean>(false);
  const [blinkStatus, setBlinkStatus] = useState<boolean>(true);
  const [speedFactorBlinkPourcent, setSpeedFactorBlinkPourcent] = useState<number>(5);

  const handleStart = (value: boolean) => {
    if (!value) {
      setModeBlink(false);
    }

    setStarted(value);
  };

  useEffect(() => {
    let interval = undefined;
    if (isStarted) {
      const timeout = defaultLightInterval[lightIndex] * (11 - speedFactorPourcent) / 10;
      interval = setInterval(() => {
        setLightIndex((lightIndex + 1) % lights.length);
      }, timeout);
    }

    return () => clearInterval(interval);
  }, [isStarted, lightIndex, speedFactorPourcent]);

  useEffect(() => {
    let interval = undefined;
    if (isModeBlink) {
      const timeout = defaultBlinkInterval * (11 - speedFactorBlinkPourcent) / 10;
      interval = setInterval(() => {
        setBlinkStatus((prev) => !prev);
      }, timeout);
    }

    return () => clearInterval(interval);
  }, [isModeBlink, speedFactorBlinkPourcent]);

  return (
    <Container maxWidth="lg" sx={{paddingTop: '20px'}}>
      <Grid container spacing={2}>
        <Grid size={8} sx={{textAlign: 'center'}}>
        {layout === 'vertical' && (
            <Vertical isRedOn={lightIndex === 2 && blinkStatus} isYellowOn={lightIndex === 1 && blinkStatus} isGreenOn={lightIndex === 0 && blinkStatus}/>
          )}
          {layout === 'horizontal' && (
            <Horizontal isRedOn={lightIndex === 2 && blinkStatus} isYellowOn={lightIndex === 1 && blinkStatus} isGreenOn={lightIndex === 0 && blinkStatus}/>
          )}
        </Grid>
        <Grid size={4}>
          <Box>
            <Button variant="contained" color={isStarted ? 'error' : 'success'} onClick={() => handleStart(!isStarted)}>
                {isStarted ? 'Stop' : 'Start'}
            </Button>
          </Box>
          <Box sx={{marginTop: '20px'}}>
            <Button disabled={isStarted} variant="contained" onClick={() => setLightIndex((lightIndex + 1) % lights.length)}>
              Change
            </Button>
          </Box>

          <Divider sx={{marginTop: '20px'}}/>
          <Box sx={{marginTop: '20px'}}>
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

          <Divider sx={{marginTop: '20px'}}/>
          <Box sx={{marginTop: '20px'}}>
            <Switch disabled={!isStarted} checked={isModeBlink} onChange={() => setModeBlink(prev => !prev)} />
            {isModeBlink ? 'Clignote' : 'Fixe'}
          </Box>
          <Box sx={{marginTop: '20px'}}>
            Vitesse clignotement
            <Slider 
              aria-label="Vitesse clignotement"
              min={0} 
              max={10}
              value={speedFactorBlinkPourcent}
              onChange={(_, number) => setSpeedFactorBlinkPourcent(number)}
              disabled={!isModeBlink}
            />
          </Box>

          <Divider sx={{marginTop: '20px'}}/>
          <Box sx={{marginTop: '20px'}}>
            <FormLabel id="demo-radio-buttons-group-label">Orientation</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={layout}
              onChange={(event) => setLayout(event.target.value as 'horizontal' | 'vertical')}
              name="radio-buttons-group"
            >
              <FormControlLabel value="vertical" control={<Radio />} label="Vertical" />
              <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
            </RadioGroup>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
