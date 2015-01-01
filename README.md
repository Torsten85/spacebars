spacebars
=========

Spacebars Plugin for RequireJS
(Needs <a href="https://github.com/Torsten85/blaze">RequireJS Blaze</a> to work)

## Usage
Simply use your handlebars / spacebars template like this:

```javascript
var myTemplate = require('spacebars!path/to/my/template');

myTemplate.helpers({});
myTemplate.events({});

myTemplate.rendered = function () {};
```

To render your template to the dom use the Blaze:
```javascript
var Blaze = require('blaze');
Blaze.render(myTemplate, document.body);
```

## Thats it for now.
