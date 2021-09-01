import 'tailwindcss/tailwind.css'
import '../styles/global.css'

import Header from '../components/shared/Header'
import AllContextProvider from '../components/Context'

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-light-blue'>
      <Header />
      <div className='relative mx-auto max-w-md w-screen mt-20 px-8 py-6'>
        <AllContextProvider>
          <Component {...pageProps} />
        </AllContextProvider>
      </div>
    </div>
  )
}

export default MyApp
