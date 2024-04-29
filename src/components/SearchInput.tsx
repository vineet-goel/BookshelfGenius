import {
  Input,
  InputGroup,
  InputLeftElement,
  ColorModeProvider,
} from "@chakra-ui/react";
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
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <ColorModeProvider value="light">
        <InputGroup>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search books..."
            variant="filled"
            width="900px"
            onChange={handleSearch}
          />
        </InputGroup>
      </ColorModeProvider>
    </form>
  );
};

export default SearchInput;
