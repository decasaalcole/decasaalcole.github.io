import { BtnProps, BtnValue } from "../../types/types";
import './Btn.css';

export function Btn<T extends BtnValue>({ text, value, selected, setSelected, filter }: BtnProps<T>) {
    const buttonClassName = `btn ${filter ? 'filter' : ''} ${selected ? 'selected' : ''}`.trim();

    return (
        <button 
            onClick={() => setSelected(value)}
            className={buttonClassName}
            type="button"
            aria-pressed={selected}
        >
            {text}
        </button>
    );
}