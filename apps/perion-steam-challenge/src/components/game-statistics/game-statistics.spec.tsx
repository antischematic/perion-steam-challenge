import { render } from '@testing-library/react';

import {GameStatistics} from './game-statistics';

describe('GameCount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameStatistics playerName="" playtimeAcrossAllGames={0} />);
    expect(baseElement).toBeTruthy();
  });
});
