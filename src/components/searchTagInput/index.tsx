import {
  MouseEventHandler,
  KeyboardEventHandler,
  useCallback,
  ChangeEventHandler,
  useRef,
} from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ImSearch } from "react-icons/im";
import cs from "classnames";

import styles from "./style.module.css";

interface SearchTagInputProps {
  onSearchTag: (text: string) => void;
  setter: (text: string) => void;
  value: string;
  isLg: boolean;
}

function SearchTagInput(props: SearchTagInputProps) {
  const { onSearchTag, setter, value, isLg } = props;

  const ref = useRef<HTMLButtonElement>(null);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const { value } = e.target;

      if (value === "") onSearchTag(value);

      setter(value);
    },
    [setter, onSearchTag]
  );

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault();

      onSearchTag(value);
    },
    [onSearchTag, value]
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
    <InputGroup
      className={cs({ [styles.searchInput]: !isLg, [styles.lgCols]: isLg })}
    >
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
