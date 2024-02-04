import {
  MouseEventHandler,
  KeyboardEventHandler,
  useCallback,
  ChangeEventHandler,
  useRef,
} from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ImSearch } from "react-icons/im";

import styles from "./style.module.css";

interface SearchTagInputProps {
  handleClick: (text: string) => void;
  setter: (text: string) => void;
  value: string;
}

function SearchTagInput(props: SearchTagInputProps) {
  const { handleClick, setter, value } = props;

  const ref = useRef<HTMLButtonElement>(null);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => setter(e.target.value),
    [setter]
  );

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault();

      handleClick(value);
    },
    [handleClick, value]
  );

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === "Enter") {
        ref.current?.click();
      }
    },
    []
  );

  return (
    <InputGroup className={styles.searchInput}>
      <Input
        variant="outline"
        height="30px"
        onChange={handleChange}
        value={value}
        onKeyDown={handleKeyDown}
        placeholder="press enter or click button to search"
      />
      <InputRightElement height="30px">
        <Button
          ref={ref}
          onClick={onClick}
          borderLeftRadius={0}
          height="30px"
          paddingInline={0}
          variant="ghost"
        >
          <ImSearch size="1em" color="var(--chakra-colors-gray-600)" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchTagInput;
