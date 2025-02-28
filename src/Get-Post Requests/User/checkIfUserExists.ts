export async function CheckIfUserExists(username: string){
    const json = {
        username: username
    }

    const body = JSON.stringify(json);

    const results = await fetch('http://localhost:3000/checkIfUserExists', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    return await results.json();
}