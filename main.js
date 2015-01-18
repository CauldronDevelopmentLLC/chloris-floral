// Instagram
var instagram_user_id = 1560277631;
var instagram_access_token =
  '1560277631.467ede5.f578bc791a434e89b6e3e468ebd1cd0e';
var instagram_client_id = '95fa5f7a937c4bb582fc63615c24c657';

// StatCounter
var sc_project = 10221566;
var sc_security = "8c9897c5";
var sc_location = 'chlorisfloral.com/';
var sc_referer = "";
try {sc_referer = "" + escape(parent.document.referrer);}
catch (e) {sc_referer = "" + escape(document.referrer);}


function stat_count(location = '') {
  config = {
    sc_project: sc_project, security: sc_security,
    resolution: screen.width, h: screen.height, camefrom: sc_referer,
    java: 1, sc_snum: 1, p: 0, u: escape(sc_location + location),
    t: escape(document.title), sc_random: Math.random()
  };

  $.ajax({url: 'http://c.statcounter.com/t.php', cache: false, data: config});
}


function stat_count_link(location = '', link = null, mode = 1) {
  config = {
    sc_project: sc_project, security: sc_security,
    c: escape(link), m: mode, u: escape(sc_location + location),
    t: escape(document.title), sc_random: Math.random()
  };

  $.ajax({url: 'http://c.statcounter.com/click.gif',
          cache: false, data: config});
}


var pages = [];
var current_page;
var updating_page = false;


function update_page() {
  var active_page = location.hash.substring(1);
  if (active_page == current_page) return;

  if (active_page == "" || !$('#' + active_page + '-page').size()) {
    active_page = pages[0];
    location.hash = '#' + active_page;
  }
  if (active_page == current_page) return;

  if (updating_page) return;
  updating_page = true;

  if ($('#' + current_page + '-page').size())
    $('#' + current_page + '-page').fadeOut('fast', function() {
      $('#' + active_page + '-page').fadeIn('fast', function () {
        updating_page = false;
      })
    })

  else $('#' + active_page + '-page').fadeIn('fast', function () {
    updating_page = false;
  })

  current_page = active_page;
  if (current_page == 'portfolio') load_gallery();

  stat_count('#' + current_page);
}


function init_page() {
  // Find pages
  $('#pages > div').each(function () {
    pages.push($(this).attr('id').replace(/-page$/, ''));
  });


  // Select initial page
  current_page = location.hash.substring(1);
  if (!current_page) current_page = pages[0];
  location.hash = '#' + current_page;

  if (current_page == 'portfolio') load_gallery();

  // Hide all but current page
  for (i in pages)
    if (pages[i] != current_page)
      $('#' + pages[i] + '-page').hide();

  setInterval(update_page, 100);
}


function create_menu() {
  var menu = $('#menu ul');

  $('#pages > div[title]').each(function () {
    var id = $(this).attr('id').replace(/-page$/, '');
    var title = $(this).attr('title');

    $('<li>')
      .append($('<a>')
              .attr('href', '#' + id)
              .text(title))
      .appendTo(menu);
  });
}


var gallery_loaded = false;


function load_gallery() {
  if (gallery_loaded) return;
  gallery_loaded = true;

  $('#gallery').nanoGallery({
    kind: 'flickr',
    userID: '128971344@N05',
    photoset: '72157648023960373',
    photoSorting: 'reversed',
    viewer: 'fancybox',
    thumbnailWidth: 160,
    thumbnailHeight: 'auto',
    thumbnailGutterWidth: 10,
    thumbnailGutterHeight: 10,
    colorSchemeViewer: 'dark',
    maxItemsPerLine: 4,
    thumbnailLabel: {
      display: true,
      displayDescription: true,
      hideIcons: true,
      position: 'onBottom',
      align: 'center'
    },
    theme: 'light'
  });
}


$(function () {
  create_menu();
  init_page();
  stat_count();

  // Track clicks
  for (i in pages) {
    $('#' + pages[i] + ' a[href]').click(function (event) {
      href = escape($(event.delegateTarget).attr('href'));
      stat_count_link(location.hash, href);
    });
  }
});
