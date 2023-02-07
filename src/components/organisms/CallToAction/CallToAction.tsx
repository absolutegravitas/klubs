import dynamic from 'next/dynamic'

const CallToActionCenter = dynamic(
  () => import('@/components/molecules/CallToAction/CallToActionCenter')
)
const CallToActionJustified = dynamic(
  () => import('@/components/molecules/CallToAction/CallToActionJustified')
)

export default function CallToAction({ data, colors }: any) {
  // console.log('CallToAction (received data) ', data)

 


  return (
    <>
      {data?.style === 'center' && (
        <CallToActionCenter data={data ? data : null} />
      )}
      {data?.style === 'justified' && (
        <CallToActionJustified data={data ? data : null} />
      )}
    </>
  )
}
