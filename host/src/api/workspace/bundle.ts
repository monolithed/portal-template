import ky, {Options} from 'ky';

const api = ky.create({
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

const fetchBundle = (searchParams: BundleRequest, options?: Options): Promise<BundleResponse> | never => {
    const request = api.get('/api/workspace/bundle', {searchParams, ...options});

    return request.json<BundleResponse>();
};

export {fetchBundle};
