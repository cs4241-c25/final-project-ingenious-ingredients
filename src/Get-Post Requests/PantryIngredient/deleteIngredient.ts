export async function DeleteIngredient(name: string, username: string){
    const json = {
        name: name,
        username: username
    }

    const body = JSON.stringify(json);

    const result = await fetch('http://localhost:3000/deleteIngredient', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await result.json();
}