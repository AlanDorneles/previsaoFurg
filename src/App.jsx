import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import "./sass/navbar.scss"
import { Root } from "./routes/routes";
import { HourScopeProvider } from "./contexts/hourAnimation";
import { RadarIsCheckedProvider } from "./contexts/radarIsChecked";
import { PreviousAndNextImageProvider } from "./contexts/previousAndNextImage";
import { StationsVisibleProvider } from "./contexts/radarFilter";
import { CodeStationsProvider } from "./contexts/codeStation";
import { FilterTypeRadarProvider } from "./contexts/typeRadar";

function App() {
  return (
    <main className="container" style={{ maxWidth: "100vw" }}>
      <HourScopeProvider>
        <RadarIsCheckedProvider>
          <PreviousAndNextImageProvider>
            <StationsVisibleProvider>
              <CodeStationsProvider>
                <FilterTypeRadarProvider>
                  <Root />
                </FilterTypeRadarProvider>
              </CodeStationsProvider>
            </StationsVisibleProvider>
          </PreviousAndNextImageProvider>
        </RadarIsCheckedProvider>
      </HourScopeProvider>
    </main>
  );
}
export default App;
