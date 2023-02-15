import { Cross2Icon } from '@radix-ui/react-icons';
import styled from 'styled-components';
import { Button, ButtonProps } from '~/components/Button';
import { ScreenReaderOnly } from '~/components/ScreenReaderOnly';
import { motion, useReducedMotion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { Typography } from '~/components/Typography';

const getOverlayMotionStyles = (
  shouldReduceMotion: boolean,
): Pick<MotionProps, 'initial' | 'animate' | 'exit' | 'transition'> => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: shouldReduceMotion ? 0 : 0.15,
    type: 'tween',
  },
});

const getContentMotionStyles = (shouldReduceMotion: boolean): Pick<MotionProps, 'initial' | 'animate' | 'exit'> => ({
  initial: {
    opacity: 0,
    translateY: '50px',
  },
  animate: {
    opacity: 1,
    translateY: '0px',
    transition: {
      delay: 0.2,
      duration: shouldReduceMotion ? 0 : 0.2,
      type: 'tween',
    },
  },
  exit: { opacity: 0, translateY: '50px' },
});

const StyledModalOverlay = styled.div`
  position: fixed;
  background-color: hsla(0, 0%, 10%, 0.9);
  inset: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
`;
const ModalOverlay = motion(StyledModalOverlay);

const StyledModalContent = styled(Typography)`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radii.small};
  box-shadow: ${(props) => props.theme.shadows.dp12};
  position: relative;
  padding: ${(props) => props.theme.space[60]};
  padding-bottom: ${(props) => props.theme.space[50]};
  margin: 10vw auto 0;
  min-height: 100px;
  width: 400px;
  max-width: 96vw;

  &:focus {
    outline: none;
  }
`;
const ModalContent = motion(StyledModalContent);

const PositionedButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const ModalCloseButton = ({ onClick }: Pick<ButtonProps, 'onClick'>) => (
  <PositionedButton variant="outline-md" onClick={onClick}>
    <Cross2Icon height="24" width="24" style={{ paddingTop: '4px' }} />
    <ScreenReaderOnly>Close Modal</ScreenReaderOnly>
  </PositionedButton>
);

export interface ReusableModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export const ReusableModal = ({ children, closeModal }: ReusableModalProps) => {
  const shouldUseReducedMotion = useReducedMotion();
  const overlayMotionStyles = getOverlayMotionStyles(!!shouldUseReducedMotion);
  const contentMotionStyles = getContentMotionStyles(!!shouldUseReducedMotion);

  return (
    <ModalOverlay {...overlayMotionStyles}>
      <ModalContent {...contentMotionStyles}>
        <ModalCloseButton onClick={closeModal} />

        {children}
      </ModalContent>
    </ModalOverlay>
  );
};
