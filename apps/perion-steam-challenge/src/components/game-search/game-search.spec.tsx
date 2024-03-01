import { render } from '@testing-library/react';

import {GameSearch} from './game-search';

describe('GameSearch', () => {
  it('should render successfully', () => {
    const noop = () => void 0
    const { baseElement } = render(<GameSearch onSubmit={noop} />);
    expect(baseElement).toBeTruthy();
  });
});
