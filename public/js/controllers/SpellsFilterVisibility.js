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

         getSpellsToShow : function(spells, spellSchools, spellLevels) {
            var visibleSpellSchoolSpells = getSpellIdsForSpellSchools(spells, spellSchools);
            var visibleSpellSchoolLevels = getSpellIdsForSpellLevels(spells, spellLevels);

            var allVisibleSpellIds = getIdCutSet(visibleSpellSchoolLevels, visibleSpellSchoolSpells);

            var visibleSpells = this.getSpellObjectsFromSpellIds(spells, allVisibleSpellIds);
            return visibleSpells;
         }
      };

      function getIdCutSet(set1, set2) {
         var cutSet = [];
         angular.forEach(set1, function(element1) {
            angular.forEach(set2, function(element2) {
               if(element1 === element2) {
                  this.push(element1);
                  return;
               }
            }, cutSet);
         });

         return cutSet;
      }

      function getSpellIdsForSpellSchools(spells, spellSchools) {
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
         return allVisibleSpellIds;
      }

      function getSpellIdsForSpellLevels(spells, spellLevels) {
         var allVisibleSpellIds = [];
         angular.forEach(spellLevels, function(singleSpellLevel) {

            if(singleSpellLevel.isVisible) {
               var spellsForThisSpellLevel = [];

               angular.forEach(spells, function(spell) {
                  if(spell.level === singleSpellLevel.level) {
                     this.push(spell._id);
                  }

               }, spellsForThisSpellLevel);

            }

            this.push.apply(this, spellsForThisSpellLevel);
         }, allVisibleSpellIds);
         return allVisibleSpellIds;
      }
});
