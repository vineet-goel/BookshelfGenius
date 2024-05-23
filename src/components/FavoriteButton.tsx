import React from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (event: React.MouseEvent) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
}) => {
  const buttonBgColor = useColorModeValue("#AF8F6F", "#74512D");
  const buttonTextColor = useColorModeValue("#543310", "#F8F4E1");

  return (
    <Button
      onClick={onClick}
      bg={buttonBgColor}
      color={buttonTextColor}
      borderRadius="50%"
      p={2}
      _hover={{ bg: buttonBgColor, opacity: 0.8 }}
      _active={{ bg: buttonBgColor, opacity: 0.6 }}
    >
      <FiHeart size={24} color={isFavorite ? "red" : "currentColor"} />
    </Button>
  );
};

export default FavoriteButton;
