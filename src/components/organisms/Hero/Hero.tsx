import dynamic from 'next/dynamic'
import Loading from '@/components/molecules/Loading/Loading'

const HeroTextOnly = dynamic(
  () => import('@/components/molecules/Hero/HeroTextOnly')
)
const HeroCenter = dynamic(
  () => import('@/components/molecules/Hero/HeroCenter')
)
const HeroFullScreen = dynamic(
  () => import('@/components/molecules/Hero/HeroFullScreen')
)

export default function Hero({ data, colors }: any) {
  // console.log('hero (received data) ', data)


  return (
    <>
      {!data && <Loading />}
      {data?.style === 'full' && (
        <HeroFullScreen data={data ? data : null} colors={colors} />
      )}
      {data?.style === 'textonly' && (
        <HeroTextOnly data={data ? data : null} colors={colors} />
      )}
      {data?.style === 'center' && (
        <HeroCenter data={data ? data : null} colors={colors} />
      )}
    </>
  )
}
