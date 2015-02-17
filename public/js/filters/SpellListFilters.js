angular.module('SpellListFilters', [])
.filter('spellSelection', function() {
   return function(spells, spellSchools) {
      var allVisibleSpellIds = [];
      var output = spells;
      if(spellSchools && spells){
         angular.forEach(spellSchools, function(singleSpellSchool) {

            if(singleSpellSchool.isVisible) {
               var spellsForThisSpellSchool = [];

               angular.forEach(spells, function(spell) {
                  if(spell.type.toLowerCase() === singleSpellSchool.name.toLowerCase()) {
                     this.push(spell._id);
                  }

               }, spellsForThisSpellSchool);

            }

            this.push.apply(this, spellsForThisSpellSchool);
         }, allVisibleSpellIds);

      }


      output = getSpellObjectsFromSpellIds(spells, allVisibleSpellIds);

      return output;
   };

   function getSpellObjectsFromSpellIds(allSpells, visibleSpellIds) {
      var spellObjectsToBeShown = [];

      angular.forEach(visibleSpellIds, function(spellId) {
            angular.forEach(allSpells, function(spell) {
               if(spell._id === spellId) {
                  this.push(spell);
                  return;
               }
            }, spellObjectsToBeShown);

      });

      return spellObjectsToBeShown;
   };

})
;
