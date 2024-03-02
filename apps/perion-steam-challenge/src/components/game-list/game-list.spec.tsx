import { render } from '@testing-library/react';

import {GameList} from './game-list';

describe('GameList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameList games={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
