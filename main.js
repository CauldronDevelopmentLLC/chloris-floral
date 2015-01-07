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


function update_page() {
    // Update page
    var active_page = location.hash.substring(1);
    if (active_page == current_page) return;

    if (active_page == "" || !$('#' + active_page).size()) {
        active_page = pages[0];
        location.hash = '#' + active_page;
    }
    if (active_page == current_page) return;

    if ($('#' + current_page).size())
        $('#' + current_page).fadeOut('fast', function() {
            $('#' + active_page).fadeIn('fast');
        })

    else $('#' + active_page).fadeIn('fast');

    current_page = active_page;
    stat_count('#' + current_page);
}


function init_page() {
    // Find pages
    $('#pages > div').each(function () {
        pages.push($(this).attr('id'));
    });


    // Select initial page
    current_page = location.hash.substring(1);
    if (!current_page) current_page = pages[0];
    location.hash = '#' + current_page;

    for (i in pages) {
        page = pages[i];

        // Hide all but current page
        if (page == current_page) $('#' + page + '_item').addClass('selected');
        else $('#' + page).hide();
    }

    setInterval(update_page, 100);
}


function create_menu() {
    var menu = $('#menu ul');

    $('#pages > div[title]').each(function () {
        var id = $(this).attr('id');
        var title = $(this).attr('title');

        $('<li>')
            .append($('<a>')
                    .attr('href', '#' + id)
                    .text(title))
            .appendTo(menu);
    });
}


function init_instagram() {
    (new Instafeed({
        get: 'user',
        userId: instagram_user_id,
        accessToken: instagram_access_token,
        sortBy: 'most-recent',
        limit: 32,
        template: '<a target="_blank" href="{{link}}">' +
            '<img src="http:{{image}}"/></a>'
    })).run();
}


$(function () {
    create_menu();
    init_page();
    init_instagram();
    stat_count();

    // Track clicks
    for (i in pages) {
        $('#' + pages[i] + ' a[href]').click(function (event) {
            href = escape($(event.delegateTarget).attr('href'));
            stat_count_link(location.hash, href);
        });
    }
});
