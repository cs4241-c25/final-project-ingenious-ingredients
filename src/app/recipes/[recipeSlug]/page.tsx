// import { notFound } from 'next/navigation';
//
// // import { getRecipe } from ...
//
// export async function generateMetadata({ params }) {
//     const recipe = getRecipe(params.recipeSlug);
//
//     if (!recipe) {
//         notFound();
//     }
//
//     return {
//         title: recipe.title,
//         description: recipe.summary,
//     };
// }
//
// export default function RecipeDetailsPage({ params }) {
//     const recipe = getRecipe(params.mealRecipe);
//
//     if (!recipe) {
//         notFound();
//     }
//
//     recipe.instructions = recipe.instructions.replace(/\n/g, '<br />');
//
//     return (
//         <>
//             <header className={classes.header}>
//                 <div className={classes.image}>
//                     <Image
//                         src={`https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/${meal.image}`}
//                         alt={recipe.title}
//                         fill
//                     />
//                 </div>
//                 <div className={classes.headerText}>
//                     <h1>{recipe.title}</h1>
//                     <p className={classes.creator}>
//                         by <a href={`mailto:${recipe.creator_email}`}>{recipe.creator}</a>
//                     </p>
//                     <p className={classes.summary}>{recipe.summary}</p>
//                 </div>
//             </header>
//             <main>
//                 <p
//                     className={classes.instructions}
//                     dangerouslySetInnerHTML={{
//                         __html: recipe.instructions,
//                     }}
//                 ></p>
//             </main>
//         </>
//     );
// }