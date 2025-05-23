import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 border-b">
      <h1 className="text-xl font-bold">Recipe Viewer</h1>
      <div className="flex items-center space-x-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
}
