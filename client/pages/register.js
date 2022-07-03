import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import {
  chakra, Flex, Stack, Box, Link, Text,
  FormControl, FormHelperText, FormLabel,
  InputGroup, Input, InputLeftElement, InputRightElement, Checkbox, Button
} from "@chakra-ui/react";

import { FaUserAlt, FaEnvelope, FaLock, FaCheck, FaExclamation } from "react-icons/fa";
import { Functions } from "./utils/Functions";
const CFaUserAlt = chakra(FaUserAlt);
const CFaEnvelope = chakra(FaEnvelope);
const CFaLock = chakra(FaLock);
const CFaCheck = chakra(FaCheck);
const CFaExclamation = chakra(FaExclamation);

function Register() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => {
        setShowPassword(!showPassword);
    }

    const [acceptNews, setAcceptNews] = useState(true);

    function validate(validation) {
        return validation ? (<CFaExclamation mr="0.5em" color="red.400" display="inline"/>) : (<CFaCheck mr="0.5em" color="green.400" display="inline"/>);
    }

    function validatePassword(password) {
        return (
            <ul className="text-black mt-5">
                <li>{validate(password.length < 8)} A senha deve ter no mínimo 8 caracteres.</li>
                <li>{validate(password.search(/[0-9]/i) < 0)} A senha deve ter ao menos um número.</li>
                <li>{validate(password.search(/[^a-zA-Z0-9]/i) < 0)} A senha deve ter ao menos um caractere especial.</li>
                <li>{validate(password.includes(' '))} A senha não pode conter espaços em branco.</li>
            </ul>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(password.length < 8 || password.search(/[0-9]/i) < 0 || password.search(/[^a-zA-Z0-9]/i) < 0 || password.includes(' ')) {
            return;
        }
        await fetch("http://localhost:8080/cli/add", {
            // mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "cli_id": "0",
                "cli_nome": name.toUpperCase().trim(),
                "cli_dt_nasc": "1970-01-01",
                "cli_cpf": "000000000",
                "cli_email": email.trim(),
                "cli_senha": Functions.encrypt512(password),
                "aceite_novidades": acceptNews
            })
        });
        router.push("/");
    }
    
    return (
        <>
            <Head>
                <title>Cadastro</title>
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <Flex alignItems="center"
                  backgroundColor="blackAlpha.100"
                  flexDirection="column"
                  height="100vh"
                  justifyContent="center"
                  width="100wh">
            <Stack alignItems="center"
                   flexDir="column"
                   justifyContent="center"
                   mb="2">
                <Box minW={{base:"90%", md:"468px"}}>
                    <form>
                        <Stack backgroundColor="white"
                               boxShadow="md"
                               p="1rem"
                               spacing={3}>
                        <Text fontSize={"2xl"} textAlign="center">Cadastro</Text>
                        <FormControl>
                            <FormLabel>Nome</FormLabel>
                            <InputGroup>
                                <InputLeftElement children={<CFaUserAlt color="grey" width="20px"/>}
                                                  pointerEvents="none"/>
                                <Input autoFocus={true}
                                       placeholder="Digite o seu nome" 
                                       onChange={(event) => setName(event.target.value)}
                                       required={true}
                                       type="text"/>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel className="mt-1">E-mail</FormLabel>
                            <InputGroup>
                                <InputLeftElement children={<CFaEnvelope color="grey" width="20px"/>}
                                                  pointerEvents="none"/>
                                <Input placeholder="Digite o seu melhor e-mail"
                                       onChange={(event) => setEmail(event.target.value)}
                                       required={true}
                                       type="email"/>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel className="mt-1">Senha</FormLabel>
                            <InputGroup>
                                <InputLeftElement children={<CFaLock color="grey"/>}
                                                  pointerEvents="none"/>
                                <Input placeholder="Digite a sua senha"
                                       onChange={(event) => setPassword(event.target.value)}
                                       required={true}
                                       type={showPassword ? "text" : "password"}/>
                                <InputRightElement className="mr-2" width="4rem">
                                    <Button h="1.5rem" onClick={handleShowClick} size="sm">
                                        {showPassword ? "Ocultar" : "Mostrar"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText>
                                {validatePassword(password)}
                            </FormHelperText>
                        </FormControl>
                        <Checkbox colorScheme={"purple"}
                                  className="mt-2 mb-2"
                                  defaultChecked={true}
                                  onChange={() => setAcceptNews(!acceptNews)}
                                  size="md">
                            Aceito receber novidades
                        </Checkbox>
                        <Button colorScheme={"purple"} 
                                className="hover:cursor-pointer"
                                onClick={(e) => handleSubmit(e)}
                                type="submit" 
                                variant="solid"
                                width="full">
                            Cadastrar conta
                        </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Já possui uma conta?{" "}
                <Link className="hover:cursor-pointer" onClick={() => router.push("/")}>
                    Entre agora!
                </Link>
            </Box>
            </Flex>
        </>
    );
}

export default Register;
