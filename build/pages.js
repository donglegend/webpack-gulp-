var fs = require("fs");
var path = require("path");


var pages = function() {
  var dir = fs.readdirSync(path.resolve(__dirname, '../views/'));
  return dir.filter(function(name) {
    return name.match(/\.html$/);
  });
}();

var content = pages.map(function(html) {
	if (~html.indexOf("for")) {
		html += "?ht_id=ES8SJ987RF988SSFt";
	}
	return "<li class=pure-menu-item><a class=pure-menu-link href='/" + html + "'>" + html + "</a></li>";
});

var template = [
	"<!doctype html>",
	"<meta name=viewport content=\"width=device-width,user-scalable=no,initial-scale=1,minimum-scale=1,maximum-scale=1\">",
	"<link rel=\"stylesheet\" href=\"../components/pure/pure-min.css\">",
	"<div class=\"pure-menu custom-restricted-width\" style=\"margin-top:2em\">",
	"<span class=pure-menu-heading>Yifen Sites</span>",
	"<ul class=pure-menu-list>",
	content.join(""),
	"</ul>",
	"</div>",
	"<i id='qrcode' style='position:absolute;top:10px;right:10px;'></i>",
	"<script src='../components/qrcode.js/qrcode.js'></script>",
	"<script>",
	";if (window.chrome) new QRCode(document.getElementById(\"qrcode\"), location.href);",
	"</script>"
];

module.exports = template.join("");