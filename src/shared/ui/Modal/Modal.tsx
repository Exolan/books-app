import { Modal } from '@mui/material'

export default function MyModal({ isOpen, closeModal, children }: { isOpen: boolean; closeModal: () => void; children: React.ReactNode }) {
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{children}</div>
    </Modal>
  )
}
