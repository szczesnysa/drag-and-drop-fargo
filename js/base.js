/* ---------- Icon Panel Dropdown ------------ */

/* Declare 3D Array for Icon Sets ['filename', 'Title'] */
var choose = [['choose-arrow.png', 'Choose a Category']];
var trees = [['trees-american-linden.png', 'American Linden'], ['trees-cottonwood.png', 'Cottonwood'], ['trees-golden-willow.png', 'Golden Willow'], ['trees-maple.png', 'Maple'], ['trees-paper-birch.png', 'Paper Birch'], ['trees-pine.png', 'Pine']];
var flowers = [];
var bushes = [['bushes-arborvitae.png', 'Arborvitae'], ['bushes-buckthorn.png', 'Buckthorn'], ['bushes-burning-bush.png', 'Burning Bush'], ['bushes-dogwood.png', 'Dogwood'], ['bushes-flame-amur-maple.png', 'Flame Amur Maple'], ['bushes-suffruticosa.png', 'Suffruticosa']];
var grasses = [['grasses-big-bluestem.png', 'Big Bluestem'], ['grasses-cattail.png', 'Cattail'], ['grasses-fox-sedge.png', 'Fox Sedge'], ['grasses-horsetail.png', 'Horsetail'], ['grasses-indian-grass.png', 'Indian Grass'], ['grasses-little-bluegrass.png', 'Little Bluegrass']];
var waterSand = [['watersand-lake.png', 'Lake'], ['watersand-sand.png', 'Sand'], ['watersand-sandbar.png', 'Sandbar'], ['watersand-sandpit.png', 'Sand Pit'], ['watersand-small-lake.png', 'Small Lake'], ['watersand-small-river.png', 'Small River'], ['watersand-wide-river.png', 'Wide River'], ['watersand-lake-with-island.png', 'Lake and Island']];
var furniture = [['furniture-bridge.png', 'Bridge'], ['furniture-flat-bench.png', 'Flat Bench'], ['furniture-picnic-table.png', 'Picnic Table'], ['furniture-stone-bench.png', 'Stone Bench'], ['furniture-table.png', 'Table'], ['furniture-wood-bench.png', 'Wood Bench']];
var walkways = [['walkways-flat-stone-piece.png', 'Flat Stone Piece'], ['walkways-scattered-stone-path.png', 'Scattered Stone Path'], ['walkways-stone-steps.png', 'Stone Steps'], ['walkways-stone-walkway.png', 'Stone Walkway'], ['walkways-wood-steps.png', 'Wood Steps'], ['walkways-wood-walkway.png', 'Wood Walkway']];
var logsRocks = [['logsrocks-long-log.png', 'Long Log'], ['logsrocks-rock1.png', 'Rock 1'], ['logsrocks-rock2.png', 'Rock 2'], ['logsrocks-rock3.png', 'Rock 3'], ['logsrocks-short-log.png', 'Short Log'], ['logsrocks-upright-log.png', 'Upright Log']];

/* Declare Other variables */

var dropdown  = $('#icon-select');
var iconContainer = $('#icon-container');

/* Set Dropdown Initially */

displayIcons();

/* On Drowpdown change */
dropdown.change(function(){
  displayIcons();
});

function displayIcons(){
  var iconArray = window[dropdown.val()];
  iconContainer.empty();
  for (var i = 0; i < iconArray.length; i++){
    iconContainer.append("<img src='img/" + iconArray[i][0] + "' title='" + iconArray[i][1] + "' />");
  }
  addSidebarInteraction();
}


/* Dragging */
var clone;

function addSidebarInteraction(){
interact('#icon-container img').draggable({onstart: cloneSidebarIcon, onmove: dragMoveListener, onend: addFinalIcon});

}

function cloneSidebarIcon(event){
  clone = event.target.cloneNode(true);
  $(event.target).after(clone);
}

function addFinalIcon(event){
  var offsetx = $(event.target).offset();
  var clonedIcon = event.target.cloneNode(true);
  $(clonedIcon).css({"transform": "translate(0, 0)", "width" : "100px", "height" : "100px", "position": "absolute", "top" : offsetx.top, "left":offsetx.left});
  $('#main-canvas').append(clonedIcon);
  $(event.target).remove();
  addInteractability(clonedIcon);

}

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the position attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}
/* Set Dropzone */

interact('#main-canvas')
  .dropzone({
    ondrop: function (event) {

    }
  })
  .on('dropactivate', function (event) {
    event.target.classList.add('drop-activated');
  });


/* ------------- Add Selectability for icons already on cavas and display contextual edit menu ------------- */

function addInteractability(icon){
  $(icon).attr('data-x', 0);
  $(icon).attr('data-y', 0);
  interact(icon).draggable({onmove: dragMoveListener});
  $(icon).dblclick(showOptionsBox);

}

function showOptionsBox(event){
  $('#main-canvas .selected').removeClass('selected');
  $(event.target).addClass('selected');
  $(event.target).append()
}


/* ------------- Make Tooltips for sidebar Icons Work Like the Mock-up ------------- */



/* ------------- Save & Submit ------------- */
