const createReducer = (initialState, reducerMap) => {
    let store = { ...initialState };

    const dispatch = ({ type, ...rest }) =>
        objMap(
            (reducerType, func) => type === reducerType ? store = { ...func(store, rest) } : undefined,
            reducerMap
        );

    const getFieldStore = (...path) => {
        let lastProp = { ...store };
        for (let i = 0; i < path.length; i++) {
            const nextProp = lastProp[path[i]];

            if (nextProp === undefined) {
                return lastProp;
            }

            lastProp = nextProp;
        }
        return lastProp;
    };

    return { getFieldStore, dispatch };
};
