# ![Knuddel](https://knuddels-wiki.de/images/8/89/Classic-Basic.gif) Knuddels Protobuf Register
Handling automated registration on Knuddels.de with protobuf. More informations on https://u-labs.de/forum/protokoll-120/registrierung-39966/

### Working state / ToDo
- [x] :unlock: Encoding
- [x] :closed_lock_with_key: Decoding
- [ ] :zap: API calls to server (Knuddels)
- [ ] :game_die: autmatism for mass registration
- [ ] :computer: Proxy usage
- [x] Usage by `require` from other `Node.js` destinations
- [x] Directly usage on `CLI` / `CMD`
- [x] Usage on `CLI` / `CMD` with some arguments

### :closed_book: Installation
##### :floppy_disk: By Source / Repository
Clone the repository and install the depencies with `npm`:
```sh
$ npm install
```
After the installation, you can run the script with following command:
```sh
$ node main.js
```

##### :gift: By `npm` with global usage
```sh
$ npm install -g knuddels-protobuf-register
```
After the installation, you can run the script with following command:
```sh
$ knuddels-protobuf-register
```

##### :scroll: By `npm` with usage on other `Node.js` applications
```sh
$ npm install --save knuddels-protobuf-register
```
After the installation, you can add the package to your project ([See JavaScript API](docs/JS.md)):
```js
const KPR = require('knuddels-protobuf-register');
```

:page_facing_up: License
----
MIT License

Copyright (c) 2019 Bizzi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
