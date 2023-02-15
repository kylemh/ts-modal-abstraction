import { ReusableModal } from '~/components/ReusableModal';
import type { ReusableModalProps } from '~/components/ReusableModal';
import { Typography } from '~/components/Typography';

export const ModalA = ({ closeModal }: Omit<ReusableModalProps, 'children'>) => {
  return (
    <ReusableModal closeModal={closeModal}>
      <Typography>Modal A is right here!</Typography>
    </ReusableModal>
  );
};
