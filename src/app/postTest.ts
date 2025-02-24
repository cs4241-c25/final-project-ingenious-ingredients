import {PostUser} from "../Get-Post Requests/User/postUser";
import {GetUser} from "../Get-Post Requests/User/getUser";
import {ModifyPublic} from "../Get-Post Requests/User/modifyPublic";

export async function PostTest() {
    //console.log(await PostUser("Henry", "password", false));
    //console.log(await GetUser("Henry"));
    await ModifyPublic("Henry", true);
}