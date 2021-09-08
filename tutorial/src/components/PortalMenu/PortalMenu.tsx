import React, { FunctionComponent, useState } from 'react';

import { Header, HeaderModule, HeaderMenu, HeaderLogin, HeaderLogo } from '@consta/uikit/Header';

import { Logo } from './Logo';
import { useMenuItems } from './useMenuItems';
import { ROUTES_NAMES } from '../../modules/route/routes';
import { Link } from 'react-router5';

type Props = {};

const PortalMenu: FunctionComponent<Props> = () => {
    const items = useMenuItems();

    return (
        <Header
            leftSide={
                <>
                    <HeaderModule>
                        <HeaderLogo>
                            <Link routeName={ROUTES_NAMES.ROOT}>
                                <Logo />
                            </Link>
                        </HeaderLogo>
                    </HeaderModule>

                    <HeaderModule indent='l'>
                        <HeaderMenu items={items} />
                    </HeaderModule>
                </>
            }
            rightSide={
                <HeaderModule>
                    <HeaderLogin
                        isLogged={true}
                        personName='Александр Абашкин'
                        personInfo='ПАО «Газпромнефть»'
                        personStatus='available'
                    />
                </HeaderModule>
            }
        />
    );
};

export { PortalMenu };
