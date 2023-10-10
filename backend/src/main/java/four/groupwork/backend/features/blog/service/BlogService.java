package four.groupwork.backend.features.blog.service;

import four.groupwork.backend.features.blog.model.BlogEntry;
import four.groupwork.backend.features.blog.model.BlogResponse;
import four.groupwork.backend.features.blog.model.NewBlog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService
{
    private final BlogRepo blogRepo;
    private final BlogMappingService bms;

    public List<BlogResponse> getAllBlogs() {


        return blogRepo.findAll().stream()
                .map(bms::mapBlogToResponse)
                .toList();
    }

    public BlogResponse addBlogEntry(NewBlog newBlog)
    {
        BlogEntry blog = bms.mapNewBlogToBlogEntry(newBlog);
        blogRepo.save(blog);

        return bms.mapBlogToResponse(blog);
    }

    public BlogResponse getBlogEntry(String id)
    {
        BlogEntry blog = blogRepo.findById(id).orElseThrow();
        return bms.mapBlogToResponse(blog);
    }

    public void deleteBlogEntry(String id)
    {
        blogRepo.deleteById(id);
    }

    public BlogResponse updateBlogEntry(String id, NewBlog newBlog)
    {
        BlogEntry blog = blogRepo.findById(id).orElseThrow();

        //Only setting content and title as of now
        blog.setContent(newBlog.getContent());
        blog.setTitle(newBlog.getTitle());
        blogRepo.save(blog);

        return bms.mapBlogToResponse(blog);
    }
}
