var allClassesWithSpells = [];

$(function() {

   listClasses();

   // Spell link click

   // Delete spell link click
   $('#spellList').on('click', 'li a.linkDeleteSpell', deleteSpell);

   // Edit spell link click
   $('#classList').on('click', 'li a.linkEditClass', editClassSpells);

   // Add User button click
   $('#buttonAddClass').on('click', submitClass);


});

function listClasses() {
   // Empty content string
   var divContent = '';

   // jQuery AJAX call for JSON
   $.getJSON('/api/classspells', function( data ) {

   allClassesWithSpells = data;

      // For each item in our JSON, add a list element
      $.each(data, function(){

         divContent += '<li>';

         divContent += '<a href="#" class="linkEditClass" rel="'
         + this._id + '" title="Edit '+ this._id+'">'+this._id+'</a>';

         divContent += '<a href="#" class="linkDeleteClass" rel="'
         + this._id + '" title="Delete '+ this._id+'">delete</a>';


         divContent += '</li>';
      });

      // Inject the whole content string into our existing HTML list
      $('#classList').html(divContent);


   });
}


function editClassSpells(event) {
   // Prevent Link from Firing
   event.preventDefault();

   // Retrieve spellname from link rel attribute
   var thisClassId = $(this).attr('rel');

   // Get our Spell Object
   var thisClassObject = getClassObjectFromId(thisClassId);

   var divContent = '';
   $.getJSON('/api/spells', function( data ) {
      // For each item in our JSON, add a list element
      $.each(data, function(){

         divContent += '<li>';

         divContent += this._id +
                       ': <input id="' + getClassSpellCheckboxId(this._id) + '" type="checkbox" title="' +
                       this._id +
                       '">';

         divContent += '</li>';
      });

      $('#spellList').html(divContent);
      checkClassSpells(thisClassObject);
   });

   $('.selectedClassHeader').html(" - " + thisClassId);
   $('#inputClassName').val(thisClassId);

}

function getClassSpellCheckboxId(name) {
   return 'classSpell'+ name.replace(/[^a-zA-Z0-9]/g,'_');
   //return 'classSpell'+ name.replace(/ /g, '');
}

function checkClassSpells(selectedClass) {
   // For each item in our JSON, add a list element
   $.each(selectedClass.spells, function(){

      $('#'+getClassSpellCheckboxId(this._id)).prop('checked',true);
   });
}

function getClassObjectFromId(id) {
   // Get Index of object based on id value
   var arrayPosition = allClassesWithSpells.map(function(arrayItem)
    { return arrayItem._id; }).indexOf(id);

   // Get our Spell Object
   return allClassesWithSpells[arrayPosition];
}

function submitClass(event) {
    event.preventDefault();


    $.getJSON('/api/spells', function( data ) {
      // For each item in our JSON, add a list element
      var spells = [];

      $.each(data, function(){

         if($('#spellList input#' + getClassSpellCheckboxId(this._id)).is(':checked')) {
         spells.push(this._id);

         }


      });

     // If it is, compile all user info into one object
     var classSpellContents = {
         'name': $('#createClass input#inputClassName').val(),
         'spells': spells
     }

     // Use AJAX to post the object to our adduser service
     $.ajax({
         type: 'POST',
         data: classSpellContents,
         url: '/api/classspells',
         dataType: 'JSON'
     }).done(function( response ) {

         // Check for successful (blank) response
         if (response.message === "submitted") {

             // Clear the form inputs
             $('#createClass input#inputClassName').val(''),
             // Clear the form checkboxes
             //$('#addSpell fieldset input').prop('checked', false);

             // Update the spells list
             listClasses();
         }
         else {
             // If something goes wrong, alert the error message that our service returned
             alert('Error: ' + response.message);
         }
     });
   });


};

function deleteSpell(event) {
   event.preventDefault();

   var clickedSpellId = $(this).attr('rel')

   // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete the spell: ' +clickedSpellId+ '?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/api/spells/' + clickedSpellId
        }).done(function( response ) {
            // Check for a successful (removed) response
            if (response.message === 'removed') {
            }
            else {
                alert('Error: ' + response.message);
            }

            // Update the spells list
            listClasses();
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
   var thisSpellObject = getClassObjectFromId(thisSpellId);

   populateSpellInputBoxes(thisSpellObject);
}

function populateSpellInputBoxes(spellObject) {
   $('#inputSpellName').val(spellObject._id);
   $('#inputSpellLevel').val(spellObject.level);
   $('#inputSpellType').val(spellObject.type);
   $('#inputSpellRitual').prop('checked',spellObject.ritual);

   $('#inputSpellCastingTimeValue').val(spellObject.castingTime.value);
   $('#inputSpellCastingTimeUnit').val(spellObject.castingTime.unit);

   $('#inputSpellRangeValue').val(spellObject.range.value);
   $('#inputSpellRangeDescription').val(spellObject.range.description);

   $('#inputSpellComponentsVerbal').prop('checked',spellObject.components.verbal);
   $('#inputSpellComponentsSomatic').prop('checked',spellObject.components.somatic);
   $('#inputSpellComponentsMaterial').prop('checked',spellObject.components.material);
   $('#inputSpellComponentsMaterialDescription').val(spellObject.components.materialDescription);

   $('#inputSpellDurationAmount').val(spellObject.duration.amount);
   $('#inputSpellDurationConcentration').prop('checked',spellObject.components.concentration);

   $('#inputSpellDescription').val(spellObject.description);
}
