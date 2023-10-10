export default function SortingComponent({entries, setEntries}) {

    function handleChangeSortBy(event) {
        const sortBy = event.target.value;
        const sortedEntries = [...entries];
        if (sortBy === 'newest to oldest') {
            sortedEntries.sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));
        } else if (sortBy === 'oldest to newest') {
            sortedEntries.sort((a, b) => new Date(a.timeCreated) - new Date(b.timeCreated));
        }
        setEntries(sortedEntries);

    }

    return <>
        <label htmlFor="sort-by">Sort by</label>
        <select id="sort-by" onChange={handleChangeSortBy}>
            <option value="newest to oldest">newest to oldest</option>
            <option value="oldest to newest">oldest to newest</option>
        </select>
    </>
}