var allSpells = [];

$(function() {

   listSpells();

   // Spell link click
   $('#spellList').on('click', 'li a.linkShowSpell', showSpellInfo);

   // Delete spell link click
   $('#spellList').on('click', 'li a.linkDeleteSpell', deleteSpell);

   // Edit spell link click
   $('#spellList').on('click', 'li a.linkEditSpell', editSpell);

   // Add User button click
   $('#buttonAddSpell').on('click', submitSpell);


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
         + this._id + '" title="Show Details">' + this.name
         + '</a>';

         divContent += '<a href="#" class="linkDeleteSpell" rel="'
         + this._id + '" title="Delete '+ this.name+'">delete</a>';

         divContent += '<a href="#" class="linkEditSpell" rel="'
         + this._id + '" title="Edit '+ this.name+'">edit</a>';

         divContent += '</li>';
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
   var thisSpellId = $(this).attr('rel');

   // Get our Spell Object
   var thisSpellObject = getSpellObjectFromId(thisSpellId);

   //Populate Info Box
   populateSpellInfoBoxes(thisSpellObject);
}

function getSpellObjectFromId(id) {
   // Get Index of object based on id value
   var arrayPosition = allSpells.map(function(arrayItem)
    { return arrayItem._id; }).indexOf(id);

   // Get our Spell Object
   return allSpells[arrayPosition];
}

function populateSpellInfoBoxes(spellObject) {
   $('#spellName').text(spellObject.name);
   $('#spellLevel').text(spellObject.level);
   $('#spellType').text(spellObject.type);

   $('#spellCastingTimeValue').text(spellObject.castingTime.value);
   $('#spellCastingTimeUnit').text(spellObject.castingTime.unit);

   $('#spellRangeValue').text(spellObject.range.value);
   $('#spellRangeDescription').text(spellObject.range.description);

   $('#spellComponentsVerbal').text(spellObject.components.verbal);
   $('#spellComponentsSomatic').text(spellObject.components.somatic);
   $('#spellComponentsMaterial').text(spellObject.components.material);
   $('#spellComponentsMaterialDescription').text(spellObject.components.materialDescription);

   $('#spellDurationAmount').text(spellObject.duration.amount);
   $('#spellDurationConcentration').text(spellObject.duration.concentration);

   $('#spellDescription').text(spellObject.description);
}

function submitSpell(event) {
    event.preventDefault();

   //  // Super basic validation - increase errorCount variable if any fields are blank
   var errorCount = 0;

   //  $('#addSpell input').each(function(index, val) {
   //      if($(this).val() === '') { errorCount++; }
   //  });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var spellContents = {
            'name': $('#addSpell fieldset input#inputSpellName').val(),
            'type': $('#addSpell fieldset input#inputSpellType').val(),
            'level': $('#addSpell fieldset input#inputSpellLevel').val(),

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
         var restType = 'POST';
         if (isSpellNameAlreadyExisting(spellContents.name)) {
            restType = 'PUT';
         }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: restType,
            data: spellContents,
            url: '/api/spells',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.message === "added") {

                // Clear the form inputs
                $('#addSpell fieldset input').val('');

                // Update the spells list
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

function isSpellNameAlreadyExisting(name) {

   return false;
}

function deleteSpell(event) {
   event.preventDefault();

   // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete the spell?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/api/spells/' + $(this).attr('rel')
        }).done(function( response ) {
            // Check for a successful (removed) response
            if (response.message === 'removed') {
            }
            else {
                alert('Error: ' + response.message);
            }

            // Update the spells list
            listSpells();
        });
    }
    else {
        // If they said no to the confirm, do nothing
        return false;
    }
}

function editSpell(event) {
   event.preventDefault();

   // Retrieve spellname from link rel attribute
   var thisSpellId = $(this).attr('rel');

   // Get our Spell Object
   var thisSpellObject = getSpellObjectFromId(thisSpellId);

   populateSpellInputBoxes(thisSpellObject);
}

function populateSpellInputBoxes(spellObject) {
   $('#inputSpellName').val(spellObject.name);
   $('#inputSpellLevel').val(spellObject.level);
   $('#inputSpellType').val(spellObject.type);

   $('#inputSpellCastingTimeValue').val(spellObject.castingTime.value);
   $('#inputSpellCastingTimeUnit').val(spellObject.castingTime.unit);

   $('#inputSpellRangeValue').val(spellObject.range.value);
   $('#inputSpellRangeDescription').val(spellObject.range.description);

   $('#inputSpellComponentsVerbal').val(spellObject.components.verbal);
   $('#inputSpellComponentsSomatic').val(spellObject.components.somatic);
   $('#inputSpellComponentsMaterial').val(spellObject.components.material);
   $('#inputSpellComponentsMaterialDescription').val(spellObject.components.materialDescription);

   $('#inputSpellDurationAmount').val(spellObject.duration.amount);
   $('#inputSpellDurationConcentration').val(spellObject.duration.concentration);

   $('#inputSpellDescription').val(spellObject.description);
}
