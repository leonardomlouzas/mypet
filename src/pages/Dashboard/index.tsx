import { useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";

import { CardPetOpen } from "../../components/CardPetOpen";
import { CardFood } from "../../components/Food";
import { CardPetshop } from "../../components/CardPetShop";
import { CardFeed } from "../../components/CardFeed";
import { CardPets } from "../../components/CardPets";
import { CardVaccine } from "../../components/CardVaccine";

export const Dashboard = () => {
  const [openPet, setOpenPet] = useState(false);
  const [petId, setPetId] = useState(0);
  const [petName, setPetName] = useState("");
  const [vaccineOpen, setVaccineOpen] = useState(false);
  const [petShopOpen, setPetShopOpen] = useState(false);
  const [feedOpen, setFeedOpen] = useState(false);
  const [foodOpen, setFoodOpen] = useState(false);
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  const handler = (id: number, name: string) => {
    setOpenPet(true);
    setPetId(id);
    setPetName(name);
    console.log("funcionou");
  };

  const backButton = () => {
    setVaccineOpen(false);
    setPetShopOpen(false);
    setFoodOpen(false);
    setFeedOpen(false);
  };

  return (
    <>
      {openPet ? (
        foodOpen ? (
          <CardFood
            mobile={isLargerThan480}
            petName={petName}
            petId={petId}
            closeFood={backButton}
          />
        ) : petShopOpen ? (
          <CardPetshop
            mobile={isLargerThan480}
            petId={petId}
            petName={petName}
            closePetShop={backButton}
          />
        ) : feedOpen ? (
          <CardFeed
            mobile={isLargerThan480}
            petId={petId}
            petName={petName}
            closeFeed={backButton}
          />
        ) : vaccineOpen ? (
          <CardVaccine
            mobile={isLargerThan480}
            petId={petId}
            petName={petName}
            closeVaccine={backButton}
          />
        ) : openPet ? (
          <CardPetOpen
            petId={petId}
            returnToDesktop={() => setOpenPet(false)}
            enterVaccine={() => setVaccineOpen(true)}
            enterPetShop={() => setPetShopOpen(true)}
            enterFeed={() => setFeedOpen(true)}
            enterFood={() => setFoodOpen(true)}
          />
        ) : (
          <CardPets mobile={!isLargerThan480} open={handler} />
        )
      ) : (
        <CardPets mobile={!isLargerThan480} open={handler} />
      )}
    </>
  );
};
