'use client'
import './globals.css'
import { Inter, Merriweather, Nunito_Sans } from 'next/font/google'
import { Providers } from './providers'
import Head from 'next/head'
import { useUser } from '@/context/userContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })
const nunitoSans = Nunito_Sans({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

export const metadata = {
    title: 'Bongobashi a citizen connect app',
    description: 'Made by Krishnarjun, Rupsha, Kingshuk and Mukesh',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // const { user } = useUser()
    // const router = useRouter()
    // useEffect(() => {
    //     setTimeout(() => {
    //         if (!user) router.push('/auth/login')
    //     }, 3000)
    // }, [user])

    return (
        <html lang="en">
            <Head>
                <link href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css" rel="stylesheet" />{' '}
            </Head>
            <body className={nunitoSans.className}>
                {' '}
                <Providers>{children} </Providers>
            </body>
        </html>
    )
}
