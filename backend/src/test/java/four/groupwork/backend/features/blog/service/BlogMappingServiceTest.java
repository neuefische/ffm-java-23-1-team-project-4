package four.groupwork.backend.features.blog.service;

import four.groupwork.backend.features.blog.model.BlogEntry;
import four.groupwork.backend.features.blog.model.BlogResponse;
import four.groupwork.backend.features.blog.model.NewBlog;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.List;


class BlogMappingServiceTest
{
    private final BlogMappingService blogMappingService =
            new BlogMappingService();

    @Test
    void mapBlogToResponse()
    {
        // GIVEN
        BlogEntry blogEntry = new BlogEntry();
        blogEntry.setId("id");
        blogEntry.setTitle("title");
        blogEntry.setContent("content");
        blogEntry.setHashtags(List.of("hashtag1", "hashtag2"));
        blogEntry.setTimeCreated(Instant.now());

        // WHEN
        BlogResponse actual = blogMappingService.mapBlogToResponse(blogEntry);

        Assertions.assertEquals("id" , actual.id());
        assert actual.title().equals("title");
        assert actual.content().equals("content");
        assert actual.hashtags().equals(List.of("hashtag1", "hashtag2"));
        assert actual.timeCreated() != null;
    }

    @Test
    void mapNewBlogToBlogEntry()
    {
        // GIVEN
        NewBlog newBlog = new NewBlog();
        newBlog.setTitle("title");
        newBlog.setContent("content");
        newBlog.setHashtags(List.of("hashtag1", "hashtag2"));
        // WHEN
        BlogEntry actual = blogMappingService.mapNewBlogToBlogEntry(newBlog);
        // Assert
        Assertions.assertEquals("title", actual.getTitle());
        assert actual.getContent().equals("content");
        assert actual.getHashtags().equals(List.of("hashtag1", "hashtag2"));
        assert actual.getTimeCreated() != null;
    }
}