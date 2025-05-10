import "./App.css";
import { ControlProvider } from "./contexts";
import { FC } from "react";
import { Page } from "./components";

const App: FC = () => {
  return (
    <ControlProvider>
      <Page />
    </ControlProvider>
  );
};

export default App;
