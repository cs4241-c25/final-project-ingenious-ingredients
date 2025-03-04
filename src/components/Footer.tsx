import {Box} from "@material-ui/core";

export default function Footer() {
    return (
        <div style={{marginTop: "2rem"}}>
            <Box sx={{
                display: "flex", flexDirection: "column",
                bgcolor: "#F2D6C7", padding: "2rem", borderTop: "8px solid #F06449",
                borderLeft: "0", borderRight: "0",
            }}>
                <div>
                    <p style={{ textAlign: "center", marginLeft: "20%", marginRight: "20%" }}>
                        <strong>Disclaimer: </strong>This cooking website was created for a school project by Worcester
                        Polytechnic Institute students. Many example recipes that are shown on the website are recipes
                        that are featured on the New York Times Cooking website. Credit to the original author is
                        provided for each recipe. The background image with the fruit emojis shown on many pages was
                        created by a friend, Noah Solomon.
                    </p>
                </div>
            </Box>
        </div>
    );
}