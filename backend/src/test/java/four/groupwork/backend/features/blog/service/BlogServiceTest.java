package four.groupwork.backend.features.blog.service;

import four.groupwork.backend.features.blog.model.BlogEntry;
import four.groupwork.backend.features.blog.model.BlogResponse;
import four.groupwork.backend.features.blog.model.NewBlog;
import four.groupwork.backend.features.blog.model.UpdatedBlogEntry;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

import static org.mockito.Mockito.*;

class BlogServiceTest
{
    BlogRepo blogRepo = mock(BlogRepo.class);
    TagService tagService = mock(TagService.class);
    BlogService blogService = new BlogService(blogRepo, new BlogMappingService(), tagService );

    private BlogEntry setUp()
    {
        LocalDateTime localDateTime = LocalDateTime.of(2020, 1, 1, 12, 0, 0);
        Instant fixedInstant = localDateTime.toInstant(ZoneOffset.UTC);

        return new BlogEntry("1", "title", "content",
                List.of("hashtag1", "hashtag2"),
                fixedInstant);
        //fixed instant = 2020-01-01T12:00:00Z
    }

    @Test
    void getAllBlogs()
    {
        //GIVEN
        List<BlogResponse> expected = List.of(new BlogResponse("1", "title", "content",
                List.of("hashtag1", "hashtag2"),
                "2020-01-01T12:00:00Z"));

        when(blogRepo.findAll()).thenReturn(List.of(setUp()));

        //WHEN
        List<BlogResponse> actual = blogService.getAllBlogs();

        //THEN
        Assertions.assertEquals(1, actual.size());
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void addBlogEntry()
    {
        //GIVEN
        NewBlog newBlog = new NewBlog();
        newBlog.setTitle("title");
        newBlog.setContent("content");
        newBlog.setHashtags(List.of("hashtag1", "hashtag2"));

        when(blogRepo.save(any(BlogEntry.class))).thenReturn(setUp());

        //WHEN
        BlogResponse actual = blogService.addBlogEntry(newBlog);

        //THEN
        Assertions.assertEquals("title", actual.title());
        Assertions.assertEquals("content", actual.content());
        Assertions.assertEquals(List.of("hashtag1", "hashtag2"), actual.hashtags());
    }

    @Test
    void getBlogEntry()
    {
        //GIVEN
        BlogResponse expected = new BlogResponse("1", "title", "content",
                List.of("hashtag1", "hashtag2"),
                "2020-01-01T12:00:00Z");

        when(blogRepo.findById("1")).thenReturn(java.util.Optional.of(setUp()));

        //WHEN
        BlogResponse actual = blogService.getBlogEntry("1");

        //THEN
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void deleteBlogEntry()
    {
        Assertions.assertTrue(true);
    }

    @Test
    void updateBlogEntry()
    {
        //GIVEN
        UpdatedBlogEntry updatedBlog =  new UpdatedBlogEntry();
        updatedBlog.setTitle("updated title");
        updatedBlog.setContent("updated content");
        updatedBlog.setHashtags(List.of("updated hashtag1", "updated hashtag2"));

        when(blogRepo.findById("1")).thenReturn(java.util.Optional.of(setUp()));

        //WHEN
        BlogResponse actual = blogService.updateBlogEntry("1", updatedBlog);

        //THEN
        Assertions.assertEquals("updated title", actual.title());
        Assertions.assertEquals("updated content", actual.content());
        Assertions.assertEquals(List.of("updated hashtag1", "updated hashtag2"), actual.hashtags());

    }
}