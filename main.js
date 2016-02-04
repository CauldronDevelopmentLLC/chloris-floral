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
try {sc_referer = "" + escape(parent.document.referrer)}
catch (e) {sc_referer = "" + escape(document.referrer)}


function stat_count(location) {
  if (typeof location == 'undefined') location = '';

  config = {
    sc_project: sc_project,
    security: sc_security,
    resolution: screen.width,
    h: screen.height,
    camefrom: sc_referer,
    java: 1,
    sc_snum: 1,
    p: 0,
    u: escape(sc_location + location),
    t: escape(document.title),
    sc_random: Math.random()
  };

  $.ajax({
    url: 'http://c.statcounter.com/t.php',
    dataType: 'jsonp',
    cache: false,
    data: config
  });
}


function stat_count_link(location, link, mode) {
  if (typeof location == 'undefined') location = '';

  config = {
    sc_project: sc_project,
    security: sc_security,
    c: link ? escape(link) : undefined,
    m: (typeof mode == 'undefined') ? 1 : mode,
    u: escape(sc_location + location),
    t: escape(document.title),
    sc_random: Math.random()
  };

  $.ajax({
    url: 'http://c.statcounter.com/click.gif',
    dataType: 'jsonp',
    cache: false,
    data: config
  });
}


var pages = [];
var current_page;
var updating_page = false;


function page_callback(name) {
  var fn = current_page + '_' + name;
  if (typeof window[fn] == 'function') window[fn]();
}


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
        page_callback('post_update');
      })
    })

  else $('#' + active_page + '-page').fadeIn('fast', function () {
    updating_page = false;
    page_callback('post_update');
  })

  current_page = active_page;

  page_callback('update');

  stat_count('#' + current_page);
}


function init_page() {
  // Find pages
  $('#pages > div').each(function () {
    pages.push($(this).attr('id').replace(/-page$/, ''));
  });

  // Select initial page
  update_page();

  // Hide all but current page
  for (i in pages)
    if (pages[i] != current_page)
      $('#' + pages[i] + '-page').hide();

  // Start timer
  setInterval(update_page, 250);
}


function create_menu() {
  var menu = $('#menu ul');

  $('#pages > div[title]').each(function () {
    var id = $(this).attr('id').replace(/-page$/, '');
    var title = $(this).attr('title');
    var href = $(this).attr('href');

    if (typeof href == 'undefined') href = '#' + id;

    $('<li>')
      .append($('<a>')
              .attr('href', href)
              .text(title))
      .appendTo(menu);
  });
}


var gallery_loaded = false;


function portfolio_update() {
  load_gallery();
}


function portfolio_post_update() {
  $('#gallery').resize();
}


function load_gallery() {
  if (gallery_loaded) return;
  gallery_loaded = true;

  $('#gallery').nanoGallery({
    kind: 'flickr',
    userID: '128971344@N05',
    photoset: '72157648023960373',
    photoSorting: 'reversed',
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
    viewerToolbar: {
      autoMinimize: 10000,
      minimized: 'label,closeButton'
    },
    theme: 'light'
  });
}


$(function () {
  create_menu();
  init_page();
  stat_count();

  // Open external links in a new page
  $('a').each(function () {
    var href = $(this).attr('href');
    if (/^https?:\/\//.test(href))
      $(this).attr('target', '_blank');
  })

  // Track clicks
  for (i in pages) {
    $('#' + pages[i] + ' a[href]').click(function (event) {
      href = escape($(event.delegateTarget).attr('href'));
      stat_count_link(location.hash, href);
    });
  }
});
