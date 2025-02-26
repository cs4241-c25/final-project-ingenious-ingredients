// import { notFound } from 'next/navigation';
// import { GetRecipe } from "@/Get-Post Requests/Recipe/getRecipe";
//
// export async function generateMetadata({ params }) {
//     const recipe = GetRecipe(params.recipe);
//
//     if (!recipe) {
//         notFound();
//     }
//
//     return {
//         title: recipe.name,
//         description: recipe.summary,
//     };
// }
//
// export default function RecipeDetailsPage({ params }) {
//     const recipe = GetRecipe(params.recipe, params.recipe);
//
//     if (!recipe) {
//         notFound();
//     }
//
//     recipe.instructions = recipe.instructions.replace(/\n/g, '<br />');
//
//     return (
//         <>
//             <header>
//                 <div>
//                     <Image
//                         src={`https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/${recipe.image}`}
//                         alt={recipe.name}
//                         fill
//                     />
//                 </div>
//                 <div>
//                     <h1>{recipe.name}</h1>
//                     <p>
//                         by {recipe.creator}
//                     </p>
//                 </div>
//             </header>
//             <main>
//                 <p
//                     dangerouslySetInnerHTML={{
//                         __html: recipe.steps,
//                     }}
//                 ></p>
//             </main>
//         </>
//     );
// }