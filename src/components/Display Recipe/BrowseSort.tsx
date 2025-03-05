'use client'

import * as React from "react";
import {Select, MenuItem, FormControl, InputLabel} from "@mui/material";

interface BrowseSortProps {
    onSortChange: (sortBy: string) => void;
    disabled?: boolean;
}

export default function BrowseSort({onSortChange, disabled = false}: BrowseSortProps) {
    const [sortBy, setSortBy] = React.useState<string>("likes");

    const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        setSortBy(value);
        onSortChange(value);
    };

    return (
        <FormControl fullWidth>
            <Select
                labelId="sort-by-label"
                value={sortBy}
                onChange={handleSortChange}
                disabled={disabled}
            >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="likes">Likes</MenuItem>
                <MenuItem value="name">Name</MenuItem>
            </Select>
        </FormControl>
    );
}