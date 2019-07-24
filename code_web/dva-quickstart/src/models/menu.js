export default {
  namespace: 'menu',

  state: {
    currentMenu: {},
  },

  reducers: {
    setCurrentMenu(state, {payload} ) {
      return {
        ...state,
        currentMenu: payload
      };
    },
  },
};
