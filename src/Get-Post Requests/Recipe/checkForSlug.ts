export async function CheckForSlug(slug: string){
    const json = {
        slug: slug
    }

    const body = JSON.stringify(json);

    const results = await fetch('http://localhost:3000/checkForSlug', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await results.json();
}