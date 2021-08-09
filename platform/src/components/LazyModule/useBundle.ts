import {
    useEffect,
    useState
} from 'react';

import {addScript} from '@monolithed/module-federation-loader';
import {fetchBundle} from '../../api/workspace/bundle';

type State = {
    loading: boolean;
    error?: string;
}

const useBundle = (name: string): State => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [scriptLink, setScriptLink] = useState<HTMLScriptElement>();

    useEffect(() => {
        let abortController = new AbortController();

        (async (): Promise<void> => {
            let src: string;

            try {
                ({src} = await fetchBundle({name}));
            } catch {
                setError(`Could not fetch the "${name}" bundle`);

                return void 0;
            }

            try {
                const {script} = await addScript({src});
                setScriptLink(script);

            } catch {
                setError(`Could not append the "${name}" script`);

                return void 0;
            }

            setLoading(false);
        })();

        return () => {
            abortController.abort();
            scriptLink?.remove();
        };
    }, [name]);

    return {loading, error};
};

export {useBundle};
