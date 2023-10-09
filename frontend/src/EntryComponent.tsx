import {BlogEntry} from "./model/BlogEntryModel.tsx";

export type props = {
    blogEntry: BlogEntry,
    onDeleteEntry: (id: string) => void;
}
export default function EntryComponent(props: props) {

    function handleClickBookmark() {
        console.log("Bookmark was clicked.")
    }

    return <>
        <li>
            <h2>{props.blogEntry.title}</h2>
            <small>01.01.2000</small>
            <button type="button" onClick={handleClickBookmark}>Bookmark</button>
            <p>{props.blogEntry.content}</p>
            <button type="button" onClick={() => props.onDeleteEntry(props.blogEntry.id)}>Delete</button>
            <ul>Tags:
                <li>#Tag1</li>
                <li>#Tag2</li>
            </ul>
        </li>
    </>
}