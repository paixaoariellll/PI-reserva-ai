import { Box } from "@chakra-ui/react";

function Footer() {
    return (
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-y-10 px-32 py-14 bg-gray-1 text-gray-5">
            <Box className="space-y-4 text-xs text-gray-4 text-center">
                <h5 className="font-bold">SOBRE</h5>
                <p className="hover:underline hover:cursor-pointer">Perguntas frequentes</p>
                <p className="hover:underline hover:cursor-pointer">Privacidade</p>
                <p className="hover:underline hover:cursor-pointer">Segurança</p>
                <p className="hover:underline hover:cursor-pointer">Reservar</p>
            </Box>
            <Box className="space-y-4 text-xs text-gray-4 text-center">
                <h5 className="font-bold">COMUNIDADE</h5>
                <p className="hover:underline hover:cursor-pointer">Acessibilidade</p>
                <p className="hover:underline hover:cursor-pointer">Contribuições</p>
                <p className="hover:underline hover:cursor-pointer">Parceiros</p>
            </Box>
        </footer>
    );
}

export default Footer;
