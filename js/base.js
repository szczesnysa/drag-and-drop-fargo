/* ---------- Icon Panel Dropdown ------------ */

/* Declare 3D Array for Icon Sets ['filename', 'Title'] */
var choose = [['choose-arrow.png', 'Choose a Category']];
var trees = [['trees-american-linden.png', 'American Linden'], ['trees-cottonwood.png', 'Cottonwood'], ['trees-golden-willow.png', 'Golden Willow'], ['trees-maple.png', 'Maple'], ['trees-paper-birch.png', 'Paper Birch'], ['trees-pine.png', 'Pine']];
var flowers = [];
var bushes = [];
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

/* On Drowdown change */
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

function addSidebarInteraction(){
interact('#icon-container img').draggable({onmove: dragMoveListener});

  /* interact('#icon-container img')
    .draggable({ manualStart: true })
    .on('move', function (event) {
      var interaction = event.interaction;

      // if the pointer was moved while being held down
      // and an interaction hasn't started yet
      if (interaction.pointerIsDown && !interaction.interacting()) {
        var original = event.currentTarget,
            // create a clone of the currentTarget element
            clone = event.currentTarget.cloneNode(true);
            $(clone).attr('width', '200px');
            $(clone).attr('height', '200px');
            $(clone).addClass('canvasIcon');

        // insert the clone to the page
        // position the clone appropriately
        $('#sidebar').append(clone);

        // start a drag interaction targeting the clone
        interaction.start({ name: 'drag' },
                          event.interactable,
                          clone);
      }
    }); */

  /*  interact('#icon-container img')
      .draggable()
      .on('move', function (event) {
        var interaction = event.interaction;

        // if the pointer was moved while being held down
        // and an interaction hasn't started yet
        if (interaction.pointerIsDown && !interaction.interacting()) {
          var original = event.currentTarget,
              // create a clone of the currentTarget element
              clone = event.currentTarget.cloneNode(true);
              $(clone).attr('width', '200px');
              $(clone).attr('height', '200px');
              $(clone).addClass('canvasIcon');

          // insert the clone to the page
          // position the clone appropriately
          $('#sidebar').append(clone);

          // start a drag interaction targeting the clone
          interaction.start({ name: 'drag' },
                            event.interactable,
                            clone);
        }
      }); */

    /* Next try: cloning icon as next icon in sidebar... */
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

function dropIcon(){

}

/* Set Dropzone */

var canvas = document.getElementById('main-canvas');
var context = canvas.getContext("2d");

interact('#main-canvas')
  .dropzone({
    ondrop: function (event) {
        addDroppedIcon(event);
    }
  })
  .on('dropactivate', function (event) {
    event.target.classList.add('drop-activated');
  });

  function addDroppedIcon(event){
    baseImage = new Image();
    baseImage.src = event.relatedTarget.getAttribute('src');
    baseImage.onload = function(){
      context.drawImage(baseImage, 100, 100, 100, 100);
    };
  }


/* ------------- Make Tooltips for sidebar Icons Work Like the Mock-up ------------- */



/* ------------- Add Selectability for icons already on cavas and display contextual edit menu ------------- */
