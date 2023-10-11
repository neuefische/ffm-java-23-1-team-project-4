import {BlogEntry} from "../../model/BlogEntryModel.tsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";


export default function EditBlogEntry(){

    const navigateTo = useNavigate()
    const { id } = useParams();
    const [blogentry , setBlogentry] = useState<BlogEntry>()
    const [loading, setLoading] = useState<boolean>(true);
    const [error , setError] = useState<boolean>(false);


    useEffect( () =>
    {
        const fetchBlog = async () =>
        {
            try {
                const response = await axios(`/api/blogs/${id}`);
                setBlogentry(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchBlog().then();
    }, []);

    const addNewTag = () => {
        if(blogentry)
            setBlogentry({ ...blogentry, hashtags : [...blogentry.hashtags, ""] });
    };


    const deleteTag = (index: number) => {
        if (blogentry && blogentry.hashtags) {
            const newTags = [...blogentry.hashtags];
            newTags.splice(index, 1);
            setBlogentry({ ...blogentry, hashtags: newTags });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (blogentry) {
            const mytags = blogentry.hashtags.filter((tag) => tag !== "");

            console.log(blogentry)
            console.log(mytags)
            const date = blogentry.timeCreated ? new Date(blogentry.timeCreated) : new Date();
            const formattedDate = date.toISOString()

            const changedBlogEntry: BlogEntry =
            {
                id: blogentry.id,
                title: blogentry.title,
                content: blogentry.content,
                hashtags: mytags,
                timeCreated: formattedDate,
            };
            axios
                .put("/api/blogs/" + id, changedBlogEntry)
                .then(() => navigateTo("/"))
                .catch((error) => {
                    console.error("Fehler beim Speichern:", error);
                });
        }
    }

    if(loading) return <div>Loading...</div>
    if(error) return <div>Something went wrong</div>

return(
<>
<form onSubmit={handleSubmit}>
    <h1>NewBlog</h1>


    {blogentry && (
    <div>
        <p>
            <input
                value={blogentry.title || ''}
                onChange={(e) => {
                    setBlogentry({...blogentry, title: e.target.value});
                }}/>
        </p>

        <p>
            <textarea rows={10}
                value={blogentry.content}
                onChange={(e) => {
                   setBlogentry({...blogentry, content: e.target.value});
                }}/>
        </p>
        <span>Tags:</span>
        {blogentry.hashtags && blogentry.hashtags.map((tag, index) => (
            <div key={index}>
                <span>{index + 1}. </span>
                <input
                    value={tag}
                    onChange={((event ) => {
                        const newTags = [...blogentry.hashtags];
                        newTags[index] = event.target.value;
                        setBlogentry({ ...blogentry, hashtags: newTags });
                    })}
                />

                <button type={"button"} onClick={addNewTag}> + </button>
                <button type={"button"} onClick={() => deleteTag(index)}> - </button>
            </div>
        ))}
    </div>)}

    <button onClick={() => navigateTo("/")}>Discard Changes</button>
    <button onClick={handleSubmit}> Save Changes</button>
</form>
</>
 )
}
