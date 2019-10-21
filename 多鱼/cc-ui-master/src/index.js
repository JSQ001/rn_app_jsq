import dva from 'dva';
import createLoading from 'dva-loading';
import './index.scss';
import "assets/svg";
import * as serviceWorker from './serviceWorker';
import {createContext, useContext} from 'react'

// 1. Initialize
const app = dva({
  initialState: {
    cust: {
      usr: window.localStorage.getItem('usr') !== 'null' && window.localStorage.getItem('usr') !== 'undefined' && window.localStorage.getItem('usr') !== '' ? JSON.parse(window.localStorage.getItem('usr')): {}
    },
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/application").default);
app.model(require("./models/cust").default);
app.model(require("./models/webshop").default);
app.model(require("./models/payment").default);
app.model(require("./models/repayacct").default);
app.model(require("./models/profile").default);

// 4. Router
app.router(require('./router').default);



// 5. Start
app.start('#root');
serviceWorker.unregister();



export const store = app._store;
export const globalContext = createContext(store);

export const history = app._history;

export default app
