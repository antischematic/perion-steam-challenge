import { render } from '@testing-library/react';

import {ButtonGroup} from './button-group';
import {Button} from "../button/button";

describe('ButtonGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ButtonGroup selectedValue={0}><Button value={0} /></ButtonGroup>);
    expect(baseElement).toBeTruthy();
  });
});
