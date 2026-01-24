type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiConfig {
    url: string;
    method: HttpMethod;
    body?: Record<string, string> | FormData;
}

export const createApiConfig = ({
    method,
    url,
    body,
}: {
    method: HttpMethod;
    url: string;
    body?: Record<string, string> | FormData;
}): ApiConfig => ({
    url,
    method,
    ...(body && { body }),
});
