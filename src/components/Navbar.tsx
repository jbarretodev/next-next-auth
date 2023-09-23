"use client";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
//import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  //const router = useRouter();
  //console.log(session);
  return (
    <nav className='bg-slate-900 flex items-center justify-between px-24 py-4 text-white'>
      <Link href='/'>
        <h1>NextAuth</h1>
      </Link>
      {session?.user ? (
        <div className='flex gap-x-2 items-center'>
          <Link href='/dashboard'>Dashboard</Link>
          <p>
            {session.user.name} {session.user.email}
          </p>
          <img
            src={session.user.image}
            alt={session.user.email}
            className='w-10 h-10 rounded-full cursor-pointer'
          />
          <button
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              });
              //router.push("/");
            }}
            className='bg-yellow-300 px-3 py-2 rounded-md'
          >
            Logout!
          </button>
        </div>
      ) : (
        <div className='flex gap-x-2 items-center'>
          {/* <Link href='/dashboard'>Dashboard</Link> */}
          <button
            className='bg-sky-400 px-3 py-2 rounded-md'
            onClick={() => {
              signIn();
            }}
          >
            Sign In!
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
