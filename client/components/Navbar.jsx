import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import {
    Box,
    NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from "@chakra-ui/react";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { pt } from "date-fns/locale";
import { SearchIcon, UsersIcon } from "@heroicons/react/solid";

import LoginModal from "./LoginModal";

function Navbar() {

    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const resetInput = () => {
        setSearchInput("");
        setNoOfGuests(1);
    };

    const router = useRouter();

    const search = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                checkin: startDate.toISOString(),
                checkout: endDate.toISOString(),
                noOfGuests,
            },
        });
    };

    return (
        <nav className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            <Box className="relative flex items-center h-8 cursor-pointer my-auto"
                 onClick={() => router.push("/")}>
                <Image alt="Logotipo da Reserva aí"
                       className="h-full w-full"
                       height="70px"
                       objectFit="contain"
                       objectPosition="left"
                       src="/images/logo.png"
                       width="70px"/>
            </Box>

            <Box className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input className="flex-grow pl-5 bg-transparent outline-none rounded-md text-sm text-gray-4 placeholder-gray-6" 
                       onChange={(event) => setSearchInput(event.target.value)}
                       placeholder="Para onde você vai?"
                       value={searchInput} 
                       type="text"/>
                <SearchIcon className="hidden md:inline-flex h-8 bg-purple-3 text-white rounded-full p-2 cursor-pointer md:mx-2"
                            onClick={() => search()}/>
            </Box>

            <Box className="flex items-right space-x-4 m-2 justify-end text-black">
                <LoginModal/>
            </Box>

            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto">
                    <DateRange locale={pt}
                               minDate= {new Date()}
                               onChange={handleSelect}
                               ranges={[selectionRange]}
                               rangeColors={["#6530d9"]}/>
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold text-black">Número de hóspedes</h2>
                        <UsersIcon className="ml-3 h-5"/>
                        <NumberInput className="m-1 w-20 pl-2 text-md font-semibold text-black" defaultValue={1} min={1} max={99}>
                            <NumberInputField/>
                            <NumberInputStepper>
                                <NumberIncrementStepper/>
                                <NumberDecrementStepper/>
                            </NumberInputStepper>
                        </NumberInput>
                    </div>
                    <div className="flex">
                        <button onClick={resetInput} className="flex-grow font-semibold text-black">Cancelar</button>
                        <button onClick={search} className="flex-grow font-semibold text-purple-3">Buscar</button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
