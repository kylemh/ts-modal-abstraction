import { ReusableModal } from '~/components/ReusableModal';
import type { ReusableModalProps } from '~/components/ReusableModal';
import { Typography } from '~/components/Typography';
import styled from 'styled-components';

interface ModalBProps extends ReusableModalProps {
  title: string;
}

const ModalBContentContainer = styled(Typography).attrs({ as: 'div' })`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space[40]};
`;

export const ModalB = (props: ModalBProps) => {
  return (
    <ReusableModal closeModal={props.closeModal}>
      <ModalBContentContainer>
        <Typography as="h2" variant="heading2">
          {props.title}
        </Typography>

        {props.children}
      </ModalBContentContainer>
    </ReusableModal>
  );
};
