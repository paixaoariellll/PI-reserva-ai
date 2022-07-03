import Head from "next/head";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";

import { format } from "date-fns";

import { Box, Button } from "@chakra-ui/react";

function Search({searchResults}) {

    const router = useRouter();

    const {location, checkin, checkout, noOfGuests} = router.query;

    if (checkin !== undefined && checkout !== undefined) {
        const formattedStartDate = format(new Date(checkin), "dd MMMM yy");
        const formattedEndDate = format(new Date(checkout), "dd MMMM yy");
        const range = `${formattedStartDate} - ${formattedEndDate}`;
    }

    return (
        <>
            <Head>
                <title>Resultado das buscas</title>
                <link rel="icon" href="/images/logo.png"/>
            </Head>
            <Navbar/>
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <h1 className="text-3xl font-semibold mt-2 mb-6">{location === undefined ? "Explorar" : `Estadias em ${location}`}</h1>
                    <Box className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <Button borderRadius={50}
                                className="px-3 py-2 border cursor-pointer hover-shadow-lg active:scale-95 active:bg-gray-1 transition transform duration-100-ease-out">Avaliação</Button>
                        <Button borderRadius={50}
                                className="px-3 py-2 cursor-pointer hover-shadow-lg active:scale-95 active:bg-gray-1 transition transform duration-100-ease-out">Popularidade</Button>
                        <Button borderRadius={50}
                                className="px-3 py-2 border cursor-pointer hover-shadow-lg active:scale-95 active:bg-gray-1 transition transform duration-100-ease-out">Preço</Button>
                        <Button borderRadius={50}
                                className="px-3 py-2 border cursor-pointer hover-shadow-lg active:scale-95 active:bg-gray-1 transition transform duration-100-ease-out">Proximidade</Button>
                    </Box>
                    <Box className="flex flex-col">
                        {searchResults.map(({aco_nome, aco_descricao, aco_capacidade, aco_imagem, aco_diaria, aco_nota, aco_cidade, aco_uf}) => (
                            <InfoCard key={aco_nome}
                                      aco_nome={aco_nome}
                                      aco_descricao={aco_descricao}
                                      aco_capacidade={aco_capacidade}
                                      aco_imagem={aco_imagem}
                                      aco_diaria={aco_diaria}
                                      aco_nota={aco_nota}
                                      aco_cidade={aco_cidade}
                                      aco_uf={aco_uf}/>
                        ))}
                    </Box>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Search;

export async function getServerSideProps() {
    const searchResults = await fetch("http://localhost:8080/aco/see")
    .then(
        (res) => res.json()
    );
    return {
        props: {
            searchResults: searchResults,
        },
    };
}
