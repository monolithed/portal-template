import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {Video} from '../Video';

type TutorialProps = React.ComponentProps<typeof Video>;

const testId = 'Layout';

const renderComponent = (props: TutorialProps) => {
    return render(<Video data-testid={testId} {...props} />);
};

const getRender = () => {
    return screen.getByTestId(testId);
};

describe('Компонент Video', () => {
    it('Должен рендериться без ошибок', () => {
        expect(() => renderComponent({})).not.toThrow();
    });
});
