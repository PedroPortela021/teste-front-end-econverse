import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  children: ReactNode
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const variantClassName =
    variant === 'secondary' ? styles.buttonSecondary : styles.buttonPrimary

  const buttonClassName = className
    ? `${styles.buttonBase} ${variantClassName} ${className}`
    : `${styles.buttonBase} ${variantClassName}`

  return (
    <button {...props} className={buttonClassName}>
      {children}
    </button>
  )
}
