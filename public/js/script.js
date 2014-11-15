var allSpells = [];

$(function() {

   listSpells();

   // Spell link click
   $('#spellList').on('click', 'li a.linkShowSpell', showSpellInfo);

});

function listSpells() {
   // Empty content string
   var divContent = '';

   // jQuery AJAX call for JSON
   $.getJSON('/api/spells', function( data ) {

   allSpells = data;

      // For each item in our JSON, add a list element
      $.each(data, function(){

         divContent += '<li><a href="#" class="linkShowSpell" rel="'
         + this.name + '" title="Show Details">' + this.name
         + '</a></li>';

      });

      // Inject the whole content string into our existing HTML list
      $('#spellList').html(divContent);
   });
}

// Show Spell Info
function showSpellInfo(event) {

   // Prevent Link from Firing
   event.preventDefault();

   // Retrieve spellname from link rel attribute
   var thisSpellName = $(this).attr('rel');

   // Get Index of object based on id value
   var arrayPosition = allSpells.map(function(arrayItem)
    { return arrayItem.name; }).indexOf(thisSpellName);

   // Get our Spell Object
   var thisSpellObject = allSpells[arrayPosition];

   //Populate Info Box
   $('#userInfoName').text(thisSpellObject.name);
   $('#userInfoAge').text(thisSpellObject.level);
   $('#userInfoGender').text(thisSpellObject.type);
   $('#userInfoLocation').text(thisSpellObject.description);

}
