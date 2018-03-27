'use strict';

let articles = [];

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

Article.prototype.toHtml = function() {
  // TODONE: Use Handlebars to render your articles. Get your template from the DOM and "compile" your template with Handlebars.
  let template = $('#handlebars-template').html();
  let templateRender = Handlebars.compile(template);
  Handlebars.registerHelper('link', function(object){
    Handlebars.escapeExpression(object.url),
    Handlebars.escapeExpression(object.text);
    return new Handlebars.safeString.Article(
      '<a href=\'' + object.url + '\'>' + object.text + '</a>'
    );
  });
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  return templateRender(this);
};

// REVIEWED: If your template will use properties that aren't on the object yet, add them.
// Since your template can't hold any JS logic, we need to execute the logic here.
// The result is added to the object as a new property, which can then be referenced by key in the template.
// For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:


// REVIEWED: The ternary operator above accomplishes this same logic.


// TODONE: Use the method that Handlebars gave you to return your filled-in html template for THIS article.
// line 19
//};

// COMMENTED: Why are there parentheses around "(a,b)" in the .sort() method, but not around the "articleObject" or "article" arguments in the .forEach() methods?
// When using arrow functions, if there is more than one parameter being used in the function, then the parameters need have parantheses. Similarly when there is only one parameter, you can also use parentheses, but you dont HAVE to.

rawData.sort((a,b) => {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(articleObject => {
  articles.push(new Article(articleObject));
});

articles.forEach(article => {
  $('#articles').append(article.toHtml());
});