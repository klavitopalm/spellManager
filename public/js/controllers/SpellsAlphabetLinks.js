angular.module('SpellsAlphabetLinks', []).factory('SpellAnchors', function($http) {
      return {
         getAnchors : function(allSpells) {

            var spellAnchors = {};

            for(var i = 0, lenLevel = allSpells.length; i<len; i++) {
               var firstLetterUppercase = (allSpells[i].name).charAt(0).toUpperCase();
               if(!(firstLetterUppercase in spellAnchors)) {
                  spellAnchors[firstLetterUppercase] = allSpells[i]._id;
               }

            }
            return spellAnchors;
         }
      };
});
