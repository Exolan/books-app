import { ButtonBase } from '@mui/material'

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled = false
}: {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}) {
  return (
    <ButtonBase type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonBase>
  )
}
