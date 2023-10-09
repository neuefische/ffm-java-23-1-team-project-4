import {BlogEntry} from "./model/BlogEntryModel.tsx";
import styled from "styled-components";

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

    function handleClickBookmark() {
        console.log("Bookmark was clicked.")
    }

    return <>
        <Container>
            <TitleContainer>
                <Title>{props.blogEntry.title}</Title>
                <small>01.01.2000</small>
            </TitleContainer>
            <BookmarkButton type="button" onClick={handleClickBookmark}>Bookmark</BookmarkButton>
            <p>{props.blogEntry.content}</p>
            <button type="button" onClick={() => props.onDeleteEntry(props.blogEntry.id)}>Delete</button>
            <TagList>Tags:
                {props.blogEntry.hashtags.map(hashtag=> {
                        return <Tag>{hashtag}</Tag>
                    }
                )}
            </TagList>
        </Container>
    </>
}