import {BlogEntry} from "../model/BlogEntryModel.tsx";
import {ChangeEvent} from "react";

type props =
    {
        entries : BlogEntry[],
        setEntries : (entries : BlogEntry[]) => void
    }

export default function SortingComponent( props  : props) {

    function handleChangeSortBy(event : ChangeEvent<HTMLSelectElement>) {
        const sortBy = event.target.value;
        const sortedEntries = [...props.entries];
        if (sortBy === 'newest to oldest') {
            sortedEntries.sort((a, b) => new Date(b.timeCreated).getTime()  - new Date(a.timeCreated).getTime());
        } else if (sortBy === 'oldest to newest') {
            sortedEntries.sort((a, b) => new Date(a.timeCreated).getTime() - new Date(b.timeCreated).getTime());
        }
        props.setEntries(sortedEntries);
    }

    return <>
        <label htmlFor="sort-by">Sort by</label>
        <select id="sort-by" onChange={handleChangeSortBy}>
            <option value="newest to oldest">newest to oldest</option>
            <option value="oldest to newest">oldest to newest</option>
        </select>
    </>
}