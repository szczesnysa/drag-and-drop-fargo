/* ---------- Icon Panel Dropdown ------------ */

/* Declare 3D Array for Icon Sets ['filename', 'Title'] */
var choose = [['choose-arrow.png', 'Choose a Category']];
var trees = [['trees-american-linden.png', 'American Linden'], ['trees-cottonwood.png', 'Cottonwood'], ['trees-golden-willow.png', 'Golden Willow'], ['trees-maple.png', 'Maple'], ['trees-paper-birch.png', 'Paper Birch'], ['trees-pine.png', 'Pine']];
var flowers = [['flowers-blue-eyed-grass.png', 'Blue Eyed Grass'], ['flowers-hyssop.png', 'Hyssop'], ['flowers-marsh-marigold.png', 'Marsh Marigold'], ['flowers-milkweed.png', 'Milkweed'], ['flowers-prairie-violet.png', 'Prairie Violet'], ['flowers-wild-prairie-rose.png', 'Wild Prairie Rose']];
var bushes = [['bushes-arborvitae.png', 'Arborvitae'], ['bushes-buckthorn.png', 'Buckthorn'], ['bushes-burning-bush.png', 'Burning Bush'], ['bushes-dogwood.png', 'Dogwood'], ['bushes-flame-amur-maple.png', 'Flame Amur Maple'], ['bushes-suffruticosa.png', 'Suffruticosa']];
var grasses = [['grasses-big-bluestem.png', 'Big Bluestem'], ['grasses-cattail.png', 'Cattail'], ['grasses-fox-sedge.png', 'Fox Sedge'], ['grasses-horsetail.png', 'Horsetail'], ['grasses-indian-grass.png', 'Indian Grass'], ['grasses-little-bluegrass.png', 'Little Bluegrass']];
var waterSand = [['watersand-lake.png', 'Lake'], ['watersand-sand.png', 'Sand'], ['watersand-sandbar.png', 'Sandbar'], ['watersand-sandpit.png', 'Sand Pit'], ['watersand-small-lake.png', 'Small Lake'], ['watersand-small-river.png', 'Small River'], ['watersand-wide-river.png', 'Wide River'], ['watersand-lake-with-island.png', 'Lake and Island']];
var furniture = [['furniture-bridge.png', 'Bridge'], ['furniture-flat-bench.png', 'Flat Bench'], ['furniture-picnic-table.png', 'Picnic Table'], ['furniture-stone-bench.png', 'Stone Bench'], ['furniture-table.png', 'Table'], ['furniture-wood-bench.png', 'Wood Bench']];
var walkways = [['walkways-flat-stone-piece.png', 'Flat Stone Piece'], ['walkways-scattered-stone-path.png', 'Scattered Stone Path'], ['walkways-stone-steps.png', 'Stone Steps'], ['walkways-stone-walkway.png', 'Stone Walkway'], ['walkways-wood-steps.png', 'Wood Steps'], ['walkways-wood-walkway.png', 'Wood Walkway']];
var logsRocks = [['logsrocks-long-log.png', 'Long Log'], ['logsrocks-rock1.png', 'Rock 1'], ['logsrocks-rock2.png', 'Rock 2'], ['logsrocks-rock3.png', 'Rock 3'], ['logsrocks-short-log.png', 'Short Log'], ['logsrocks-upright-log.png', 'Upright Log']];

/* Declare Other variables */

var dropdown  = $('#icon-select');
var iconContainer = $('#icon-container');
var selectedOptions = $('#selectedOptions');
var zIndex = 1;

/* Set Dropdown Initially */

displayIcons();

/* On Drowpdown change */

$(document).ready(function() {
    interact('#optionsBox').draggable({onmove: dragMoveListener});
    $('#removeSelected').click(function(){removeSelected();})
});

function removeSelected(){
  $('.selected').removeClass('selected');
}

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
  $(event.target).css({'z-index':zIndex});
  clone = event.target.cloneNode(true);
  $(event.target).after(clone);
}

function addFinalIcon(event){
  var offsetx = $(event.target).offset();
  var clonedIcon = event.target.cloneNode(true);
  $(clonedIcon).css({"transform": "translate(0, 0)", "width" : "100px", "height" : "100px", "position": "absolute", "top" : offsetx.top +10, "left":offsetx.left +10, 'z-index':zIndex});
  zIndex += 1;
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
  $(icon).click(showOptionsBox);
}

function showOptionsBox(event){
  if(!$(event.target).hasClass('selected')){
    removeModifyability();
    $('#main-canvas .selected').removeClass('selected');
    $(event.target).addClass('selected');
    selectedOptions.css({'display': 'block'});
    addModifyability(event.target);
  }
}

function addModifyability(icon){
  $('#scaleUp').click(
    function(){
      scaleUp(icon);
  });

  $('#scaleDown').click(
    function(){
      scaleDown(icon);
  });

  $('#layerForward').click(
    function(){
      layerForward(icon);
  });

  $('#layerBackward').click(
    function(){
      layerBackward(icon);
  });

  $('#delete').click(
    function(){
      deleteIcon(icon);
  });

  $('#deselect').click(
    function(){
      deselectIcon(icon);
  });
}

function removeModifyability(){
  $('#scaleUp').unbind('click');
  $('#scaleDown').unbind('click');
  $('#layerForward').unbind('click');
  $('#layerBackward').unbind('click');
  $('#delete').unbind('click');
  $('#deselect').unbind('click');
}

function scaleUp(icon){
  var width = $(icon).width();
  if(width < 200) {
    width += 25;
    $(icon).css({'width': width + 'px', 'height':width + 'px'});
  }
}

function scaleDown(icon){
  var width = $(icon).width();
  if(width > 50) {
    width -= 25;
    $(icon).css({'width': width + 'px', 'height':width + 'px'});
  }
}

function layerForward(icon){
  var index = $(icon).css('z-index') + 1;
  $(icon).css({'z-index' : index});

}

function layerBackward(icon){
  var index = $(icon).css('z-index') - 1;
  $(icon).css({'z-index' : index});
}

function deleteIcon(icon){
  $(icon).remove();
  selectedOptions.css({'display': 'none'});
}

function deselectIcon(icon){
  removeModifyability();
  selectedOptions.css({'display': 'none'});
  $(icon).removeClass('selected');
}

/* ------------- Make Tooltips for sidebar Icons Work Like the Mock-up ------------- */



/* ------------- Save & Submit ------------- */
