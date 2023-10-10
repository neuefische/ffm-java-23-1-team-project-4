import {BlogEntry} from "../../model/BlogEntryModel.tsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";


export default function EditBlogEntry(){

    const navigateTo = useNavigate()
    const { id } = useParams();

    const [title, setTitle, ] = useState<string>("")
    const [text, setText, ] = useState("")
    const [tags, setTags,] = useState<string[]>([])

    const [blogentry , setBlogentry]
        = useState<BlogEntry>()

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await axios(`/api/blogs/${id}`);
            setBlogentry(response.data);

            if(blogentry?.title) setTitle(blogentry?.title)
            if(blogentry?.content) setText(blogentry?.content)
            if(blogentry?.hashtags)setTags(blogentry?.hashtags)
        };
        fetchBlog();

    }, []);

    const addNewTag = () => {
        setTags([...tags, ""]);
    };

    const changeTagName = (index: number, name : string) => {
        const newTags = [...tags]; // Clone the tags array
        newTags[index] = name; // Change the name of the tag at the given index
        setTags(newTags); // Update the state
    };

    const deleteTag = (index: number) => {
        const newTags = [...tags]; // Clone the tags array
        newTags.splice(index, 1); // Remove the tag at the given index
        setTags(newTags); // Update the state
    }

return(
<>
    <h1>NewBlog</h1>

    <p>
        <input value={title}
               onChange={(event)=>
                   setTitle(event.target.value)}></input>
    </p>

    <p>
        <textarea rows={10}
                  value={text}
                  onChange={(event)=>
                      setText(event.target.value)}></textarea>
    </p>

    <div>
        <span>Tags:</span>
        {tags && tags.map((tag, index) => (
            <div key={index}>
                <span>{index + 1}. </span>
                <input
                    value={tag}
                    placeholder={"#Enter a Tag"}
                    onChange={(event) =>
                        changeTagName(index, event.target.value)}/>

                <button onClick={() => addNewTag()}> + </button>
                <button onClick={() => deleteTag(index)}> - </button>
            </div>
        ))}
    </div>

    <button onClick={() => navigateTo(-1)}>Discard Changes</button>
    <button>Save Changes</button>
    </>
 )
}
