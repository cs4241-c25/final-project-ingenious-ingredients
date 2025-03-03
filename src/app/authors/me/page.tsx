"use client";
import NavBar from "@/components/NavBar";
import React from "react";
import CustAvatar from "@/components/CustAvatar";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SocialButtons from "@/components/SocialButtons";
import Stack from "@mui/material/Stack";
import {black} from "next/dist/lib/picocolors";
import {GetUser} from "@/Get-Post Requests/User/getUser";
import GetTags from "@/Get-Post Requests/Tags/getTags";
import {User} from "../../../../Classes/User";
import {useSession} from "next-auth/react";
import {ModifyAboutMe} from "@/Get-Post Requests/User/modifyAboutMe";


export default function Author() {

    const {data: session} = useSession();

    const [user, setUser] = React.useState<User>(null);
    const [storageName, setStorageName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        async function fetchUser() {
            const user = await GetUser(session?.user?.name);
            setUser(user);
            setStorageName(user.username);
            setDescription(user.aboutMe);
            console.log(user.username);
        }
        fetchUser();
    }, []);


    if(user){
        let storageName = user.username;
        let description = user.aboutMe;
        console.log(storageName, description);
    }
    console.log(storageName, description);

    const handleChange = (event, id) => {
        const updatedValue = event.target.value;
        ModifyAboutMe(id, updatedValue);

    };

    // TODO: Probably should divide the saved recipes into recipes made by you, and recipes that you've liked
    return (
        <div>
            <NavBar stickOrNah={"sticky"}/>
            <div className="page-background">
                <h1 id="pageTitle">{storageName}'s Page</h1>
                <br/>
                <br/>
                <div>
                    <div id="authorNameDescrip">
                        <div id="authorName">
                            <CustAvatar userName={storageName}/>
                        </div>
                        <div id="authorDescrip" onBlur={(event) => handleChange(event, storageName)}>
                            <p color ="black ">About Me</p>
                            <TextField

                                multiline
                                rows={5}
                                defaultValue={description}
                                sx={{
                                    width: 650,
                                    backgroundColor: '#F2D6C7',
                                    color: 'black',
                                }}
                            />
                            <SocialButtons/>
                        </div>
                    </div>
                </div>


                <br/>
                <br/>
                <br/>
                <Divider id="divide" orientation="horizontal" flexItem/>
                <h1>My Recipes</h1>


                {/*<RecipeGrid colNum={3}/>*/}
                {/*<BrowseFilterTags/>*/}
            </div>
        </div>
    );
}