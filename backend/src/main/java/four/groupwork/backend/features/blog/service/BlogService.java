package four.groupwork.backend.features.blog.service;

import four.groupwork.backend.features.blog.model.BlogEntry;
import four.groupwork.backend.features.blog.model.NewBlog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlogService
{
    private final BlogRepo blogRepo;

    public BlogEntry addBlogEntry(NewBlog newBlog)
    {

        BlogEntry blog = BlogEntry.builder()
                .content(newBlog.getContent())
                .title(newBlog.getTitle())
                .build();

        return blogRepo.save(blog);
    }
}
