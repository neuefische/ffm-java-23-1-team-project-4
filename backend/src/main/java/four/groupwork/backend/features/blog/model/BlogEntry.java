package four.groupwork.backend.features.blog.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogEntry
{
    @MongoId
    private String id;

    private String title;

    private String content;
}
