package four.groupwork.backend.features.blog.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.Instant;
import java.util.List;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class BlogEntry
{
    @MongoId
    private String id;

    private String title;

    private String content;
    private List<String> hashtags;

    private Instant timeCreated;
}
