import { TextField } from '@mui/material'

export default function Input({ label, type, name, required = false }: { label: string; type: string; name: string; required?: boolean }) {
  return <TextField label={label} type={type} name={name} required={required} fullWidth margin='normal' style={{ backgroundColor: 'white' }} />
}
