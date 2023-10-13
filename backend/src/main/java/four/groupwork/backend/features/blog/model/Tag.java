package four.groupwork.backend.features.blog.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document
@Data
@Builder
public class Tag
{
    @MongoId
    private String id;

    private String tagValue;

}
