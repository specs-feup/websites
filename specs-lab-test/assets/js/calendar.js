
$(document).ready(function () {
    // Init dialog


    $('#calendarContainer').fullCalendar({
        header: {
            left: 'prev,next today',
            right: 'title',
            //right: 'month,basicWeek,basicDay'
        },
        defaultDate: '2015-11-12',
//        editable: false,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'All Day Event',
                start: '2015-11-01',
                msg: 'Hello this is an eent with afakfa af kfask fsamafs werjwekjrlwkjrlw'
            },
            {
                title: 'All Day Event',
                start: '2015-11-01'
            },
            /**/
        ],
        eventClick: function (event, jsEvent, view) {

            $(this).children().popover({
                trigger: 'hover',
                title: event.title,
                placement: 'right',
                content: event.msg,
                html: true,
                container: 'body'
            }).popover('show');
//            if ($calPopOver)
//                $calPopOver.popover('destroy');
//            $calPopOver = $(this).children().popover('show');
        }
    });
});


/*
 {
 title: 'Long Event',
 start: '2015-02-07',
 end: '2015-02-10'
 },
 {
 id: 999,
 title: 'Repeating Event',
 start: '2015-02-09T16:00:00'
 },
 {
 id: 999,
 title: 'Repeating Event',
 start: '2015-02-16T16:00:00'
 },
 {
 title: 'Conference',
 start: '2015-02-11',
 end: '2015-02-13'
 },
 {
 title: 'Meeting',
 start: '2015-02-12T10:30:00',
 end: '2015-02-12T12:30:00'
 },
 {
 title: 'Lunch',
 start: '2015-02-12T12:00:00'
 },
 {
 title: 'Meeting',
 start: '2015-02-12T14:30:00'
 },
 {
 title: 'Happy Hour',
 start: '2015-02-12T17:30:00'
 },
 {
 title: 'Dinner',
 start: '2015-02-12T20:00:00'
 },
 {
 title: 'Birthday Party',
 start: '2015-02-13T07:00:00'
 },
 {
 title: 'Click for Google',
 url: 'http://google.com/',
 start: '2015-02-28'
 }
 */

//$(document).ready(function () {
//    $(".responsive-calendar").responsiveCalendar({
//        time: '2013-05',
//        events: {
//            "2013-04-30": {"number": 5, "badgeClass": "badge-warning", "url": "http://w3widgets.com/responsive-calendar"},
//            "2013-04-26": {"number": 1, "badgeClass": "badge-warning", "url": "http://w3widgets.com"},
//            "2013-05-03": {
//                "number": 1,
//                "badgeClass": "badge-error",
//                "dayEvents": [
//                    {
//                        "name": "Important meeting",
//                        "hour": "17:30"
//                    },
//                    {
//                        "name": "Morning meeting at coffee house",
//                        "hour": "08:15"
//                    }
//                ]
//            },
//            "2013-06-12": {}}
//    });
//});