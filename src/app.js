import $ from 'jquery';

global.jQuery = require('jquery');
require('jquery-ui-dist/jquery-ui.js');

import  '../node_modules/bootstrap/dist/js/bootstrap.js';
import index from '../css/index.css';

import './landing/landing.controller';
import './landing/landing.model';
import './landing/landing.state';
import './landing/landing.view';
