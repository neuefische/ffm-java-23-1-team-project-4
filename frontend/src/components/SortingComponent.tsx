import {BlogEntry} from "../model/BlogEntryModel.tsx";
import {ChangeEvent} from "react";
import styled from "styled-components";

type props =
    {
        entries : BlogEntry[],
        setEntries : (entries : BlogEntry[]) => void
    };

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-end;
  justify-content: end;
  gap: 0.4em;
  padding: 0.4em;
  
`;
const SortLabel = styled.label`
    font-size: 1em;
`;

const SortSelect = styled.select`
  font-size: 1em;
    
`;

const SortOption = styled.option`
font-size: 1em;
`;

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

    return <Container>
        <SortLabel htmlFor="sort-by">Sort by</SortLabel>
        <SortSelect id="sort-by" onChange={handleChangeSortBy}>
            <SortOption value="oldest to newest">oldest to newest</SortOption>
            <SortOption value="newest to oldest">newest to oldest</SortOption>
        </SortSelect>
    </Container>
}