angular.module('SpellsAlphabetLinks', []).factory('SpellAnchors', function($http) {
      return {
         getAnchors : function(allSpells) {

            var spellAnchors = {};

            angular.forEach(allSpells, function(singleSpell) {
               var firstLetterUppercase = (singleSpell.name).charAt(0).toUpperCase();
               if(!(firstLetterUppercase in spellAnchors)) {
                  spellAnchors[firstLetterUppercase] = singleSpell._id;
               }
 
            });
            return spellAnchors;
         }
      };
});
