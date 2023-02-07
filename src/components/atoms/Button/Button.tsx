import cn from 'clsx'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react'
import {mergeRefs} from 'react-merge-refs'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'small' | 'medium' | 'large' | 'bare'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
}

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    href,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)

  const rootClassName = cn(

    className
  )

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      href={href}
      {...rest}
    >
      {children}
      {loading && (
       <svg
       className="... mr-3 h-5 w-5 animate-spin"
       viewBox="0 0 24 24"
     ></svg>
      )}
    </Component>
  )
})

export default Button



interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'large' | 'small'
  active?: boolean
  width?: number
  loading?: boolean
  Component?: React.ComponentType
}

const Button2 = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
  const {
    className,
    variant = 'small',
    children,
    active,
    width,
    
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props
  const ref = useRef(null)
  const rootClassName = cn(
    // styles.root,
    // {
    //   [styles.slim]: variant === 'slim',
    //   [styles.loading]: loading,
    //   [styles.disabled]: disabled,
    // },
    className
  )
  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <></>
      )}
    </Component>
  )
})

Button2.displayName = 'Button'

