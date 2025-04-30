import { BtnProps } from "../types/types";
import './Btn.css';
export function Btn({ text, value, selected, setSelected }: BtnProps) {
    return (
        <button onClick={() => setSelected && setSelected(value)}  className={selected ? 'btn selected' : 'btn'}>
            {text}
        </button>
    )
}