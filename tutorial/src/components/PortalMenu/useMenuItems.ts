import { Item } from '@consta/uikit/__internal__/src/components/Header/Menu/HeaderMenu';

import { ROUTES_NAMES, getLabel, RouteName } from '../../modules/route/routes';
import { useRoute } from 'react-router5';

const items: RouteName[] = [ROUTES_NAMES.ABOUT, ROUTES_NAMES.TUTORIAL];

const useMenuItems = (): Item[] => {
    const { router } = useRoute();

    return items.map((item) => ({
        label: getLabel(item),
        href: router.buildPath(item),
        active: router.isActive(item),
        onClick: (e) => {
            e.preventDefault();
            router.navigate(item);
        }
    }));
};

export { useMenuItems };
