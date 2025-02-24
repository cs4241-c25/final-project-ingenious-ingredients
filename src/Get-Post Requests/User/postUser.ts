export async function PostUser(username: string, password: string, isPublic: boolean) : Promise<boolean> {
    const newUser = {
        username: username,
        password: password,
        isPublic: isPublic,
        favoritedRecipes: null
    }

    const body = JSON.stringify(newUser)

    const results = await fetch('http://localhost:3000/postUser', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    const res = await results.text()

    console.log(res)

    return res === "User added to collection";


}