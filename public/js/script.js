var allSpells = [];

$(function() {

   listSpells();

   // Spell link click
   $('#spellList').on('click', 'li a.linkShowSpell', showSpellInfo);

   // Add User button click
   $('#buttonAddSpell').on('click', addSpell);


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
   $('#spellName').text(thisSpellObject.name);
   $('#spellLevel').text(thisSpellObject.level);
   $('#spellType').text(thisSpellObject.type);

   $('#spellCastingTimeValue').text(thisSpellObject.castingTime.value);
   $('#spellCastingTimeUnit').text(thisSpellObject.castingTime.unit);
   $('#spellRangeValue').text(thisSpellObject.range.value);
   $('#spellRangeDescription').text(thisSpellObject.range.description);
   $('#spellComponentsVerbal').text(thisSpellObject.components.verbal);
   $('#spellComponentsSomatic').text(thisSpellObject.components.somatic);
   $('#spellComponentsMaterial').text(thisSpellObject.components.material);
   $('#spellComponentsMaterialDescription').text(thisSpellObject.components.materialDescription);
   $('#spellDurationAmount').text(thisSpellObject.duration.amount);
   $('#spellDurationConcentration').text(thisSpellObject.duration.concentration);

   $('#spellDescription').text(thisSpellObject.description);

}

function addSpell(event) {
    event.preventDefault();

   //  // Super basic validation - increase errorCount variable if any fields are blank
   var errorCount = 0;
   //  $('#addSpell input').each(function(index, val) {
   //      if($(this).val() === '') { errorCount++; }
   //  });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newSpell = {
            'name': $('#addSpell fieldset input#inputSpellName').val(),
            'type': $('#addSpell fieldset input#inputSpellLevel').val(),
            'level': $('#addSpell fieldset input#inputSpellType').val(),

            'castingTimeValue': $('#addSpell fieldset input#inputSpellCastingTimeValue').val(),
            'castingTimeUnit': $('#addSpell fieldset input#inputSpellCastingTimeUnit').val(),

            'rangeValue': $('#addSpell fieldset input#inputSpellRangeValue').val(),
            'rangeDescription': $('#addSpell fieldset input#inputSpellRangeDescription').val(),

            'componentsVerbal': $('#addSpell fieldset input#inputSpellComponentsVerbal').val(),
            'componentsSomatic': $('#addSpell fieldset input#inputSpellComponentsSomatic').val(),
            'componentsMaterial': $('#addSpell fieldset input#inputSpellComponentsMaterial').val(),
            'componentsMaterialDescription': $('#addSpell fieldset input#inputSpellComponentsMaterialDescription').val(),

            'durationAmount': $('#addSpell fieldset input#inputSpellDurationAmount').val(),
            'durationConcentration': $('#addSpell fieldset input#inputSpellDurationConcentration').val(),

            'description': $('#addSpell fieldset input#inputSpellDescription').val(),
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newSpell,
            url: '/api/spells',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.message === "Spell added to the spell list!") {

                // Clear the form inputs
                $('#addSpell fieldset input').val('');

                // Update the table
                listSpells();
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.message);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
