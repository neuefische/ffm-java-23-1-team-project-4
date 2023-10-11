import {BlogEntry} from "../model/BlogEntryModel.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import BookmarkSvg from "../assets/bookmark.svg";
import PencilSvg from "../assets/pencil.svg";
import TrashSvg from "../assets/trash.svg";

export type props = {
    blogEntry: BlogEntry,
    onDeleteEntry: (id: string) => void;
}

const Container = styled.li`
  border: 0.4em #ffecb8 solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 1em;
  position: relative;
  gap: 0.4em;
`;

const Title = styled.h2`
  font-size: 2em;
  align-self: center;
  color: #f7c297
`;

const EntryDate = styled.small`
  align-self: flex-start;
  position: absolute;
  top: 0.4em;
  left: 0.4em;
  font-size: 0.8em;
  color: #90d2d8
`;

const BookmarkButton = styled.button`
  width: 3em;
  border-radius: 10px;
  position: absolute;
  top: -1.2em;
  right: 0.2em;
  align-self: end;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4em;
`;

const Button = styled.button`
  border-radius: 10px;
  position: relative;
  align-self: end;
  padding: 0;
  background-color: #90d2d8;
  border: none;
  cursor: pointer;
  width: 100%;
  height: 3em;
  font-size: 1em;
`;

const ButtonImage = styled.img`
  position: absolute;
  left: 0.6em;
  top: 0.8em;
  width: 1.4em;
`;

const TagList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 0.4em;
  list-style: none;
`;

const Tag = styled.li`
  padding: 0.2em;`;


export default function EntryComponent(props: props) {

    const date: string = new Date(props.blogEntry.timeCreated)
        .toLocaleDateString()
    const timeOptions: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit'};
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
            <Title>{props.blogEntry.title}</Title>
            <EntryDate>{date + " " + time}</EntryDate>
            <BookmarkButton type="button" onClick={handleClickBookmark}>
                <img src={BookmarkSvg}
                     alt="Bookmark"/>
            </BookmarkButton>
            <p>{props.blogEntry.content}</p>
            <ButtonContainer>
                <Button type="button" onClick={() => props.onDeleteEntry(props.blogEntry.id)}>
                    <ButtonImage src={TrashSvg} alt="Trash Icon"/>Delete
                </Button>
                <Button type="button" onClick={handleEditEntry}>
                    <ButtonImage src={PencilSvg} alt="Pencil Icon"/>Edit
                </Button>
            </ButtonContainer>
            <TagList>
                {props.blogEntry.hashtags.map(hashtag => {
                        return <Tag>{hashtag}</Tag>
                    }
                )}
            </TagList>
        </Container>
    </>
}