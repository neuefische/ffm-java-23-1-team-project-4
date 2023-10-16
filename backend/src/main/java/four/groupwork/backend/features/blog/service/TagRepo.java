package four.groupwork.backend.features.blog.service;

import four.groupwork.backend.features.blog.model.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TagRepo extends MongoRepository<Tag, String>
{
}
