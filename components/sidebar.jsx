import SideBarContext from 'components/store/sidebar-context'
import config from 'config/config.json'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { useMedia } from 'react-use'
import SideBarSection from './sidebar-section'

function SideBar() {
  const { toc, projectTitle } = config
  const sideBarCtx = useContext(SideBarContext)
  const isWide = useMedia('(min-width: 770px)')

  useEffect(() => {
    if (isWide) {
      sideBarCtx.hideSideBar()
    }
  }, [isWide])

  const sideBarStyle = sideBarCtx.sideBar
    ? 'sidebar w-2/3 z-50 h-screen bg-gray-300 dark:bg-gray-900 border-r overflow-y-auto border-gray-400 dark:border-gray-800 fixed pl-4 pr-6 text-lg top-10 md:hidden'
    : 'sidebar z-50 flex-none md:w-56 xl:w-64 h-screen overflow-y-auto fixed top-10 md:top-14 hidden md:block'

  return (
    <div className={sideBarStyle}>
      <div className='flex flex-col md:mt-10'>
        <Link href='/'>
          <a href='/' aria-label={projectTitle}>
            <div className='flex flex-col items-center'>
              {process.env.NEXT_PUBLIC_USE_LOGO && (
                <img
                  src={`/${process.env.NEXT_PUBLIC_USE_LOGO}`}
                  alt={projectTitle}
                  className='w-24 hidden md:inline-block'
                />
              )}
              <span
                className='hidden text-center md:inline-block font-semibold '
                title={projectTitle}
              >
                {projectTitle}
              </span>
            </div>
          </a>
        </Link>
        <div className='mt-6 pl-2 leading-loose tracking-wide'>
          {toc.map((toc, id) => (
            <SideBarSection toc={toc} key={id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
