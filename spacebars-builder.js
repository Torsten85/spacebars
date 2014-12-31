define(function () {

  var config = requirejs.s.contexts._.config;
  config.context = 'new';

  var newRequire = requirejs.config(config);

  var Compiler = newRequire('blaze/spacebars-compiler');

  var extension = 'hbs';

  var buildMap = {};
  var fs = nodeRequire('fs');

  function fetchText (path) {
    var body = fs.readFileSync(path, 'utf8') || '';
    return body.replace(/^uFEFF/, '');
  }

  var api = {};

  api.write = function (pluginName, name, write) {
    if (name in buildMap) {
      write("define('" + pluginName + "!" + name + "', ['blaze', 'blaze/htmljs', 'blaze/spacebars'], function (Blaze, HTML, Spacebars) {\n" +
      "return new Blaze.Template('" + name + "'," + buildMap[name] + ");\n" +
      "});\n");
    }
  };

  api.load = function (name, parentRequire, load, config) {
    var path = parentRequire.toUrl(name + '.' + extension);
    var content = fetchText(path);
    buildMap[name] = Compiler.compile(content, {isTemplate: true});
    load();
  };

  return api;
});