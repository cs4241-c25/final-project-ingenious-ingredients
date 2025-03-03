'use client' //Remove once we deploy for now we need it since im running everything on the client side

import * as React from "react";
import {Chip, TextField, Autocomplete} from "@mui/material";
import GetTags from "../../Get-Post Requests/Tags/getTags";

interface FilterTagsProps {
    onTagsChange: (tags: string[]) => void;
    disabled?: boolean;
}

export default function FilterTags({onTagsChange}: FilterTagsProps, disabled = false) {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
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
            renderInput={(params) => <TextField {...params} label="Filter by tags"/>}
            multiple
            options={availableTags}
            value={selectedTags}
            onChange={handleTagsChange}
            disabled={disabled}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const tagProps = getTagProps({ index });
                    return <Chip key={index} label={option} {...tagProps} />;
                })
            }
        />
    );
}