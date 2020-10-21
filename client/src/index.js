import React from 'react';
import ReactDOM from 'react-dom';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import './assets/css/index.css';
import App from './App';

dayjs.locale('es');

ReactDOM.render(<App />, document.getElementById('root'));
