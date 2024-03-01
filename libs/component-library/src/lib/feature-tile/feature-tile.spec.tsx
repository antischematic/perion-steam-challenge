import { render } from '@testing-library/react';

import FeatureTile from './feature-tile';

describe('FeatureTile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureTile />);
    expect(baseElement).toBeTruthy();
  });
});
