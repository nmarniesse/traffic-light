import "./App.css";
import { Container, Grid } from "@mui/material";
import { Vertical } from "./layout/Vertical";
import { Horizontal } from "./layout/Horizontal";
import { Filters } from "./Filters";
import { ControlProvider, useControl } from "./contexts";
import { FC } from "react";

const App: FC = () => {
  return (
    <ControlProvider>
      <Page />
    </ControlProvider>
  );
};

const Page: FC = () => {
  const { layout } = useControl();

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid
          size={layout === "horizontal" ? 12 : 6}
          sx={{ textAlign: "center" }}
        >
          {layout === "vertical" && <Vertical />}
          {layout === "horizontal" && <Horizontal />}
        </Grid>
        <Grid size={layout === "horizontal" ? 12 : 6}>
          <Filters />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
