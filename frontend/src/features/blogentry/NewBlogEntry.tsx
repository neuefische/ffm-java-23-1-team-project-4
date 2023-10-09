import {useState} from "react";
import axios from "axios";

type NewBlog = {
    title: string;
    content: string;
    hashtags : string[];
};

type Tag = {
  name: string;
};

export default function NewBlogEntry(){

    const [title, setTitle, ] = useState("")
    const [text, setText, ] = useState("")
    const [tags, setTags,] = useState<Tag[]>([{name : ""}])

    const addNewTag = () => {
        setTags([...tags, {name: ""}]);
    };

    const changeTagName = (index: number, name : string) => {
        const newTags = [...tags]; // Clone the tags array
        newTags[index].name = name; // Change the name of the tag at the given index
        setTags(newTags); // Update the state
    };

    function onSubmit()
    {
        //function to delete and entry with the name default text
        const filteredTags = tags.filter(tag => tag.name !== "");
        const mytags = filteredTags.map((item) => item.name )

        const newBlogEntry: NewBlog =
        {
            title: title,
            content: text,
            hashtags : mytags,
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
        <p>
            <input placeholder={"title"} value={title} onChange={(event)=>setTitle(event.target.value)}></input>
        </p>

        <p>
            <textarea rows={10}  placeholder={"write your text here"} value={text} onChange={(event)=>setText(event.target.value)}></textarea>
        </p>

        <div>
            <span>Tags:</span>
            {tags && tags.map((tag, index) => (
                <div key={index}>
                    <span>{index + 1}. </span>
                    <input
                        value={tag.name}
                        placeholder={"#Enter a Tag"}
                        onChange={(event) => changeTagName(index, event.target.value)}
                    />
                    <button onClick={() => addNewTag()}> + </button>
                </div>
            ))}
        </div>
        <button onClick={onSubmit}>Submit</button>
</>
}