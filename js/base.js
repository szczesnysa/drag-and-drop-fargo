/* ---------- Icon Panel Dropdown ------------ */

/* Declare 3D Array for Icon Sets ['filename', 'Title'] */
var trees = [['trees-american-linden.svg', 'American Linden'], ['trees-cottonwood.svg', 'Cottonwood'], ['trees-golden-willow.svg', 'Golden Willow'], ['trees-maple.svg', 'Maple'], ['trees-paper-birch.svg', 'Paper Birch'], ['trees-pine.svg', 'Pine']];
var flowers = [];
var shrubs = [];
var grasses = [['grasses-big-bluestem.svg', 'Big Bluestem'], ['grasses-cattail.svg', 'Cattail'], ['grasses-fox-sedge.svg', 'Fox Sedge'], ['grasses-horsetail.svg', 'Horsetail'], ['grasses-indian-grass.svg', 'Indian Grass'], ['grasses-little-bluegrass.svg', 'Little Bluegrass']];
var waterSand = [];
var furniture = [['furniture-bridge.svg', 'Bridge'], ['furniture-flat-bench.svg', 'Flat Bench'], ['furniture-picnic-table.svg', 'Picnic Table'], ['furniture-stone-bench.svg', 'Stone Bench'], ['furniture-table.svg', 'Table'], ['furniture-wood-bench.svg', 'Wood Bench']];
var walkways = [['walkways-flat-stone-piece.svg', 'Flat Stone Piece'], ['walkways-scattered-stone-path.svg', 'Scattered Stone Path'], ['walkways-stone-steps.svg', 'Stone Steps'], ['walkways-stone-walkway.svg', 'Stone Walkway'], ['walkways-wood-steps.svg', 'Wood Steps'], ['walkways-wood-walkway.svg', 'Wood Walkway']];
var logsRocks = [['logsrocks-long-log.svg', 'Long Log'], ['logsrocks-rock1.svg', 'Rock 1'], ['logsrocks-rock2.svg', 'Rock 2'], ['logsrocks-rock3.svg', 'Rock 3'], ['logsrocks-short-log.svg', 'Short Log'], ['logsrocks-upright-log.svg', 'Upright Log']];

/* Declare Other variables */

var dropdown  = $('#icon-select');
var iconContainer = $('#icon-container');

/* On Drowdown change */
dropdown.change(function() {
  var iconArray = window[dropdown.val()];
  iconContainer.empty();
  for (var i = 0; i < iconArray.length; i++){
    iconContainer.append("<img src='img/" + iconArray[i][0] + "' iconTitle='" + iconArray[i][1] + "' />");
  }
  setTooltips();
});

/* -------------- Style Tooltips ----------------- */

var iconTitle = "";
console.log($('#sidebar img'));

function setTooltips(){

  $('#sidebar img').on("mouseenter", function(e){
    $(this).addClass('tooltip');
    /*
    iconTitle = $(this).attr('title');
    $(this).removeAttr("title").addClass('tooltip'); */
  });

  $('#sidebar img').on("mouseleave", function(e){
    $(this).removeClass('tooltip');
    /* $(this).attr("title", iconTitle).removeClass('tooltip'); */
  });

}


/* (function () { */
  /*  var ID = "tooltip", CLS_ON = "tooltip_ON", FOLLOW = FALSE,
    DATA = "_tooltip", OFFSET_X = 20, OFFSET_Y = 20,
    showAt = function (e) {
        var ntop = e.pageY + OFFSET_Y, nleft = e.pageX + OFFSET_X;
        $("#" + ID).html($(e.target).data(DATA)).css({
            position: "absolute", top: ntop, left: nleft
        }).show();
    };
    $(document).on("mouseenter", "*[title]", function (e) {
        $(this).data(DATA, $(this).attr("title"));
        $(this).removeAttr("title").addClass(CLS_ON);
        $("<div id='" + ID + "' />").appendTo("body");
        showAt(e);
    });
    $(document).on("mouseleave", "." + CLS_ON, function (e) {
        $(this).attr("title", $(this).data(DATA)).removeClass(CLS_ON);
        $("#" + ID).remove();
    });
    if (FOLLOW) { $(document).on("mousemove", "." + CLS_ON, showAt); } */
/* }()); */

/* Customization:
var ID = "tooltip"; // The ID of the styleable tooltip
var CLS_ON = "tooltip_ON"; // Does not matter, make it somewhat unique
var FOLLOW = true; // TRUE to enable mouse following, FALSE to have static tooltips
var DATA = "_tooltip"; // Does not matter, make it somewhat unique
var OFFSET_X = 20, OFFSET_Y = 10; // Tooltip's distance to the cursor

Reference Link: http://stackoverflow.com/questions/2011142/how-to-change-the-style-of-title-attribute-inside-the-anchor-tag

*/
