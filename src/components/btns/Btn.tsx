import React from "react";
import { BtnProps, BtnValue } from "../../types/types";
import './Btn.css';

export function Btn<T extends BtnValue>({ text, value, selected, setSelected, filter, color }: BtnProps<T>) {
    const buttonClassName = `btn ${filter ? 'filter' : ''} ${selected ? 'selected' : ''}`.trim();
    const style = color && selected ? {
        '--btn-color': color,
        '--btn-color-shadow': `${color}55`,
    } as React.CSSProperties : undefined;

    return (
        <button
            onClick={() => setSelected(value)}
            className={buttonClassName}
            type="button"
            aria-pressed={selected}
            style={style}
        >
            {text}
        </button>
    );
}