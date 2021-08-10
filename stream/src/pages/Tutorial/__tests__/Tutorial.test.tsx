import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Tutorial } from '../Tutorial';

type TutorialProps = React.ComponentProps<typeof Tutorial>;

const testId = 'Layout';

const renderComponent = (props: TutorialProps) => {
  return render(<Tutorial data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

describe('Компонент Tutorial', () => {
  const header = 'header';
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
});
