import {useNavigate} from "react-router-dom";

export default function HomePage()
{
    const navigateTo = useNavigate()

    return (
        <>
            <h1>MyBlogApp</h1>
            <button onClick={()=> navigateTo("/newentry")} >NewEntry</button>
        </>
    )
}