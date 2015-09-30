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
    iconContainer.append("<img src='img/" + iconArray[i][0] + "' title='" + iconArray[i][1] + "' />");
  }
  addSidebarInteraction();
});


/* Dragging */

function addSidebarInteraction(){
  interact('#icon-container img').draggable({onmove: dragMoveListener});

  interact('#icon-container img')
    .draggable({ manualStart: true })
    .on('move', function (event) {
      var interaction = event.interaction;

      // if the pointer was moved while being held down
      // and an interaction hasn't started yet
      if (interaction.pointerIsDown && !interaction.interacting()) {
        var original = event.currentTarget,
            // create a clone of the currentTarget element
            clone = event.currentTarget.cloneNode(true);

        // insert the clone to the page
        // TODO: position the clone appropriately
        $('#main-canvas').appendChild(clone);

        // start a drag interaction targeting the clone
        interaction.start({ name: 'drag' },
                          event.interactable,
                          clone);
      }
    });
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

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}
