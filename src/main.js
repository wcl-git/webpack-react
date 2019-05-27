import './css/index.css';
import './css/indexless.less';
import './css/indexsass.scss';


export default class App {
  constructor() {
    this.handle = null;
  }
  test = async () => {
    await console.log('似懂非懂舒服');
    console.log('ffdfdf');
  }
}