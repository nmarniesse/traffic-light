import { FC } from "react";
import { Container, Grid } from "@mui/material";
import { useControl } from "../contexts";
import { Filters } from "./Filters";
import { Horizontal, Vertical } from "../layouts";

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

export { Page };
