const initialState = {
    turnedOn: false,
    prevElement: null,
    prevElementColor: null,
};

const reducer = {
    toggle: (state) => ({ ...state, turnedOn: !state.turnedOn }),
    setPrevActive: (state, { element, color }) => ({
        ...state,
        prevElement: element,
        prevElementColor: color
    }),
    blurElement: (state) => {
        state.prevElement.style.backgroundColor = state.prevElementColor;

        return ({ ...state, prevElement: null, prevElementColor: null });
    }

};

const { getFieldStore, dispatch } = createReducer(initialState, reducer);
