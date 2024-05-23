import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (ref.current) {
      onSearch(ref.current.value);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch color="#543310" />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search books..."
          variant="filled"
          width="900px"
          bg="#F8F4E1"
          color="#000"
          _placeholder={{ color: "#74512D" }}
          _hover={{
            bg: "#F8F4E1", // background color on hover
            color: "#000", // text color on hover
          }}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
