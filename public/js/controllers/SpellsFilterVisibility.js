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

         getSpellsToShow : function(spells, spellSchools, spellLevels, spellConcentration, spellRitual) {
            var visibleSpellSchoolSpells = getSpellIdsForSpellSchools(spells, spellSchools);
            var visibleSpellLevelSpells = getSpellIdsForSpellLevels(spells, spellLevels);
            var visibleSpellConcentration = getSpellIdsForSpellConcentration(spells, spellConcentration);
            var visibleSpellRitual = getSpellIdsForSpellRitual(spells, spellRitual);

            var allVisibleSpellIds = getIdCutSet(visibleSpellLevelSpells, visibleSpellSchoolSpells);
            var allVisibleSpellIds = getIdCutSet(allVisibleSpellIds, visibleSpellConcentration);
            var allVisibleSpellIds = getIdCutSet(allVisibleSpellIds, visibleSpellRitual);


            var visibleSpells = this.getSpellObjectsFromSpellIds(spells, allVisibleSpellIds);

            // if(spells) {
            //    getRemainderNamesFromSets(spells, visibleSpells);
            // }

            return visibleSpells;
         }
      };

      function getRemainderNamesFromSets(superset, subset) {
         var cutSet = [];
         var copyOfSuperset = [];
         var emptySet = [];

         for(var i = 0, len = superset.length; i<len; i++) {
            copyOfSuperset[i] = superset[i];
         }

         console.log("______________");
         // console.log("len superset: "+ superset.length);
         // console.log("len copyOfSuperset: "+ copyOfSuperset.length);

         for(var i = 0, len = superset.length; i<len; i++) {
            for(var t = 0, subLen = subset.length; t<subLen; t++) {
               if(superset[i]._id === subset[t]._id) {
                  emptySet.push(superset[i]);
                  break;
               }
            }
         }


         for(var i = 0, len = emptySet.length; i<len; i++) {
            var index = copyOfSuperset.indexOf(emptySet[i]);
            copyOfSuperset.splice(index, 1);
         }

         // console.log("len subset: "+ subset.length);
         // console.log("len copyOfSuperset: "+ copyOfSuperset.length);

         for(var i = 0, len = copyOfSuperset.length; i<len; i++) {
            console.log("name: "+ copyOfSuperset[i].name);

         }
      }

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

      function getSpellIdsForSpellConcentration(spells, spellConcentration) {
         var allVisibleSpellIds = [];

         if(spellConcentration.hideOthers) {
            angular.forEach(spells, function(spell) {
               if(spell.duration.concentration) {
                  this.push(spell._id);
               }
            }, allVisibleSpellIds);
         }
         else {
            angular.forEach(spells, function(spell) {
                  this.push(spell._id);
            }, allVisibleSpellIds);
         }

         return allVisibleSpellIds;
      }

      function getSpellIdsForSpellRitual(spells, spellRitual) {
         var allVisibleSpellIds = [];

         if(spellRitual.hideOthers) {
            angular.forEach(spells, function(spell) {
               if(spell.ritual) {
                  this.push(spell._id);
               }
            }, allVisibleSpellIds);
         }
         else {
            angular.forEach(spells, function(spell) {
                  this.push(spell._id);
            }, allVisibleSpellIds);
         }

         return allVisibleSpellIds;
      }
});
