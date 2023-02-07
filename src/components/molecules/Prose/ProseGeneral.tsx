import parse from 'html-react-parser'

export default function Prose({ content }: any) {
  // console.log('content: ', content)
  return (
    <>
      {content && (
        <div
        className={`mx-auto mt-6 prose  text-gray-800 ` +
        
          // h1
          `prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:text-gray-800 sm:prose-h1:text-4xl md:prose-h1:text-4xl ` +
          // h2
          `prose-h2:text-3xl prose-h2:font-extrabold prose-h2:tracking-tight prose-h2:text-gray-800 sm:prose-h2:text-3xl ` +
          // p
          `prose-p:text-lg prose-p:font-normal sm:prose-p:text-lg md:prose-p:mt-5 md:prose-p:text-lg prose-p:mx-auto prose-p:mt-3 `
        }
        
        >
          {parse(content)}
        </div>
      )}
    </>
  )
}
