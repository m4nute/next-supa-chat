import "../styles/globals.css"
import { useState } from "react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react"
import { AppProps } from "next/app"
import Head from "next/head"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const queryClient = new QueryClient()

  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <QueryClientProvider client={queryClient}>
          <main className="h-screen bg-[#111111] text-white">
            <Component {...pageProps} />
          </main>
        </QueryClientProvider>
      </SessionContextProvider>
    </>
  )
}
export default MyApp
