import './App.css'

import HomePage from "./features/home/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export default function App()
{
  return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
          </div>
  )
}
