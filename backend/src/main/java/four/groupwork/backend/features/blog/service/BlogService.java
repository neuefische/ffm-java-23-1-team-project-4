package four.groupwork.backend.features.blog.service;

import four.groupwork.backend.features.blog.model.BlogEntry;
import four.groupwork.backend.features.blog.model.NewBlog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService
{
    private final BlogRepo blogRepo;

    public List<BlogEntry> getAllBlogs()
    {
        return blogRepo.findAll();
    }

    public BlogEntry addBlogEntry(NewBlog newBlog)
    {

        BlogEntry blog = BlogEntry.builder()
                .content(newBlog.getContent())
                .title(newBlog.getTitle())
                .build();

        return blogRepo.save(blog);
    }

    public BlogEntry getBlogEntry(String id)
    {
        return blogRepo.findById(id).orElseThrow();
    }

    public void deleteBlogEntry(String id)
    {
        blogRepo.deleteById(id);
    }

    public BlogEntry updateBlogEntry(String id, NewBlog newBlog)
    {
        BlogEntry blog = blogRepo.findById(id).orElseThrow();
        blog.setContent(newBlog.getContent());
        blog.setTitle(newBlog.getTitle());
        return blogRepo.save(blog);
    }
}
