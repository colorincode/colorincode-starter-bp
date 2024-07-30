import {Resolver} from '@parcel/plugin';
import path from 'path';

export default new Resolver({
  async resolve({specifier}) {
    if (specifier === 'special-module') {
      return {
        filePath: path.join(__dirname, 'special-module.js'),
        code: 'export default "This is a special module!";'
      };
    }

    return null;
  }
});