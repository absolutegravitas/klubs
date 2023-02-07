import { Container, ProseGeneral } from '@/components/molecules'

export default function BasicContent({ data, colors }: any) {
  // console.log('(received data) ', data)

  return (
    <>
      <div className="relative py-16 overflow-hidden bg-white">
        <Container className="tracking-tight text-slate-700">
          {data?.content && <ProseGeneral content={data?.content} />}
        </Container>
      </div>
    </>
  )
}
