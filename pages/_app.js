import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import '../styles/nprogress.css'; 

import Header from '../components/shared/Header'
import AllContextProvider from '../components/Context'
import Router from 'next/router';
import NProgress from 'nprogress'

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <AllContextProvider>
      <div className='bg-light-blue'>
        <Header />
        <div className='relative mx-auto max-w-md w-screen mt-20 px-8 py-6'>
            <Component {...pageProps} />
        </div>
      </div>
    </AllContextProvider>
  )
}

export default MyApp
