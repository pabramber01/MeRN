import { toast } from 'react-toastify';

const compareSameListAction = (state, meta) => {
  return state.datetime === meta.arg.datetime;
};

const reducers = {
  clear: (initialState) => {
    return initialState;
  },
  changeViewList: (initialState, payload) => {
    const { page } = payload;
    const now = new Date().toISOString();
    return { ...initialState, view: page, datetime: now };
  },
  pending: (state) => {
    state.isLoading = true;
  },
  pendingList: (state) => {
    state.page += 1;
  },
  fullfilledList: (state, { payload, meta }) => {
    if (!compareSameListAction(state, meta)) return;

    const { data } = payload;
    if (data.length === 0 && !state.reachEnd) {
      state.reachEnd = true;
      if (state.page > 2) {
        toast.warn('You have reached the end!');
      }
    } else {
      state.data.push(...data);
    }
  },
  reject: (state, { payload }) => {
    const { msg } = payload;
    state.isLoading = false;
    toast.error(msg);
  },
  rejectNoLoading: (_, { payload }) => {
    const { msg } = payload;
    toast.error(msg);
  },
  rejectOnlyLoading: (state) => {
    state.isLoading = false;
  },
  rejectOneMsg: (state, { payload }, id) => {
    const { msg } = payload;
    state.isLoading = false;
    toast.error(msg, { toastId: id });
  },
  rejectOneMsgNoLoading: ({ payload }, id) => {
    const { msg } = payload;
    toast.error(msg, { toastId: id });
  },
};

export default reducers;
