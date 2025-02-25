export async function GetTags(){
    const results = await fetch('http://localhost:3000/getTags', {
        method: 'POST',
        headers: {"Content-Type": "application/json"}
    })

    return await results.json();
}