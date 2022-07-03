import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Button } from "@chakra-ui/react";

function Banner() {

    const router = useRouter();

    return (
        <section className="relative h-[400px] sm:h-[350px] lg:h-[500px] xls:h-[600px] 2xl:h-[700px]">
            <Image alt="Ponte estaiada em São Paulo"
                   layout="fill"
                   objectFit="cover"
                   src="/images/banner.webp"/>
            <Box className="absolute top-1/2 w-full text-center">
                <Button borderRadius={50}
                        className="text-purple-4 bg-white shadow-md rounded-full font-semibold my-3 hover:shadow-xl active:scale-90 transition duration-150"
                        h="3rem" 
                        onClick={() => router.push("/search")}
                        w="8rem">
                    Explorar
                </Button>
            </Box>
        </section>
    );
}

export default Banner;
