import {useNavigate} from "react-router-dom";
import EntryComponent from "../../components/EntryComponent.tsx";
import SortingComponent from "../../components/SortingComponent.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {BlogEntry} from "../../model/BlogEntryModel.tsx";
import AppHeader from "../../components/AppHeader.tsx";

export default function HomePage() {
    const [entries, setEntries] = useState<BlogEntry[]>([]);
    const navigateTo = useNavigate()
    const fetchEntries = () => {
        axios.get("/api/blogs")
            .then((response) => {
                setEntries(response.data)
            })
            .catch((error) => {
                console.error("Error found", error);
            })
    };
    useEffect(() => {
        fetchEntries();
    }, [])

    function handleDeleteEntry(id: string) {
        axios
            .delete("/api/blogs/" + id)
            .then(() => {
                fetchEntries();
            })
            .catch((error) => {
                console.error("Fehler beim Löschen", error);
            });
    }

    console.log(entries);

    return (
        <>
            <AppHeader headerText="MyBlog App"/>
            <button onClick={() => navigateTo("/newentry")}>NewEntry</button>
            <SortingComponent entries={entries} setEntries={setEntries}/>
            <ul>{entries.map((entry) => {
                return <>
                    <EntryComponent key={entry.id} blogEntry={entry} onDeleteEntry={handleDeleteEntry}/>
                </>
            })
            }
            </ul>

        </>
    )
}