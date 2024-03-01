import styles from './game-search.module.scss';
import {useState} from "react";

export interface GameSearchProps {
    onSubmit: (formData: FormData) => void
}

export function GameSearch({ onSubmit }: GameSearchProps) {
    const [idType, setIdType] = useState(1)

    return (
        <form action={onSubmit}>
            <div className="buttonGroup">
                <label><input name="idType" type="radio" value={0} checked={idType === 0} onChange={() => setIdType(0)} />Steam ID</label>
                <label><input name="idType" type="radio" value={1} checked={idType === 1} onChange={() => setIdType(1)}  />Vanity Name</label>
            </div>
            <label>
                <span>Enter your Steam {idType ? 'Vanity Name' : 'ID'}</span>
                <input name="idValue" type="text" />
            </label>
            <button data-testid="search">Search</button>
        </form>
    )
}
