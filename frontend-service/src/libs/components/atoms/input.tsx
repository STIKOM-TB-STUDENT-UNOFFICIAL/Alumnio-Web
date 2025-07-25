import {
  useRef,
  useState,
  type DetailedHTMLProps,
  type ElementType,
  type InputHTMLAttributes,
  type ReactNode,
  useEffect,
} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export type TCustomInput = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type"
> & {
  label?: string;
  type: "text" | "password" | "email" | "date" | "checkbox" | "textarea";
  Icon?: ElementType;
  value?: string;
  onChange?: (e: { target: { name?: string; value: string } }) => void;
};

export function Input({ type = "text", className = "", Icon, ...rest }: TCustomInput): ReactNode {
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (type === "textarea" && divRef.current && rest.value !== undefined) {
      if (divRef.current.innerText !== rest.value) {
        divRef.current.innerText = rest.value;
      }
    }
  }, [rest.value, type]);

  const handleTextareaInput = () => {
    if (divRef.current && rest.onChange) {
      const value = divRef.current.innerText;
      rest.onChange({
        target: {
          name: rest.name,
          value: value,
        },
      });
    }
  };

  return (
    <div className={`${className}`}>
      {rest.label && (
        <h6
          className="cursor-pointer font-semibold"
          onClick={() => {
            if (type === "textarea") {
              divRef.current?.focus();
            } else {
              inputRef.current?.focus();
            }
          }}
        >
          {rest.label}
        </h6>
      )}
      <div
        className={`flex w-full bg-white dark:bg-[#3b3b45] border 
          border-blue-50 dark:border-[#313139] rounded-md focus-within:ring 
          focus-within:ring-blue-400 dark:focus-within:ring dark:focus-within:ring-[#dfdfe4]`}
      >
        {Icon && (
          <div className="flex items-center justify-center px-2">
            <Icon />
          </div>
        )}

        {type === "textarea" ? (
          <div className="flex-1">
            <input
              type="hidden"
              name={rest.name}
              value={rest.value}
              readOnly
            />

            <div
              ref={divRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleTextareaInput}
              className="outline-none w-full px-2 py-1 rounded-md min-h-[2.5rem] whitespace-pre-wrap"
            />
          </div>
        ) : (
          <input
            type={type === "password" ? (show ? "text" : type) : type}
            ref={inputRef}
            name={rest.name}
            className="outline-none w-full px-2 py-1 rounded-md"
            placeholder={rest.placeholder}
            onChange={rest.onChange}
            value={rest.value}
            {...rest}
          />
        )}

        {type === "password" && (
          <button
            className="bg-white dark:bg-[#3b3b45] border border-blue-50 ml-1
                dark:border-[#313139] px-2 py-1 rounded-sm cursor-pointer"
            onClick={() => setShow(!show)}
            type="button"
          >
            {!show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        )}
      </div>
    </div>
  );
}
