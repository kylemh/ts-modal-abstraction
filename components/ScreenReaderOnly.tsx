import styled from 'styled-components';

/**
 * This component is for rendering text for users of assitive technology. It will be read, but wil be invisible.
 * Not every screen reader is compatible with `aria-label`, so this should be used instead.
 *
 * This needs to be a span, so it can be nested within any element without an HTML validation error.
 *
 * If rendering a button with _only_ an icon attempting to convey meaning, also nest that conveyed meaning (as text) as
 * a child of ScreenReaderOnly.
 *
 * @example
 * <IconButton>
 *   <StarIcon />
 *   <ScreenReaderOnly>Mark as favorite</ScreenReaderOnly>
 * </IconButton>
 */
export const ScreenReaderOnly = styled.span`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
`;
