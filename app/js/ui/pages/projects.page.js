// Generated by CoffeeScript 1.9.3
(function() {
  pages.projects = {
    "header": 'Towns 5'
  };

  pages.projects.content = '\n<div style="position:absolute;width:calc(100% - 40px);text-align:right;">\n<img src="media/image/languages/cs.png" onclick="changeLanguage(\'cs\')">\n<img src="media/image/languages/en.png" onclick="changeLanguage(\'en\')">\n</div>\n\n\n  <h2 style="text-align: center;">\n<img src="media/image/icon/logo1.png" alt="Towns.cz logo" width="100"/><br/>\n{{MESSAGES.pages.projects.new_version}}</h2>\n\n\n\n<p style="text-align: center;">\n  {{MESSAGES.pages.projects.info}}\n\n</p>\n\n\n  <div class="loading" style="display: none" id="sendpress_loading">{{MESSAGES.ui.messages.loading}}</div>\n  <div class="success" style="display: none" id="sendpress_success">{{MESSAGES.pages.projects.subscribe_success}}</div>\n  <div class="error" style="display: none" id="sendpress_error">{{MESSAGES.pages.projects.subscribe_error}}\n\n    <a href="http://forum.towns.cz/feed/" target="_blank">RSS Feed</a>,\n    <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo\n    <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.\n\n  </div>\n\n  <form method="post" action="http://forum.towns.cz/" id="sendpress">\n    <input type="hidden" name="sp_list" value="1390"/>\n    <input type="hidden" name="sendpress" value="post" />\n\n      <p style="text-align: center;">\n        <b>{{MESSAGES.form.mail}}:</b>\n        <input type="text" value="@" name="sp_email"/>\n\n        <b>{{MESSAGES.form.your_name}}:</b>\n        <input type="text" value="" name="sp_firstname"/>\n\n        <input value="{{MESSAGES.form.send}}" class="sendpress-submit" type="submit" id="submit" name="submit">\n      </p>\n\n      <!--<p name="lastname">\n        <label for="email">Last Name:</label>\n        <input type="text" value="" name="sp_lastname"/>\n      </p>-->\n\n    </div>\n  </form>\n\n\n  <script>\n      $("#sendpress").submit( function() {\n\n        $("#sendpress_success").hide();\n        $("#sendpress_error").hide();\n        $("#sendpress_loading").show();\n        $.ajax({\n            url: "http://blog.towns.cz/",\n            type: "post",\n            dataType: "json",\n            data: $("#sendpress").serialize(),\n            success: function(data) {\n\n              $("#sendpress_loading").hide();\n              if(data.success==true){\n                $("#sendpress")[0].reset();\n                $("#sendpress_success").show();\n\n              }else{\n                $("#sendpress_error").show();\n              }\n\n          }\n        });\n          return false;\n      });\n  </script>\n\n\n<p style="text-align: center;">\n  {{MESSAGES.pages.projects.subscribe}}\n  <a href="http://forum.towns.cz/feed/" target="_blank">RSS Feed</a>,\n  <a href="https://www.facebook.com/townsgame/" target="_blank">Facebook</a> nebo\n  <a href="https://twitter.com/townsgame" target="_blank">Twitter</a>.\n</p>\n\n\n<hr>\n\n\n<p style="text-align: center;">\n  <b>{{MESSAGES.pages.projects.news_from_game}}</b>\n</p>\n\n<div id="feed" class="feed"></div>\n\n  <script>\n\n\n    $.get(feed_url, function (data) {\n\n\n\n      var html=\'\',\n          limit=4;\n\n      $(data).find("item").each(function () {\n          if(limit<=0)return;\n          limit--;\n\n          var el = $(this);\n\n          /*r("title      : " + el.find("title").text());\n          r("author     : " + el.find("author").text());\n          r("description: " + el.find("description").text());*/\n\n\n\n         var authorname=el.find("creator").text();\n\n\n          var author = false;\n\n          authors.forEach(function(author_){\n            if(author_.name==authorname){\n              author=author_;\n            }\n          });\n\n\n\n          html+=[\n            \'<a class="towns-window" href="\'+el.find("link").text()+\'" title="\'+el.find("title").text()+\'" target="_blank">\',\n              \'<div class="feed_item">\',\n                \'<div class="feed_title">\'+el.find("title").text()+\'</div>\',\n                \'<div class="feed_description">\',\n                  author?\'<img src="http://projects.towns.cz/authors/\'+author.nick+\'.jpg" alt="\'+author.name+\'" title="\'+author.name+\'" width="40" class="feed_author" />\':\'\',\n                  el.find("description").text(),\n                \'</div>\',\n              \'</div>\',\n            \'</a>\'].join(\'\');\n\n      });\n\n      $("#feed").html(html);\n      uiScript();\n    });\n  </script>\n\n  <hr>\n\n<p style="text-align: center;">\n  <b>{{MESSAGES.pages.projects.projects}}</b><br>\n  {{MESSAGES.pages.projects.projects_info}}\n</p>\n\n<iframe src="http://projects.towns.cz/?only=1&amp;width=100%" width="100%" height="1500" frameborder="0" scrolling="0"></iframe>\n\n\n';

}).call(this);

//# sourceMappingURL=projects.page.js.map
