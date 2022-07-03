import { useState } from "react";
import { useRouter } from "next/router";

import {
    Box, Button, chakra,
    Menu, MenuButton, MenuList, MenuItem,
    useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody, ModalContent, ModalFooter, ModalCloseButton,
    FormControl, FormLabel, 
    Input, InputGroup, InputLeftElement, InputRightElement, Link, Checkbox
} from "@chakra-ui/react";

import { MenuIcon } from "@heroicons/react/solid";
import { FaEnvelope, FaLock } from "react-icons/fa";
const CFaEnvelope = chakra(FaEnvelope);
const CFaLock = chakra(FaLock);

function LoginModal() {

    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = useState("sm");
    const [show, setShow] = useState(false);

    const handleSizeClick = (newSize) => {
        setSize(newSize);
        onOpen();
    };

    const handleClick = (() => {
        setShow(!show);
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Menu>
                <MenuButton aria-label="Menu de opções" 
                            as={MenuIcon} 
                            className="hover:cursor-pointer"
                            icon={<MenuIcon />} 
                            variant="ghost"
                            width="35px"/>
                <MenuList>
                    <MenuItem onClick={() => router.push("/register")}>Cadastrar</MenuItem>
                    <MenuItem key={size} onClick={() => handleSizeClick(size)}>Entrar</MenuItem>
                </MenuList>
            </Menu>
            <Modal isOpen={isOpen} onClose={onClose} size={size}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader className="text-center text-xl">Entrada</ModalHeader>
                    <ModalCloseButton aria-label="Fechar"/>
                    <ModalBody>
                        <FormControl>
                            <FormLabel className="mb-4 mt-4">E-mail</FormLabel>
                            <InputGroup size="md">
                                <InputLeftElement children={<CFaEnvelope color="grey"/>}
                                                  pointerEvents="fill"/>
                                <Input name="email" 
                                       onChange={(event) => setEmail(event.target.value)} 
                                       placeholder="Digite o seu e-mail" 
                                       type="email"/>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel className="mb-4 mt-4">Senha</FormLabel>
                            <InputGroup size="md">
                                <InputLeftElement children={<CFaLock color="grey"/>}
                                                  pointerEvents="none"/>
                                <Input name="password" 
                                       onChange={(event) => setPassword(event.target.value)} 
                                       placeholder="Digite a sua senha"
                                       pr="4.5rem"
                                       type={show ? "text" : "password"}  />
                                <InputRightElement className="mr-2" width="4rem">
                                    <Button h="1.5rem" 
                                            onClick={() => handleClick()} 
                                            size="sm">
                                        {show ? "Ocultar" : "Mostrar"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Box className="mt-3">
                                <Link className="block text-md mb-2 text-black hover:underline hover:text-purple-3 hover:cursor-pointer"
                                      onClick={() => router.push("/")}>
                                    Esqueci minha senha
                                </Link>
                                <Link className="block text-md mb-2 text-black hover:underline hover:text-purple-3 hover:cursor-pointer"
                                      onClick={() => router.push("/register")}>
                                    Não possuo uma conta
                                </Link>
                            </Box>
                            <Checkbox colorScheme={"purple"} className="mt-3" size="md">Manter conexão</Checkbox>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme={"purple"} 
                                className="mr-1 hover:cursor-pointer" 
                                onClick={onClose} 
                                variant="solid">
                            Entrar
                        </Button>
                        <Button className="ml-1 hover:cursor-pointer" onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default LoginModal;
