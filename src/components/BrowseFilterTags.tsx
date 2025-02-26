'use client' //Remove once we deploy for now we need it since im running everything on the client side

import * as React from "react";
import {Chip, TextField, Autocomplete} from "@mui/material";
import GetTags from "../Get-Post Requests/Tags/getTags";

const availableTags = GetTags();

export default function FilterTags() {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [availableTags, setAvailableTags] = React.useState<string[]>([]);

    React.useEffect(() => {
        async function fetchTags() {
            const tags = await GetTags();
            setAvailableTags(tags);
        }
        fetchTags();
    }, []);


    return (
        <Autocomplete
            renderInput={(params) => <TextField {...params} label="Filter by tags"/>}
            multiple
            options={availableTags}
            value={selectedTags}
            onChange={(event, newValue) => setSelectedTags(newValue)}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip label={option} {...getTagProps({index})} />
                ))
            }
        />
    );
}