export async function PostTest() {
    const newUser = {
        username: "Bill",
        password: "BillBob",
        isPublic: false,
        favoritedRecipes: null
    }

    const body = JSON.stringify(newUser);

    const results = await fetch('http://localhost:3000/postUser', {
        method: 'POST',
        body,
        headers: {"Content-Type": "application/json"}
    })

    console.log(results);
}