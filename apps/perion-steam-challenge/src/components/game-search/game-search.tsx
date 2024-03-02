import styles from './game-search.module.scss';
import {useState} from "react";
import {Button, ButtonGroup, Input} from "@perion.steam.challenge/component-library";

export interface GameSearchProps {
    onSubmit: (formData: FormData) => void
}

export function GameSearch({ onSubmit }: GameSearchProps) {
    const [idType, setIdType] = useState(1)

    return (
        <form action={onSubmit}>
            <ButtonGroup name="idType" selectedValue={idType} onChange={setIdType} className="buttonGroup">
                <Button value={0}>Steam ID</Button>
                <Button value={1}>Vanity Name</Button>
            </ButtonGroup>
            <Input name="idValue" placeholder={`Enter your Steam ${idType ? 'Vanity Name' : 'ID'}`} />
            <Button data-testid="search">Search</Button>
        </form>
    )
}
