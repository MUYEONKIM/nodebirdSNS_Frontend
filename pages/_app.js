import { globalStyles } from '../styles/global.style';
import Layout from '../src/layout';
import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Global styles={globalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}
