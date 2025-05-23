import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { Recipe } from "../../../types";
import { motion } from "framer-motion";

interface RecipePageProps {
  recipe: Recipe | null;
}

export default function RecipePage({ recipe }: RecipePageProps) {
  if (!recipe) {
    return (
      <div className="container mx-auto p-4 max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-6">
          Recipe not found
        </h1>
        <Link
          href="/"
          className="text-yellow-400 hover:text-yellow-800 font-medium hover:underline inline-flex items-center transition-all"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div
          className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-br from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
      <motion.div
        className="container mx-auto p-4 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/"
          className="text-yellow-400 hover:text-yellow-800 font-medium hover:underline mb-6 inline-flex items-center transition-all"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="relative h-80 group overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="p-6">
            <motion.h1
              className="text-4xl font-extrabold mb-6 text-gray-800"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {recipe.title}
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.section
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 border-yellow-400 pb-2">
                  Ingredients
                </h2>
                <ul className="space-y-3 list-disc">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start transition-all">
                      <span className="inline-block w-4 h-4 rounded-full bg-yellow-400 mt-1.5 mr-3"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b-2 border-yellow-400 pb-2">
                  Preparation Steps
                </h2>
                <ol className="space-y-4 list-decimal">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex items-start transition-all">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-600 text-white font-medium mr-3">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes: Recipe[] = JSON.parse(jsonData);

  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes: Recipe[] = JSON.parse(jsonData);

  const recipe = recipes.find((r) => r.slug === params?.slug) || null;

  return {
    props: { recipe },
  };
};
