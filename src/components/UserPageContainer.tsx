import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  bgColor: string;
  textColor: string;
}

const UserPageContainer = ({ children, bgColor, textColor }: Props) => {
  return (
    <Box borderRadius={10} overflow="hidden" bg={bgColor} color={textColor}>
      {children}
    </Box>
  );
};

export default UserPageContainer;
