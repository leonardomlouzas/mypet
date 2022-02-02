import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

import BgImage from "../../assets/background.png";
import { Header } from "../../components/Header";

interface useParamsData{
    type: string;
}


export const Description = () => {
    const { type } = useParams() as useParamsData;
    const history = useHistory();

    useEffect(() => {
        switch(type){
            case "vaccine":

            break;
            case "petShop":

            break;
            case "food":

            break;
            case "stock":

            break;
            default:
            break;
        }
    }, [type, history]);


    return (
        <Box bg="blue.200" bgImage={BgImage} w="100vw" h="100vh">
            <Header />
            {(type === "vaccine")? (
                <Flex>Vacinas</Flex>
            ): (type === "petShop")? (
                <Flex>Pet Shop</Flex>
            ): (type === "food")? (
                <Flex>Alimentação</Flex>
            ): (type === "stock")? (
                <Flex>Estoque</Flex>
            ): (
                <Redirect to="/dashboard" /> 
            )}
        </Box>
    );
};