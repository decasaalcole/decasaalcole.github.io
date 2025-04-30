import { CardBtnProps } from "../types/types";
import './CardBtn.css';
export function CardBtn({ text, action }: CardBtnProps) {
    return (
        <button onClick={action} className="card-btn">
            {text}
        </button>
    )
}