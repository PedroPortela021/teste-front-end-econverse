import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

type InputVariant = 'primary' | 'secondary'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant
}

export function Input({ variant = 'primary', className, ...props }: InputProps) {
  const variantClassName =
    variant === 'secondary' ? styles.inputSecondary : styles.inputPrimary

  const inputClassName = className
    ? `${styles.inputBase} ${variantClassName} ${className}`
    : `${styles.inputBase} ${variantClassName}`

  return <input {...props} className={inputClassName} />
}
