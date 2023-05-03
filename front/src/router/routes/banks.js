import { setChildren, el } from 'redom';
import { content } from '../../index.js';

export default function banks() {
  setChildren(content, el('p', 'банки'));
}
