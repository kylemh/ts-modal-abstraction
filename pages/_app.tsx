import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ModalProvider } from '~/hooks/useModal';
import { theme } from '~/theme';
import '~/css/fonts.css';

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    // smoothing helps render fonts properly
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: antialiased;
    overflow-x: hidden;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  p {
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 10px;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div id="_app">
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
