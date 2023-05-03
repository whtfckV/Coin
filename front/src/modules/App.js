import { el } from 'redom';
import Header from './Header';
import Content from './Content';

export const content = <Content />

export default class App {
  constructor() {
    <div this='el' class='app'>
      <Header />
      <main class='main'>
        <div class='container'>
          {content}
        </div>
      </main>
    </div>
  };

  update() {
    console.log('ff')
  }


};
