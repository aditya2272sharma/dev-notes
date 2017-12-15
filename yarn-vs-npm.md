- https://medium.com/netscape/npm-5-yarn-killer-ba69737b24d0
- https://medium.com/@Quigley_Ja/everything-you-wanted-to-know-about-package-lock-json-b81911aa8ab8


### Different Package Registries

* Yarn - https://registry.yarnpkg.com
* NPM - https://registry.npmjs.org

#### Read the articles listed below

 - https://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/
 - https://docs.npmjs.com/misc/registry

#### Private Registry

- url: https://docs.npmjs.com/misc/registry#i-dont-want-my-package-published-in-the-official-registry-its-private
- Set `"private": true` in your `package.json` to prevent it from being published at all.
- Or, `"publishConfig":{"registry":"http://my-internal-registry.local"}` to force it to be published only to your internal registry.
