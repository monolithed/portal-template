import React, {
    FunctionComponent,
    ReactNode
} from 'react';

import styles from './Layout.css';

type Props = {
    header: ReactNode;
};

const Layout: FunctionComponent<Props> = ({children, header}) => {
    return (
        <div className={styles.layout}>
            <header>{header}</header>
            <main className={styles.content}>{children}</main>
        </div>
    );
};

export {Layout};
