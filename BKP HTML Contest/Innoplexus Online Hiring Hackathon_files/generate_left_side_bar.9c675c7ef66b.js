function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

$(document).ready(function(){
    $('#main_content h3, #main_content h2').each(function(){
      var el = $(this);

      var id = el.attr('id');
      // don't do anything if ID is already present.
      if (id) {
        return
      }

      // add the id to each of h3
      el.attr('id', slugify(el.text()))
    });
});
