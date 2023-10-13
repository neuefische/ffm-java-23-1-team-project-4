package four.groupwork.backend.features.blog.controller;

import four.groupwork.backend.features.blog.model.BlogResponse;
import four.groupwork.backend.features.blog.model.NewBlog;
import four.groupwork.backend.features.blog.model.UpdatedBlogEntry;
import four.groupwork.backend.features.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController
{
    private final BlogService blogService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<BlogResponse> getAllBlogs()
    {
        return blogService.getAllBlogs();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BlogResponse getBlog(@PathVariable String id)
    {
        return blogService.getBlogEntry(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlogResponse addBlog(@RequestBody NewBlog newBlog)
    {
        return blogService.addBlogEntry(newBlog);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteBlog(@PathVariable String id)
    {
        blogService.deleteBlogEntry(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BlogResponse updateBlog(@PathVariable String id, @RequestBody UpdatedBlogEntry updatedBlog)
    {
        return blogService.updateBlogEntry(id, updatedBlog);
    }
}
