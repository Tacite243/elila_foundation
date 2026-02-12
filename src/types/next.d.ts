export type ApiRouteContext<
    Params extends Record<string, string | string[] | undefined> = Record<string, never>
> = {
    params: Params;
};
