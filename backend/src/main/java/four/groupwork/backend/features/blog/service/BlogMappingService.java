package four.groupwork.backend.features.blog.service;

import four.groupwork.backend.features.blog.model.BlogEntry;
import four.groupwork.backend.features.blog.model.BlogResponse;
import four.groupwork.backend.features.blog.model.NewBlog;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class BlogMappingService {

    public BlogResponse mapBlogToResponse(BlogEntry blogEntry) {
        return BlogResponse.builder()
                .id(blogEntry.getId())
                .title(blogEntry.getTitle())
                .content(blogEntry.getContent())
                .hashtags(blogEntry.getHashtags())
                .timeCreated(blogEntry.getTimeCreated().toString())
                .build();
    }

    public BlogEntry mapNewBlogToBlogEntry(NewBlog newBlog){
        return BlogEntry.builder()
                .content(newBlog.getContent())
                .title(newBlog.getTitle())
                .hashtags(newBlog.getHashtags())
                .timeCreated(Instant.now())
                .build();
    }
}
