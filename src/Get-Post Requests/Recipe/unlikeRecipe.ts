export async function UnlikeRecipe(username: string, slug: string){
    const json = {
        username: username,
        slug: slug
    }

    const body = JSON.stringify(json);

    const result = await fetch('http://localhost:3000/unlikeRecipe', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await result.json();
}