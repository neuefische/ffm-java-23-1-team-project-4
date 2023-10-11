import {useNavigate} from "react-router-dom";
import EntryComponent from "../../components/EntryComponent.tsx";
import SortingComponent from "../../components/SortingComponent.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {BlogEntry} from "../../model/BlogEntryModel.tsx";
import AppHeader from "../../components/AppHeader.tsx";
import styled from "styled-components";
import AddIcon from "../../assets/plus-circle.svg"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0.4em;
`;

const NewEntryButton = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 2em;
  font-weight: 500;
  background-color: #f7c297;
  cursor: pointer;
  transition: border-color 0.25s;
  position: relative;
`;

const AddButtonIcon = styled.img`
  width: 1.6em;
  position: absolute;
  top: 0.4em;
  left: 1.2em;
`

const BlogList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding: 1em;
  gap: 2em;
`;

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
            <Main>
            <NewEntryButton type="button" onClick={() => navigateTo("/newentry")}>
                <AddButtonIcon src={AddIcon} alt="Add Icon"/>New Entry
            </NewEntryButton>
            <SortingComponent entries={entries} setEntries={setEntries}/>
            <BlogList>{entries.map((entry) => {
                return <>
                    <EntryComponent key={entry.id} blogEntry={entry} onDeleteEntry={handleDeleteEntry}/>
                </>
            })
            }
            </BlogList>
            </Main>
        </>
    )
}