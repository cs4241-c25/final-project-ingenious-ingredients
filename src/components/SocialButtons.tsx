"use client";
import * as React from 'react';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';
import {redirect} from "next/navigation";

export default function SocialButtons() {

    return (
        <Stack direction="row" spacing={1}>
            <IconButton color="default" > <XIcon onClick={() => window.open('https://x.com/?lang=en', '_blank')}/></IconButton>
            <IconButton color="default" > <FacebookIcon onClick={() => window.open('https://www.facebook.com/', '_blank')}/></IconButton>
            <IconButton  color="default" > <InstagramIcon onClick={() => window.open('https://www.instagram.com/', '_blank')}/></IconButton>
            <IconButton color="default" > <LinkedInIcon onClick={() => window.open('https://www.linkedin.com/jobs?src=go-pa&trk=sem-ga_campid.18853522261_asid.146084015209_crid.732549151385_kw.linkedin_d.c_tid.kwd-296170574619_n.g_mt.e_geo.9001848&mcid=6994434350142418944&cid=&gad_source=1&gclid=EAIaIQobChMIjNvB9pfmiwMVvDEIBR338i9TEAAYASAAEgLz-vD_BwE&gclsrc=aw.ds', '_blank')}/></IconButton>
            <IconButton color="default" > <RedditIcon onClick={() => window.open('https://www.reddit.com/?rdt=61161', '_blank')}/></IconButton>
            <IconButton color="default" > <YouTubeIcon onClick={() => window.open('https://www.youtube.com/', '_blank')} /></IconButton>
        </Stack>
    );
}