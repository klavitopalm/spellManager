angular.module('SpellsFilterVisibility', []).factory('VisibleSpells', function($http) {
      return {
         getSpellObjectsFromSpellIds : function(allSpells, visibleSpellIds) {
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
         },

         getSpellsToShow : function(spells, spellSchools) {

            var allVisibleSpellIds = [];

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

            visibleSpells = this.getSpellObjectsFromSpellIds(spells, allVisibleSpellIds);
            return visibleSpells;
         }
      };
});
