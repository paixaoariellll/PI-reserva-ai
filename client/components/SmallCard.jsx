import Image from "next/image";

import { Box } from "@chakra-ui/react";

function SmallCard({aco_nome, aco_imagem, aco_cidade, aco_uf}) {
    return (
        <>
            <Box className="flex items-center m-2 mt-5 mb-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
                <Box className="relative h-16 w-16">
                    <Image alt={`Acomodação ${aco_nome}`}
                           className="rounded-lg"
                           layout="fill"
                           src={`${aco_imagem}`}/>
                </Box>
                <Box>
                    <h2>{`${aco_nome}`}</h2>
                    <h3 className="text-gray-500">{`${aco_cidade} - ${aco_uf}`}</h3>
                </Box>
            </Box>
        </>
    );
}

export default SmallCard;
