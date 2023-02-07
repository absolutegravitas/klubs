import dynamic from 'next/dynamic'

const FeatureMajorLeft = dynamic(
  () => import('@/components/molecules/FeatureMajor/FeatureMajorLeft')
)
const FeatureMajorRight = dynamic(
  () => import('@/components/molecules/FeatureMajor/FeatureMajorRight')
)

export default function FeatureMajor({ data, colors }: any) {
  // console.log('(received data) ', data)

  return (
    <>
      {data && (
        <>
          {data.style === 'left' && (
            <FeatureMajorLeft data={data} colors={colors} />
          )}
          {data.style === 'right' && (
            <FeatureMajorRight data={data} colors={colors} />
          )}
        </>
      )}
    </>
  )
}
