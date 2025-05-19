import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { Recipe } from '../../../types';

interface RecipePageProps {
  recipe: Recipe | null;
}

export default function RecipePage({ recipe }: RecipePageProps) {
  if (!recipe) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold text-red-600">Recipe not found</h1>
        <Link href="/" className="text-ywllow-400 hover:text-yellow-800 font-medium hover:underline mt-4 inline-flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
          </svg>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link href="/" className="text-yellow-400 hover:text-yellow-800 font-medium hover:underline mb-6 inline-flex items-center">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
        </svg>
        Back to Home
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-80">
          <Image
            src={recipe.image}
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{recipe.title}</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 border-yellow-400 pb-2">Ingredients</h2>
              <ul className="space-y-2 list-disc">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-4 h-4 rounded-full bg-yellow-400 mt-1.5 mr-3"></span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 border-yellow-400 pb-2">Preparation Steps</h2>
              <ol className="space-y-4 list-decimal">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-medium mr-3 shrink-0">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(jsonData);

  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const recipes: Recipe[] = JSON.parse(jsonData);

  const recipe = recipes.find((r) => r.slug === params?.slug) || null;

  return {
    props: {
      recipe,
    },
  };
};