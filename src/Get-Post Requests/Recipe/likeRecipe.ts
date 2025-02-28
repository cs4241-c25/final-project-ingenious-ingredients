export async function LikeRecipe(username: string, slug: string){
    const json = {
        username: username,
        slug: slug
    }

    const body = JSON.stringify(json);

    const results = await fetch('http://localhost:3000/likeRecipe', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await results.text() === "Like Recipe and Added to User favorite list";
}