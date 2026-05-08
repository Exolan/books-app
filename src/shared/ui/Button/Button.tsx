import { ButtonBase } from '@mui/material'

export default function Button({
  children,
  onClick,
  type = 'button'
}: {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}) {
  return (
    <ButtonBase type={type} onClick={onClick}>
      {children}
    </ButtonBase>
  )
}
