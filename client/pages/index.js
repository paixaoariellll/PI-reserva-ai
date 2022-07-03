import Head from "next/head";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import SmallCard from "../components/SmallCard";

import { Box } from "@chakra-ui/react";

function Home({smallCards}) {
  return (
    <>
      <Head>
        <title>Reserva aí</title>
        <meta name="description" content="Reserve acomodações de forma rápida e fácil. Reserva e vai!" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <Navbar/>
      <main className="relative max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Que tal viajar hoje?</h2>
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-4">
            {smallCards.map(({aco_nome, aco_imagem, aco_cidade, aco_uf}) => ( 
              <SmallCard key={aco_nome}
                         aco_nome={aco_nome}
                         aco_imagem={aco_imagem}
                         aco_cidade={aco_cidade}
                         aco_uf={aco_uf}/>
            ))}
          </Box>
        </section>
      </main>
      <Banner/>
      <Footer/>
    </>
  );
}

export default Home;

export async function getStaticProps() {
  const smallCards = await fetch("http://localhost:8080/aco/see")
  .then(
    (res) => res.json()
  );
  return {
    props: {
      smallCards: smallCards,
    },
  };
}
