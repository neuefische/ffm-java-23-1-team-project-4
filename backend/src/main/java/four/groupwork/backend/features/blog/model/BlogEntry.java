package four.groupwork.backend.features.blog.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

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
}
