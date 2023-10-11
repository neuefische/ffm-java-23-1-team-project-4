import './App.css'

import HomePage from "./pages/home/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewBlogEntry from "./pages/blogentry/NewBlogEntry.tsx";
import EditBlogEntry from "./pages/blogentry/EditBlogEntry.tsx";
export default function App()
{
  return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/newentry" element={<NewBlogEntry />} />
                    <Route path="/edit-entry/:id" element={<EditBlogEntry />} />
                </Routes>
            </BrowserRouter>
          </div>
  )
}
