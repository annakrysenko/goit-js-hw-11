'use strict';

import { refs } from './js/DOM';

import { getQueryValue } from './js/get-query-value'

refs.loaderEl.classList.add('hidden')
refs.loadButtonEl.classList.add('hidden')

refs.formEl.addEventListener('submit', (e) => getQueryValue(e))
















