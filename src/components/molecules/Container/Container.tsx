import cn from 'clsx'
import React, { FC } from 'react'

interface ContainerProps {
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
}

// background dots include
const Container: FC<ContainerProps> = ({
  children,
  className,
  el = 'div',
  clean = false, // Full Width Screen
}) => {
  const rootClassName = cn(className, {
    'font-display mx-auto max-w-7xl px-4 sm:px-6 lg:px-8': !clean,
  })

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any

  return <Component className={rootClassName}>{children}</Component>
}

export default Container

// import cn from 'clsx'

// export function Container({ children, ...props }: any) {
//   return (
//     <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')} {...props}>
//       {children}
//     </div>
//   )
// }
