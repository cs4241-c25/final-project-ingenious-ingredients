export async function DeleteRecipe(slug: string): Promise<boolean> {

    const json = { slug: slug };
    const body = JSON.stringify(json);

    const results = await fetch('http://localhost:3000/deleteRecipe', {
        method: 'DELETE',
        body,
        headers: { "Content-Type": "application/json" }
    });

    if (!results.ok) {
        console.log(`Deleting recipe with slug: ${slug}`);
        console.error(`Error deleting recipe: ${results.statusText}`);
        return false;
    }

    const response = await results.json();
    if (response.error) {
        console.error(response.error);
        return false;
    }

    return true;
}