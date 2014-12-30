angular.module('SpellsAlphabetLinks', []).factory('SpellAnchors', function($http) {
      return {
         getAnchors : function(allSpells) {
            return allSpells;
         }
      };
});
