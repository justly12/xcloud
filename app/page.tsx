import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'


export default function Home() {
  return (
    <main className="">
      
      <div className='flex flex-col lg:flex-row items-center  '>
         <div className='space-y-4 p-10 flex flex-col'>
          <h1 className='text-6xl'>Welcome to Xcloud</h1>
          <h2 className='text-2xl'>Your Own Cloud managing Tool</h2>
          <p className='text-sm pb-20'>Want a fast storage & data security services xcloud creates your ideal cloud storage with ease of retrieving you information and keeping it secure from other unknown entities.</p>

          <Link className='flex cursor-pointer items-center px-10 py-5 transition-all bg-gray-300 w-fit
           hover:bg-blue-300 
           dark:bg-white text-black' href="/dashboard">
             <h2>Free 1 Month Trial</h2>
            <ArrowRightIcon className='ml-5'/>
          
          </Link>
         </div>

         <div className='h-full p-10  '>
         <video autoPlay loop muted className='rounded-xl shadow-xl shadow-black dark:shadow-white'>
          <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" type="video/mp4"/>
          Your Browser Does not Support The Video tag
         </video>
          </div>

      </div>
      <div>
      <p className="text-center text-red-500">
        DISCLAIMER: This Video is made for informational and educational purposes only. We do not own or affiliate with Dropbox and/or any of its subsidiaries in any form. Copyright Disclaimer under section 107 of the Copyright Act 1976, allowance is made for “fair use” of this video for education purposes.
      </p>
      
      </div>
    </main>
  )
}
