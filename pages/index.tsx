import type { NextPage } from 'next'
import Head from 'next/head'
import CountryCapitalGame from "../components/CountryCapitalGame"
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <CountryCapitalGame />
    </div>
  )
}

export default Home
