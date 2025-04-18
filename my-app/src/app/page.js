
'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className='max-w-[19rem] h-[22rem] rounded-[2rem] border-4 border-solid border-white flex justify-around items-center flex-col flex-nowrap mt-10 ml-10 mb-16'>
        <div className='mt-8 w-full flex flex-col flex-nowrap justify-around items-center'>
          <Image
            src={'https://spotiy-playlist-retriever-experimental.vercel.app/_next/static/media/user_img.6db01878.svg'}
            width={160}
            height={160}
            alt='Defualt user image'
          />
          <p className='text-white font-normal text-xl mt-5 mb-2'>Sign In as</p>
          <span className='bold-txt'>{session?.user?.name}</span>
        </div>
        <p className='opacity-70 mt-8 mb-5 underline cursor-pointer' onClick={() => signOut()}>Sign Out</p>
      </div>
    )
  } else {
    return (
      <div className='max-w-[19rem] h-80 rounded-[2rem] border-4 border-solid border-white flex justify-around items-center flex-col flex-nowrap mt-10 ml-10'>
        <Image
          src={'https://spotiy-playlist-retriever-experimental.vercel.app/_next/static/media/sad_emoji.41405e6f.svg'}
          width={160}
          height={150}
          alt='sad emoji'
        />
        <button onClick={() => signIn()} className='shadow-primary w-56 h-16 rounded-xl bg-white border-0 text-black text-3xl active:scale-[0.99]'>Sign In</button>
      </div>
    )
  }
}