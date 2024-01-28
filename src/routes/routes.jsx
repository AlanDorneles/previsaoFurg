import { Route, Routes} from "react-router";
import Container from "../components/container/container"
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";

export const Root = () => {
    return(
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Container />} />
            <Route path="/radar" element={<Container />} />
            <Route path="/equipe" element={<Container/>}></Route>
            <Route path="/satelite" element={<Container/>}></Route>
        </Routes>
    </BrowserRouter>
    )
}

