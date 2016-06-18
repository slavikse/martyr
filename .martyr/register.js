import font from './tasks/font';
import image from './tasks/image';
import resize from './tasks/resize';
import script from './tasks/script';
import service from './tasks/service';
import sprite from './tasks/sprite';
import style from './tasks/style';
import svg from './tasks/svg';
import view from './tasks/view';

import bs from './utility/bs';
import del from './utility/del';
import size from './utility/size';
import zip from './utility/zip';

/**
 * Регистрируем все задачи
 */
export default () => {
  font();
  image();
  resize();
  script();
  service();
  sprite();
  style();
  svg();
  view();

  bs();
  del();
  size();
  zip();
}
