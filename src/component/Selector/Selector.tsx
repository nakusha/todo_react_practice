import { useEffect, useRef, useState } from "react";
import * as S from "./Selector.style";

type Option<T> = {
  label: string;
  value: T;
};
type Props<T> = {
  options: Option<T>[];
  onChange: (value: T) => void;
  defaultValue?: T;
  placeholder?: string;
};
const Selector = <T,>({
  options,
  onChange,
  defaultValue,
  placeholder,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option<T> | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultValue !== undefined) {
      const option = options.find((item) => item.value === defaultValue);
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [defaultValue, options]);

  const openSelector = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const selectOption = (option: Option<T>, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <S.SelectContainer ref={selectorRef} onClick={openSelector}>
      <S.Selector $selectedOption={selectedOption}>
        {selectedOption ? selectedOption.label : placeholder}
      </S.Selector>
      {isOpen && (
        <S.OptionContainer>
          {options.map((option, index) => (
            <S.Option key={index} onClick={(e) => selectOption(option, e)}>
              {option.label}
            </S.Option>
          ))}
        </S.OptionContainer>
      )}
    </S.SelectContainer>
  );
};

export default Selector;
