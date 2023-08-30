import Layout from '@/components/cards/layout/Layout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster position="top-cent  er"/>
    </Layout>
  )
}
