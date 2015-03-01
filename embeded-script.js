
var playlisturl;

var getplaylisturl = function(playingurl) {
  var index = playingurl.lastIndexOf('/');
  var result = playingurl.slice(0, index);
  return result;
};

var replacelink = function() {
  console.log('check replace link');
  var nexturl = $('.next-item-link').attr("href");
  if(nexturl) {

    // if the next page is the playlist view...
    var splitnexturl = nexturl.split('/');
    if(splitnexturl.length < 3) {
      $.get(playlisturl, function(data) {
        var playlisthtml = $('<div>').html(data);
        var firsturl = playlisthtml.find('.item-preview:first-child').attr('href');
        $('.next-item-link').attr("href", firsturl);
      });
    }  
  }

  setTimeout(replacelink, 10000);
};

// --------------------------------------------
// main
// --------------------------------------------

// if current page is dropmark website
var domain = location.host;
if( domain.indexOf('dropmark.com') != -1) {

  // if current page is a video player
  var url = location.href;
  var spliturl = url.split('/');
  if(spliturl.length == 5) {
    playlisturl = getplaylisturl(url);

    // start loop to check the next url and replace
    setTimeout(replacelink, 10000);
  }
} else {
  console.log('this is NOT dropmark webpage');
}
