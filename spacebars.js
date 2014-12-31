define(function () {

  var extension = 'hbs';

  function fetchText (path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
      }
    };

    xhr.send(null);
  }

  var api = {};

  api.pluginBuilder = './spacebars-builder';

  api.load = function (name, parentRequire, load, config) {
    parentRequire(['blaze', 'blaze/htmljs', 'blaze/spacebars', 'blaze/spacebars-compiler'], function (Blaze, HTML, Spacebars, Compiler) {
      var path = parentRequire.toUrl(name + '.' + extension);

      fetchText(path, function (content) {
        var renderFuncCode = Compiler.compile(content, {isTemplate: true});
        load(new Blaze.Template(name, eval(renderFuncCode)));
      });
    });
  };

  return api;
});