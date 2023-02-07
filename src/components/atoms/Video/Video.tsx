import ReactPlayer from 'react-player'

export default function Video({ data }: any) {
  return (
    <>
          <div className="w-auto lg:col-span-3 lg:row-span-4">

      <div className="max-w-2xl mx-auto pb-auto lg:max-w-7xl ">
        <div className=" aspect-w-16 aspect-h-9 max-h-max">
          <ReactPlayer
            controls={true}
            className="react-player"
            url={data ? data : "https://www.youtube.com/watch?v=x_rDFa6kZfI"} //  //{JSON.parse(data.video).url} //
            width="100%"
            height="100%"
          />
        </div>
      </div>
      </div>
    </>
  )
}

// import ReactPlayer from 'react-player'

// import React, {
//   FunctionComponent,
//   JSXElementConstructor,
//   CSSProperties,
// } from 'react'
// import cn from 'clsx'

// interface TextProps {
//   variant?: Variant
//   className?: string
//   style?: CSSProperties
//   children?: React.ReactNode | any
//   html?: string
//   onClick?: () => any
// }

// type Variant = 'heading' | 'body' | 'pageHeading' | 'sectionHeading'

// const Text: FunctionComponent<TextProps> = ({
//   style,
//   className = '',
//   variant = 'body',
//   children,
//   html,
//   onClick,
// }) => {
//   const componentsMap: {
//     [P in Variant]: React.ComponentType<any> | string
//   } = {
//     body: 'div',
//     heading: 'h1',
//     pageHeading: 'h1',
//     sectionHeading: 'h2',
//   }

//   const Component:
//     | JSXElementConstructor<any>
//     | React.ReactElement<any>
//     | React.ComponentType<any>
//     | string = componentsMap![variant!]

//   const htmlContentProps = html
//     ? {
//         dangerouslySetInnerHTML: { __html: html },
//       }
//     : {}

//   return (
//     <Component
//       className={cn(
//         // s.root,
//         // {
//         //   [s.body]: variant === 'body',
//         //   [s.heading]: variant === 'heading',
//         //   [s.pageHeading]: variant === 'pageHeading',
//         //   [s.sectionHeading]: variant === 'sectionHeading',
//         // },
//         className
//       )}
//       onClick={onClick}
//       style={style}
//       {...htmlContentProps}
//     >
//       {children}
//     </Component>
//   )
// }

// export default Text
