import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import { Root } from "./routes/routes";
import { HourScopeProvider } from "./contexts/hourAnimation";
import { RadarIsCheckedProvider } from "./contexts/radarIsChecked";
import { PreviousAndNextImageProvider } from "./contexts/previousAndNextImage";

function App() {
  return (
    <main className="container" style={{ maxWidth: "100vw" }}>
      <HourScopeProvider>
        <RadarIsCheckedProvider>
          <PreviousAndNextImageProvider>
          <Root />
          </PreviousAndNextImageProvider>
        </RadarIsCheckedProvider>
      </HourScopeProvider>
    </main>
  );
}
export default App;
