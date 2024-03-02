import { render } from '@testing-library/react';

import { GameSearchResults } from './game-search-results';

describe('GameSearchResults', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameSearchResults />);
    expect(baseElement).toBeTruthy();
  });
});
