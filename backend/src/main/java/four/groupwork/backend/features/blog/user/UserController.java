package four.groupwork.backend.features.blog.user;


import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public String getUser()
    {
        var result = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(result);
        return result.getName();
    }
}
