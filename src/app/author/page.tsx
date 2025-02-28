import NavBar from "@/components/NavBar";
import React from "react";
import CustAvatar from "@/components/CustAvatar";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SocialButtons from "@/components/SocialButtons";
import Stack from "@mui/material/Stack";


export default function Author() {

    let storageName = "Andrew"
    let description = "Oh Yeah, this is very nice"

    return (
        <div>
            <NavBar stickOrNah={"sticky"}/>
            <div className="page-background">
                <h1 id="pageTitle">{storageName}'s Page</h1>
                <br/>
                <br/>


                <Stack direction="row" id="authorName">
                    <div></div>
                    <div>
                        <CustAvatar userName={storageName}/>
                    </div>
                    <div id="authorDescrip">
                        <TextField
                            label="About Me"
                            multiline
                            rows={5}
                            defaultValue={description}
                            variant="filled"
                            sx={{width: 500}}
                        />
                        <SocialButtons/>
                    </div>

                </Stack>


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