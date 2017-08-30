import {listen} from '../services/ws';

export default {

  namespace : 'push',

  state : {
    feed: []
  },

  effects : {
    * fetchFeed({
      payload
    }, {put, call, select}) {
      const messages = yield select(state => state.push.feed);
    },

    * saveFeed({
      payload
    }, {put, call, select}) {
      const {data} = payload;
      console.log('payload:' + JSON.stringify(payload))
      console.log('data:' + JSON.stringify(data))
      yield put({type: 'saveUpdates', payload: {
          data
        }});
    }
  },

  subscriptions : {
    feedSubscriber({dispatch}) {
      return listen((data) => {
        dispatch({type: 'saveFeed', payload: {
            data
          }});
      });
    },

    feedPageInitiator({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/websocket') {
          dispatch({type: 'fetchFeed', payload: {}});
        }
      });
    }
  },

  reducers : {
    saveUpdates(state, {
      payload: {
        data: feed
      }
    }) {
      return {
        ...state,
        feed
      };
    }
  }
};
