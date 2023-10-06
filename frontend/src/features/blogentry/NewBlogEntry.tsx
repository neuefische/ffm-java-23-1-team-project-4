import {useState} from "react";
import axios from "axios";

type NewBlog = {
    title: string;
    content: string;
};

export default function NewBlogEntry(){

    const [title, setTitle, ] = useState("")
    const [text, setText, ] = useState("")
    function onSubmit(){
        const newBlogEntry: NewBlog = {
            title: title,
            content: text,
        };
        axios
            .post("/api/blogs",newBlogEntry)
            .then((response) => {

                console.log("Erfolgreich gespeichert:", response.data);
                // Füge hier ggf. weitere Aktionen nach erfolgreicher Speicherung hinzu
            })
            .catch((error) => {
                // Fehler verarbeiten
                console.error("Fehler beim Speichern:", error);
                // Füge hier ggf. Fehlerbehandlung hinzu
            });

    }


    return  <>
            <h1>NewBlog</h1>

                <input placeholder={"title"} value={title} onChange={(event)=>setTitle(event.target.value)}></input>
                <input placeholder={"write your text here"} value={text} onChange={(event)=>setText(event.target.value)}></input>
                <button onClick={onSubmit}>Submit</button>





            </>

}