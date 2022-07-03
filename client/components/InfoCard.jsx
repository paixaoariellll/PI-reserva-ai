import Image from "next/image";

import { Box, chakra, Text } from "@chakra-ui/react";

import { FaHeart, FaStar, FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";
const CFaHeart = chakra(FaHeart);
const CFaStar = chakra(FaStar);
const CFaMapMarkerAlt = chakra(FaMapMarkerAlt);
const CFaUserFriends = chakra(FaUserFriends);

function InfoCards({aco_nome, aco_descricao, aco_capacidade, aco_imagem, aco_diaria, aco_nota, aco_cidade, aco_uf}) {
    return (
        <Box className="flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
            <Box className="relative h-100vh w-100vh md:w-80 flex-shrink-0">
                <Image alt={`Foto da acomodação ${aco_nome}`}
                       className="rounded-xl"
                       layout="fill"
                       objectFit="cover"
                       src={`${aco_imagem}`}/>
            </Box>
            <Box className="flex flex-col flex-grow pl-5">
                <Box className="flex justify-between">
                    <Text className="text-2xl lg:text-3xl">{aco_nome}</Text>
                    <CFaHeart aria-label="Ícone de favoritos" className="h-8 text-purple-3 cursor-pointer hover:opacity-90"/>
                </Box>
                <Box className="border-b w-10 pt-2"/>
                <Box>
                    <Text className="pt-2 text-md text-black flex-grow">{aco_descricao}</Text>
                    <Text className="mt-3 text-md">
                        <CFaMapMarkerAlt aria-label="Ícone de localização" 
                                         className="h-8 text-purple-3 mr-3"
                                         display={"inline"}/>
                        {`${aco_cidade} - ${aco_uf}`}
                    </Text>
                    <Text className="mt-3 text-md">
                    <CFaUserFriends aria-label="Ícone de usuários" 
                                    className="h-8 text-purple-3 mr-3"
                                    display={"inline"}/>
                        {aco_capacidade}
                    </Text>
                </Box>
                <Box className="flex justify-between items-end pt-5 cursor-pointer">
                    <Text className="flex items-center">
                        <CFaStar aria-label="ícone de estrela" className="h-8 text-purple-3 mr-3" />{aco_nota}   
                    </Text>
                    <Box>
                        <Text className="text-lg lg:text-2xl font-semibold pb-2">{`R$ ${aco_diaria}`}</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default InfoCards;
