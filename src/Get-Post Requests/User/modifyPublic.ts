export async function ModifyPublic(username: string, isPublic: boolean) {
    const json = {
        username: username,
        isPublic: isPublic
    }

    const body = JSON.stringify(json);

    const results = await fetch('http://localhost:3000/modifyPublicStatus', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    console.log(await results.text());
}