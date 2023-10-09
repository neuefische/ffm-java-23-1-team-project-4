import './App.css'

import HomePage from "./features/home/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewBlogEntry from "./features/blogentry/NewBlogEntry.tsx";

export default function App()
{
  return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/newentry" element={<NewBlogEntry />} />
                </Routes>
            </BrowserRouter>
          </div>
  )
}
