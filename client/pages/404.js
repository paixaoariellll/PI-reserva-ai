import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { Box, Button, Link, Text } from "@chakra-ui/react";

function responseHTTP404() {
    
    const router = useRouter();

    return (
        <section>
            <Head>
                <title>Página não encontrada</title>
                <link rel="icon" href="/images/logo.png"/>
            </Head>
            <Box className="h-screen w-screen flex flex-wrap justify-center content-center items-center absolute z-0">
                <Image alt="Página não encontrada"
                       height={200}
                       src="/images/404.png" 
                       width={200}/>
            </Box>
            <Box className="h-screen w-screen flex flex-wrap justify-center content-end md:content-center items-end md:items-center relative z-10">
                <Box className="p-6 text-center">
                    <h1 className="uppercase text-xl lg:text-5xl font-black">404 - Página não encontrada! 🚀</h1>
                    <Text className="mt-3 uppercase text-sm lg:text-base text-gray-900">Esperamos ter acomodações em Marte em breve! Até lá, sugerimos uma visita a alguma acomodação terráquea!</Text>
                    <Link href="#" onClick={() => router.push("/")}>
                        <Button colorScheme={"purple"} className="mt-5">Voltar para a página inicial</Button>
                    </Link>
                </Box>
            </Box>
        </section>
    );
}

export default responseHTTP404;
