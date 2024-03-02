import styles from './game-search.module.scss';
import {useRef, useState, useTransition} from "react";
import {Button, ButtonGroup, FormField, Input, Spinner} from "@perion.steam.challenge/component-library";

export interface GameSearchProps {
    onSubmit: (formData: FormData) => void
}

export function GameSearch({ onSubmit }: GameSearchProps) {
    const [idType, setIdType] = useState(0)
    const ref = useRef<HTMLInputElement>(null)
    const [transition, startTransition] = useTransition()
    const idName = idType ? 'Vanity Name' : 'Steam ID'
    const helpText = `Where can I find my Steam ID?`

    function handleChange(value: number) {
      if (ref.current) {
        ref.current.value = ''
        ref.current.focus()
      }
      setIdType(value)
    }

    function handleSubmit(value: FormData) {
      startTransition( () => {
        onSubmit(value)
      })
    }

    return (
        <form action={handleSubmit} className={styles.host}>
            <ButtonGroup name="idType" selectedValue={idType} onChange={handleChange}>
                <Button className={styles.button} value={0}>Steam ID</Button>
                <Button className={styles.button} value={1}>Vanity Name</Button>
            </ButtonGroup>
            <div className={styles.inputContainer}>
              <FormField>
                <Input name="idValue" placeholder={`Enter your ${idName}`} required ref={ref} />
                <Button data-testid="search">Search</Button>
              </FormField>
              <Spinner className={styles.spinner} spin={transition} />
            </div>
            <a target="_blank" rel="noreferrer" href={`https://www.google.com/search?q=${encodeURIComponent(helpText)}`} className={styles.help}>{helpText}</a>
        </form>
    )
}
