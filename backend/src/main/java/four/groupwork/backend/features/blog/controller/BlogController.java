package four.groupwork.backend.features.blog.controller;

import four.groupwork.backend.features.blog.model.BlogEntry;
import four.groupwork.backend.features.blog.model.NewBlog;
import four.groupwork.backend.features.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController
{
    private final BlogService blogService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public BlogEntry addBlog(@RequestBody NewBlog newBlog)
    {
        return blogService.addBlogEntry(newBlog);
    }
}
