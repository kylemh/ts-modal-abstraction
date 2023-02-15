import styled, { css } from 'styled-components';
import type { StyledComponentInnerOtherProps, StyledComponentPropsWithRef } from 'styled-components';

export enum TypographyVariantEnum {
  'body' = 'body',
  'small' = 'small',
  'overline' = 'overline',
  'callout' = 'callout',
  'calloutSmall' = 'calloutSmall',
  'heading1' = 'heading1',
  'heading2' = 'heading2',
  'heading3' = 'heading3',
  'heading4' = 'heading4',
  'displayXl' = 'displayXl',
  'displayXxl' = 'displayXxl',
  'displayXxxl' = 'displayXxxl',
}

export type TypographyVariant = keyof typeof TypographyVariantEnum;

const bodyVariantCSS = css`
  font-family: ${({ theme }) => theme.fonts.circularPro};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.circular300};
  line-height: 20px;
`;

const smallVariantCSS = css`
  font-family: ${(props) => props.theme.fonts.circularPro};
  font-size: ${(props) => props.theme.fontSizes[12]};
  font-weight: ${(props) => props.theme.fontWeights.circular500};
  line-height: 16px;
`;

const overlineVariantCSS = css`
  font-family: ${(props) => props.theme.fonts.circularPro};
  font-size: ${(props) => props.theme.fontSizes[12]};
  font-weight: ${(props) => props.theme.fontWeights.circular500};
  line-height: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const calloutVariantCSS = css`
  font-family: ${(props) => props.theme.fonts.mercury};
  font-size: ${(props) => props.theme.fontSizes[15]};
  font-weight: ${(props) => props.theme.fontWeights.mercury400};
  line-height: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const calloutSmallVariantCSS = css`
  font-family: ${(props) => props.theme.fonts.mercury};
  font-size: ${(props) => props.theme.fontSizes[13]};
  font-weight: ${(props) => props.theme.fontWeights.mercury400};
  line-height: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const heading1VariantCSS = css`
  font-family: ${(props) => props.theme.fonts.circularPro};
  font-size: ${(props) => props.theme.fontSizes[28]};
  font-weight: ${(props) => props.theme.fontWeights.circular700};
  line-height: 32px;
`;

const heading2VariantCSS = css`
  font-family: ${(props) => props.theme.fonts.circularPro};
  font-size: ${(props) => props.theme.fontSizes[24]};
  font-weight: ${(props) => props.theme.fontWeights.circular700};
  line-height: 28px;
`;

const heading3VariantCSS = css`
  font-family: ${(props) => props.theme.fonts.circularPro};
  font-size: ${(props) => props.theme.fontSizes[20]};
  font-weight: ${(props) => props.theme.fontWeights.circular700};
  line-height: 24px;
`;

const heading4VariantCSS = css`
  font-family: ${(props) => props.theme.fonts.circularPro};
  font-size: ${(props) => props.theme.fontSizes[16]};
  font-weight: ${(props) => props.theme.fontWeights.circular700};
  line-height: 20px;
`;

const displayXlVariantCSS = css`
  font-family: ${(props) => props.theme.fonts.circularPro};
  font-size: ${(props) => props.theme.fontSizes[36]};
  font-weight: ${(props) => props.theme.fontWeights.circular700};
  line-height: 44px;
`;

const displayXxlVariantCSS = css`
  font-family: ${(props) => props.theme.fonts.circularPro};
  font-size: ${(props) => props.theme.fontSizes[64]};
  font-weight: ${(props) => props.theme.fontWeights.circular700};
  line-height: 72px;
`;

const displayXxxlVariantCSS = css`
  font-family: ${(props) => props.theme.fonts.circularPro};
  font-size: ${(props) => props.theme.fontSizes[84]};
  font-weight: ${(props) => props.theme.fontWeights.circular700};
  line-height: 92px;
`;

/**
 * The `Typography` component should be used for every all text.
 *
 * By default, the underlying HTML is a div, but the polymorphic "as" prop is exposed and should be used.
 *
 * You should never be defining font-size, font-weight, font-family, line-height, nor letter-spacing in any element.
 *
 * *Note*: We purposefully don't expose any CSS properties. You can either extend this component OR - since this component's
 * color is defined as `currentColor` - you can simply define a parent element's color to get Typography colored.
 *
 * @example
 * const BlueBodyText = styled(Typography)`color: blue;`;
 *
 * @example
 * const ContainerWithBlueColor = styled.div`color: blue;`;
 * return <ContainerWithBlueColor><Typography /></ContainerWithBlueColor>;
 *
 * @see https://css-tricks.com/currentcolor/
 */
export const Typography = styled.div<{
  /**
   * @default body
   */
  variant?: TypographyVariant;
}>`
  color: currentColor;
  text-decoration: inherit;

  ${({ variant }) => {
    if (!variant || variant === 'body') return bodyVariantCSS;
    if (variant === 'small') return smallVariantCSS;
    if (variant === 'overline') return overlineVariantCSS;
    if (variant === 'callout') return calloutVariantCSS;
    if (variant === 'calloutSmall') return calloutSmallVariantCSS;
    if (variant === 'heading1') return heading1VariantCSS;
    if (variant === 'heading2') return heading2VariantCSS;
    if (variant === 'heading3') return heading3VariantCSS;
    if (variant === 'heading4') return heading4VariantCSS;
    if (variant === 'displayXl') return displayXlVariantCSS;
    if (variant === 'displayXxl') return displayXxlVariantCSS;
    if (variant === 'displayXxxl') return displayXxxlVariantCSS;
  }}
`;

/**
 * @deprecated USE AT YOUR OWN RISK
 *
 * `styled-components` makes it impossible to create a type that is aware of its own polymorphism.
 *
 * The type as-written is correct for "div" elements. This is VERY important to note when dealing with ref
 * forwarding and extending this type.
 */
export type TypographyProps = StyledComponentPropsWithRef<typeof Typography> &
  StyledComponentInnerOtherProps<typeof Typography>;
