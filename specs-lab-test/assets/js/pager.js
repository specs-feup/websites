/* 
 * Using Bootstrap Paginator
 * http://lyonlai.github.io/bootstrap-paginator/
 *  */

var newsPager = $('#newsPager');
var newsPaginator = $('#newsPaginator');
var perPage = 3;
var numItems = newsPager.children().size();
var numPages = Math.ceil(numItems / perPage);

var paginatorOptions = {
//    size: 'small',
    currentPage: 1,
    numberOfPages: 5,
    totalPages: numPages,
    bootstrapMajorVersion: 3,
    onPageChanged: function (e, oldPage, newPage) {

        goTo(newPage);
    },
    tooltipTitles: function (type, page, current) {
    }
};

/* See here: http://stackoverflow.com/a/17552091 */
var goTo = function (page) {

    var pageID = page - 1;
    var startAt = pageID * perPage;
    var endOn = startAt + perPage;

    if (endOn > numItems) {
        endOn = numItems;
    }

    newsPager.children().css('display', 'none').slice(startAt, endOn).css('display', 'block');
    newsPager.find("hr").css('display', 'none').slice(startAt, endOn - 1).css('display', 'block');
};

newsPaginator.bootstrapPaginator(paginatorOptions);
goTo(1);