import { BtnProps, BtnValue } from "../../types/types";
import './Btn.css';

export function Btn<T extends BtnValue>({ text, value, selected, setSelected, filter }: BtnProps<T>) {
    const handleClick = () => {
        if (setSelected) {
            setSelected(value);
        }
    };

    const buttonClassName = `btn ${filter ? 'filter' : ''} ${selected ? 'selected' : ''}`.trim();

    return (
        <button 
            onClick={handleClick}
            className={buttonClassName}
            type="button"
            aria-pressed={selected}
        >
            {text}
        </button>
    );
}