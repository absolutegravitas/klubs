import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('@/components/organisms/Navbar'))
const Footer = dynamic(() => import('@/components/organisms/Footer'))
const Loading = dynamic(() => import('@/components/molecules/Loading/Loading'))

const Layout: React.FC = ({ children, brand }: any) => {
  if (brand) {
    return (
      <>
        <div className="relative">
          <Navbar data={brand ? brand : null} />
          <main>{children}</main>
          <Footer data={brand ? brand : null} />
        </div>
      </>
    )
  }

  return (
    <>
      <Loading />
    </>
  )
}

export default Layout
