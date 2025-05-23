import { GetStaticProps } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { Recipe } from "../../types";
import RecipeCard from "@/components/RecipeCard";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

interface HomeProps {
  recipes: Recipe[];
}

export default function Home({ recipes }: HomeProps) {
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex justify-between items-center mb-8 pt-6 p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 fixed top-0 left-4 right-4 z-50 mx-auto max-w-7xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Recipe Viewer
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Discover culinary adventures
              </p>
            </div>
          </div>
          <SignedIn>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">
                  Signed In
                </span>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>

        <SignedIn>
          <div className="mt-40 mb-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Welcome to Your Kitchen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our carefully curated collection of recipes from around
              the world
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 pb-16">
            {recipes.map((recipe, index) => (
              <Link key={recipe.slug} href={`/recipes/${recipe.slug}`}>
                <div
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:bg-white transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <RecipeCard recipe={recipe} />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col items-center justify-center min-h-[60vh] mt-40">
            <div className="max-w-md w-full p-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-center space-x-4 mb-8">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce"
                  style={{ animationDelay: "0s" }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div
                  className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div
                  className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Welcome to Recipe Viewer
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Join our community of food lovers and unlock access to hundreds
                of delicious recipes from around the world.
              </p>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-xl font-bold text-white hover:from-orange-600 hover:to-red-700 shadow-lg transform hover:scale-105 transition-all duration-300">
                  <SignInButton mode="modal">
                    <span className="flex items-center justify-center space-x-2">
                      <span>Sign In to Continue</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </SignInButton>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  ✨ Free to join • 🍽️ Hundreds of recipes • 👨‍🍳 Expert tips
                </p>
              </div>
            </div>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "recipes.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const recipes: Recipe[] = JSON.parse(jsonData);

  return {
    props: {
      recipes,
    },
  };
};
