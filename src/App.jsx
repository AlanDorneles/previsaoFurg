import "./App.css";
import '../node_modules/bulma/css/bulma.min.css'
import { Root } from "./routes/routes";
import { HourScopeProvider } from "./contexts/hourAnimation";

function App() {
  return (
    <main className="container" style={{ maxWidth:"100vw"}}>
      <HourScopeProvider>
        <Root/>
      </HourScopeProvider>
    </main> 
  );
}
export default App;
