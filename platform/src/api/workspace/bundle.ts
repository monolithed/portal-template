import ky, {Options} from 'ky';

const api = ky.create({
    prefixUrl: '/api',
    searchParams: {
        version: '1'
    }
});

type BundleRequest = {
    name: string;
}

type BundleResponse = {
    src: string;
    integrity: string;
};

const WORKSPACE_BUNDLE_API = 'workspace/bundle.json';

const fetchBundle = (searchParams: BundleRequest, options?: Options): Promise<BundleResponse> | never => {
    const request = api.get(WORKSPACE_BUNDLE_API, {searchParams, ...options});

    return request.json<BundleResponse>();
};

export {fetchBundle};
