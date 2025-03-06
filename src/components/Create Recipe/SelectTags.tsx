'use client'

import * as React from "react";
import {Chip, TextField, Autocomplete} from "@mui/material";
import GetTags from "../../Get-Post Requests/Tags/getTags";

interface FilterTagsProps {
    onTagsChange: (tags: string[]) => void;
    defaultTags?: string[];
}

export default function FilterTags({onTagsChange, defaultTags = []}: FilterTagsProps) {
    const [selectedTags, setSelectedTags] = React.useState<string[]>(defaultTags);
    const [availableTags, setAvailableTags] = React.useState<string[]>([]);

    React.useEffect(() => {
        async function fetchTags() {
            const tags = await GetTags();
            setAvailableTags(tags);
        }
        fetchTags();
    }, []);

    const handleTagsChange = (event: any, newValue: string[]) => {
        setSelectedTags(newValue);
        onTagsChange(newValue);
    }
    
    return (
        <Autocomplete
            renderInput={(params) => <TextField {...params}/>}
            multiple
            options={availableTags}
            value={selectedTags}
            onChange={handleTagsChange}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip label={option} {...getTagProps({index})} />
                ))
            }
        />
    );
}