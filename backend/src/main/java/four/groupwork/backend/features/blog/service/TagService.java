package four.groupwork.backend.features.blog.service;

import four.groupwork.backend.features.blog.model.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService
{
    private final TagRepo tagRepo;

    public List<Tag> getAllTags()
    {
        return tagRepo.findAll();
    }


    public void addTags(List<String> hashtags)
    {
        List<String> filterTags = filterExistingTags(hashtags);

        filterTags.stream()
                .map(hashtag -> Tag.builder()
                        .tagValue(hashtag)
                        .build())
                .forEach(tagRepo::save);
    }

    private List<String> filterExistingTags(List<String> hashtags)
    {
        Set<String> listDb = getAllTags().stream()
                .map(Tag::getTagValue)
                .collect(Collectors.toSet());

        return hashtags.stream().filter(x -> !listDb.contains(x)).toList();
    }
}
