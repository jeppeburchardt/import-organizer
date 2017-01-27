# Import Organizer

Sort ES6 import statements

```
// node modules first. modules are sorted by the module source, not the name
import ModuleB from 'a';
import ModuleA from 'b';
// absolute imports second
import OtherA from 'src/components/a';
import OtherB from 'src/components/b';
// relative imports third
import RelativeA from '../../folder/a';
import RelativeB from '../../folder/b';
// siblings last
import LocalA from './a';
import LocalB from './b';
```
