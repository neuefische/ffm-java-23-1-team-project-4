package four.groupwork.backend.features.blog.service;

import four.groupwork.backend.features.blog.model.BlogEntry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class BlogServiceIntegrationTest
{
    @Autowired
    MockMvc mockMvc;

    @Autowired
    BlogRepo blogRepo;

    @BeforeEach
    void setUp()
    {
        LocalDateTime localDateTime = LocalDateTime.of(2020, 1, 1, 12, 0, 0);
        Instant fixedInstant = localDateTime.toInstant(ZoneOffset.UTC);

        BlogEntry blogEntry = new BlogEntry( "id1", "title", "content",
                List.of("tag1", "tag2"),
                fixedInstant
        );
        blogRepo.save(blogEntry);
    }

    @Test
    @DirtiesContext
    void getAllBlogTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/blogs"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                            {
                                "id": "id1",
                                "title": "title",
                                "content": "content",
                                "hashtags": [
                                    "tag1",
                                    "tag2"
                                ],
                                "timeCreated": "2020-01-01T12:00:00Z"
                            }
                        ]
                        """));
    }

    @Test
    @DirtiesContext
    void getBlogById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/blogs/id1"))
                .andExpect(status().isOk())
                .andExpect(content().json(""" 
                            {
                                "id": "id1",
                                "title": "title",
                                "content": "content",
                                "hashtags": [
                                    "tag1",
                                    "tag2"
                                ],
                                "timeCreated": "2020-01-01T12:00:00Z"
                            }
                        """));
    }

    @Test
    @DirtiesContext
    void testDeleteEndpoint() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/blogs/id1"))
                .andExpect(status().isOk());

    }

    @Test
    @DirtiesContext
    void postAddBlog() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/blogs")
                .contentType("application/json")
                .content("""
                    {
                        "title": "title",
                        "content": "content",
                        "hashtags": [
                            "tag1",
                            "tag2"
                        ]
                    }"""))

                .andExpect(status().isCreated())
                .andExpect(content().json(""" 
                            {
                                "title": "title",
                                "content": "content",
                                "hashtags": [
                                    "tag1",
                                    "tag2"
                                ]
                            }"""))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.timeCreated").exists());
    }

    @Test
    @DirtiesContext
    void putUpdateBlog() throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/blogs/id1")
                        .contentType("application/json")
                        .content("""
                            {
                                "id": "id1",
                                "title": "title",
                                "content": "content",
                                "hashtags": [
                                    "tag1",
                                    "tag2"
                                ],
                                "timeCreated": "2020-01-01T12:00:00Z"
                            }
                        """))
                .andExpect(status().isOk())
                .andExpect(content().json(""" 
                             {
                                "id": "id1",
                                "title": "title",
                                "content": "content",
                                "hashtags": [
                                    "tag1",
                                    "tag2"
                                ],
                                "timeCreated": "2020-01-01T12:00:00Z"
                            }
                        """));
    }
}
