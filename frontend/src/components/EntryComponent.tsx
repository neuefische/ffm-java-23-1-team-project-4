import {BlogEntry} from "../model/BlogEntryModel.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export type props = {
    blogEntry: BlogEntry,
    onDeleteEntry: (id: string) => void;
}

const Container = styled.li`
  border: 1px black solid;
  border-radius: 10px;
  background-color: #646cff;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 0.6em;
  width: 100%;
  position: relative;
  left: 0;
  right: 0;
  align-self: center;
`;

const Title = styled.h2`
  font-size: 2em;`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;`

const BookmarkButton = styled.button`
  width: 1em;
  border-radius: 10px;
  border: 0.2em black solid;
  position: absolute;
  top: 0;
  right: 0;
`;

const TagList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Tag = styled.li`
border: solid black 1px;
padding: 0.2em;`;


export default function EntryComponent(props: props) {

    const date : string = new Date(props.blogEntry.timeCreated)
                        .toLocaleDateString()
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const time: string = new Date(props.blogEntry.timeCreated).toLocaleTimeString(undefined, timeOptions);
    const navigateTo = useNavigate()

    function handleClickBookmark() {
        console.log("Bookmark was clicked.")
    }

    function handleEditEntry() {
        navigateTo("/edit-entry/" + props.blogEntry.id)
    }

    return <>
        <Container>
            <TitleContainer>
                <Title>{props.blogEntry.title}</Title>
                <small>{date + " " + time}</small>
            </TitleContainer>
            <BookmarkButton type="button" onClick={handleClickBookmark}>Bookmark</BookmarkButton>
            <p>{props.blogEntry.content}</p>
            <button type="button" onClick={() => props.onDeleteEntry(props.blogEntry.id)}>Delete</button>
            <button type="button" onClick={handleEditEntry}>Edit</button>
            <TagList>Tags:
                {props.blogEntry.hashtags.map(hashtag=> {
                        return <Tag>{hashtag}</Tag>
                    }
                )}
            </TagList>
        </Container>
    </>
}