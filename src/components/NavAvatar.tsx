import React from 'react';
import UserNotFound from '@/photos/user_not_found.png';
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";

interface MyComponentProps {
    userName: string,
}
const NavAvatar: React.FC<MyComponentProps> = ({ userName }) => {

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}`,
        };
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{textAlign: 'center', mr: 2, color: "white"}}>Hi, {userName}!</Typography>
            <Avatar id="navImage" {...stringAvatar(userName)} />
        </div>
    )
}
export default NavAvatar;