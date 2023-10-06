package four.groupwork.backend.features.blog.service;


import four.groupwork.backend.features.blog.model.BlogEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepo extends MongoRepository<BlogEntry, String>
{
}
