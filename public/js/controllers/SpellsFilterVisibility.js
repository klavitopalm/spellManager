angular.module('SpellsFilterVisibility', []).factory('VisibleSpells', function($http) {
      return {
         getSpellObjectsFromSpellIds : function(allSpells, visibleSpellIds) {
            var spellObjectsToBeShown = [];

               for(var i = 0, len = visibleSpellIds.length; i < len; i++) {

                  for(var t = 0, lenAllSpells = allSpells.length; t < lenAllSpells; t++) {
                     if(allSpells[t]._id === visibleSpellIds[i]) {
                        spellObjectsToBeShown.push(allSpells[t]);
                        break;
                     }
                  }

               }

            return spellObjectsToBeShown;
         },

         getSpellsToShow : function(spells, spellSchools, spellLevels, spellConcentration, spellRitual) {
            var visibleSpells = [];
            if(spells && spellSchools && spellLevels && spellConcentration && spellRitual) {
               var visibleSpellSchoolSpells = getSpellIdsForSpellSchools(spells, spellSchools);
               var visibleSpellLevelSpells = getSpellIdsForSpellLevels(spells, spellLevels);
               var visibleSpellConcentration = getSpellIdsForSpellConcentration(spells, spellConcentration);
               var visibleSpellRitual = getSpellIdsForSpellRitual(spells, spellRitual);

               var allVisibleSpellIds = getIdCutSet(visibleSpellLevelSpells, visibleSpellSchoolSpells);
               var allVisibleSpellIds = getIdCutSet(allVisibleSpellIds, visibleSpellConcentration);
               var allVisibleSpellIds = getIdCutSet(allVisibleSpellIds, visibleSpellRitual);

               visibleSpells = this.getSpellObjectsFromSpellIds(spells, allVisibleSpellIds);

               visibleSpells = visibleSpells.sort(function(a, b){
                  if(a.name < b.name) return -1;
                  if(a.name > b.name) return 1;
                  return 0;
               })
               // getRemainderNamesFromSets(spells, visibleSpells);
            }
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

         if(set1 && set2) {
            for(var t = 0, len1 = set1.length; t<len1; t++){
               for(var i = 0, len2 = set2.length; i<len2; i++){

                  if(set1[t] === set2[i]) {
                     cutSet.push(set1[t]);
                     break;
                  }
               }
            }
         }

         return cutSet;
      }

      function getSpellIdsForSpellSchools(spells, spellSchools) {
         var allVisibleSpellIds = [];
         for(var t = 0, lenSchools = spellSchools.length; t<lenSchools; t++) {

            if(spellSchools[t].isVisible) {
               var spellsForThisSpellSchool = [];

               for(var i = 0, lenSpells = spells.length; i<lenSpells; i++) {
                  if(spells[i].type.toLowerCase() === spellSchools[t].name.toLowerCase()) {
                     spellsForThisSpellSchool.push(spells[i]._id);
                  }
               }

            }

            allVisibleSpellIds.push.apply(allVisibleSpellIds, spellsForThisSpellSchool);
         }

         return allVisibleSpellIds;
      }

      function getSpellIdsForSpellLevels(spells, spellLevels) {
         var allVisibleSpellIds = [];
         for(var i = 0, lenLevel = spellLevels.length; i<lenLevel; i++) {

            if(spellLevels[i].isVisible) {
               var spellsForThisSpellLevel = [];

               for(var t = 0, lenSpells = spells.length; t<lenSpells; t++) {
                  if(spells[t].level === spellLevels[i].level) {
                     spellsForThisSpellLevel.push(spells[t]._id);
                  }
               }

            }
            allVisibleSpellIds.push.apply(allVisibleSpellIds, spellsForThisSpellLevel);
         }
         return allVisibleSpellIds;
      }

      function getSpellIdsForSpellConcentration(spells, spellConcentration) {
         var allVisibleSpellIds = [];

         if(spellConcentration.hideOthers) {
            for(var i = 0, lenSpells = spells.length; i<lenSpells; i++) {
               if(spells[i].duration.concentration) {
                  allVisibleSpellIds.push(spells[i]._id);
               }
            }
         }
         else {
            for(var i = 0, lenSpells = spells.length; i<lenSpells; i++) {
               allVisibleSpellIds.push(spells[i]._id);
            }
         }

         return allVisibleSpellIds;
      }

      function getSpellIdsForSpellRitual(spells, spellRitual) {
         var allVisibleSpellIds = [];

         if(spellRitual.hideOthers) {
            for(var i = 0, lenSpells = spells.length; i<lenSpells; i++) {
               if(spells[i].ritual) {
                  allVisibleSpellIds.push(spells[i]._id);
               }
            }
         }
         else {
            for(var i = 0, lenSpells = spells.length; i<lenSpells; i++) {
               allVisibleSpellIds.push(spells[i]._id);
            }
         }

         return allVisibleSpellIds;
      }
});
