import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { Typography } from './Typography';
import type { TypographyVariant } from './Typography';

export type ButtonVariant =
  | `contained-primary-lg`
  | `contained-secondary-lg`
  | `contained-primary-md`
  | `contained-secondary-md`
  | `outline-lg`
  | `outline-md`
  | `text-md`
  | `text-sm`;

export const buttonVariants: ButtonVariant[] = [
  `contained-primary-lg`,
  `contained-secondary-lg`,
  `contained-primary-md`,
  `contained-secondary-md`,
  `outline-lg`,
  `outline-md`,
  `text-md`,
  `text-sm`,
];

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'disabled'> {
  variant: ButtonVariant;

  /**
   * If `true`, the `ContainedButton` instance will have its `width` property set to `"100%"`.
   * If `false`, the width is set to `"auto"`.
   *
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * Instead of `disabled` we have this prop, just for boolean naming consistency.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * @default false
   */
  isLoading?: boolean;

  'data-testid'?: string;
}

export interface BaseButtonProps extends Omit<ButtonProps, 'variant'> {
  typographyVariant?: TypographyVariant;
}

const BaseButton = styled('button')<BaseButtonProps>`
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.transparent};
  cursor: pointer;
  display: flex;
  justify-content: center;
  outline: none;
  width: ${(props) => (props.isFullWidth ? '100%' : 'auto')};

  &:disabled {
    cursor: not-allowed;
  }
`;

/**
 * The `UnstyledButton` component is the root of all button variants.
 *
 * It should never be rendered as-is. It has minimal, "sane default" styling for you to compose a production-ready button.`
 */
export const UnstyledButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ isDisabled = false, isFullWidth = false, typographyVariant = 'callout', ...props }, ref) => {
    // TODO: Implement `isLoading`
    return (
      <BaseButton {...props} disabled={isDisabled} isFullWidth={isFullWidth} ref={ref}>
        <Typography variant={typographyVariant}>{props.children}</Typography>
      </BaseButton>
    );
  },
);

UnstyledButton.displayName = 'UnstyledButton';

/** MARK: Button Sizes */
const largeButton = css`
  padding: 14px 24px;
`;

const mediumButton = css`
  padding: 6px 12px;
`;

/** MARK: Contained Button */
const primaryContainedButton = css`
  background-color: ${(props) => props.theme.colors.customRed60};

  &:hover:not(:active):not(:disabled) {
    background-color: ${(props) => props.theme.colors.customRed70};
  }

  &:active:not(:disabled) {
    background-color: ${(props) => props.theme.colors.customRed80};
  }
`;

const secondaryContainedButton = css`
  background-color: ${(props) => props.theme.colors.customBlue50};

  &:hover:not(:active):not(:disabled) {
    background-color: ${(props) => props.theme.colors.customBlue60};
  }

  &:active:not(:disabled) {
    background-color: ${(props) => props.theme.colors.customBlue90};
  }
`;

const containedButtonStyles = css<ButtonProps>`
  border-radius: 3px;
  color: ${(props) => props.theme.colors.white};

  ${({ variant }) => (variant === 'contained-primary-lg' || variant === 'contained-secondary-lg') && largeButton};
  ${({ variant }) => (variant === 'contained-primary-md' || variant === 'contained-secondary-md') && mediumButton};

  &:focus:not(:active) {
    outline-offset: -4px;
    outline-width: 2px;
    outline-style: solid;
    outline-color: ${(props) => props.theme.colors.white};
  }

  ${({ variant }) =>
    (variant === 'contained-primary-lg' || variant === 'contained-primary-md') && primaryContainedButton};
  ${({ variant }) =>
    (variant === 'contained-secondary-lg' || variant === 'contained-secondary-md') && secondaryContainedButton};

  &:disabled {
    background-color: ${(props) => props.theme.colors.customGray10};
  }
`;

/** MARK: Outline Button */
const outlineButtonStyles = css<ButtonProps>`
  background-color: ${(props) => props.theme.colors.transparent};
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.colors.customBlue50};
  color: ${(props) => props.theme.colors.customBlue50};

  ${({ variant }) => variant === 'outline-lg' && largeButton};
  ${({ variant }) => variant === 'outline-md' && mediumButton};

  &:hover {
    background-color: ${(props) => props.theme.colors.transparent};
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.customBlue50};
  }

  &:focus {
    background-color: ${(props) => props.theme.colors.customBlue50};
    border-color: ${(props) => props.theme.colors.customBlue50};
    color: white;
    outline-width: 0;
  }

  &:disabled {
    color: ${(props) => props.theme.colors.customGray10};
    border-color: ${(props) => props.theme.colors.customGray10};
    background-color: ${(props) => props.theme.colors.transparent};
    border-width: 1px;
    box-shadow: none;
  }
`;

/** MARK: Text Button */
const textButtonStyles = css<ButtonProps>`
  text-decoration: underline 1px;
  background: ${(props) => props.theme.colors.transparent};
  color: ${(props) => props.theme.colors.customBlue50};
  padding-top: 6px;
  padding-bottom: 6px;

  &:hover {
    text-decoration: none;
  }

  &:active {
    text-decoration: underline 2px;
  }

  &:focus {
    text-decoration: underline 2px;
    border-color: ${(props) => props.theme.colors.transparent};
    color: ${(props) => props.theme.colors.customBlue90};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.customGray10};
    text-decoration: underline 1px;
  }
`;

const StyledButton = styled(UnstyledButton)<ButtonProps>`
  ${({ variant }) =>
    (variant === 'contained-primary-lg' ||
      variant === 'contained-primary-md' ||
      variant === 'contained-secondary-lg' ||
      variant === 'contained-secondary-md') &&
    containedButtonStyles};

  ${({ variant }) => (variant === 'outline-lg' || variant === 'outline-md') && outlineButtonStyles};
  ${({ variant }) => (variant === 'text-md' || variant === 'text-sm') && textButtonStyles};
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // TODO: Implement `isLoading`
  return (
    <StyledButton {...props} typographyVariant={props.variant === 'text-sm' ? 'calloutSmall' : 'callout'} ref={ref} />
  );
});

Button.displayName = 'Button';
