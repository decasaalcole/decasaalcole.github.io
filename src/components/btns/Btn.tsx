import { BtnProps } from "../../types/types";
import './Btn.css';

export function Btn({ text, value, selected, setSelected, filter }: BtnProps) {
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