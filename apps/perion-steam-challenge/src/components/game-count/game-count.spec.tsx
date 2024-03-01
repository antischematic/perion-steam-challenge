import { render } from '@testing-library/react';

import {GameCount} from './game-count';

describe('GameCount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameCount />);
    expect(baseElement).toBeTruthy();
  });
});
