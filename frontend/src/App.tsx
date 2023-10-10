import './App.css'

import HomePage from "./features/home/HomePage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewBlogEntry from "./features/blogentry/NewBlogEntry.tsx";
import EditBlogEntry2 from "./features/blogentry/EditBlogEntry2.tsx";

export default function App()
{
  return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/newentry" element={<NewBlogEntry />} />
                    <Route path="/edit-entry/:id" element={<EditBlogEntry2 />} />
                </Routes>
            </BrowserRouter>
          </div>
  )
}
