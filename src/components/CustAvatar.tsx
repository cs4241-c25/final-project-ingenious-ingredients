import React from 'react';
import UserNotFound from '@/photos/user_not_found.png';
import Avatar from '@mui/material/Avatar';

interface MyComponentProps {
    userName: string,
}
const CustAvatar: React.FC<MyComponentProps> = ({ userName }) => {

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
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
        <div id = "custAvatarOrientation">
            <Avatar id="authorImage" {...stringAvatar(userName)} />
            <h1>{userName}</h1>
        </div>
    )
}
export default CustAvatar;