angular.module('SpellFilters', []).filter('spellRange', function() {
   return function(range, description) {
      var output = "";
      if(description === "") {
         if(!range) {
            output = description;
         }
         else if(range >= 5280) {
            var miles = range / 5280;
            var remainder  = range % 5280
            output = miles + getMilesString(miles) + " " + remainder + getFeetString(remainder);
         }
         else {
            output = range + getFeetString(range);
         }
      }
      else {
         output =  range ? range : '' + description;
      }
      return output;
   };

   function getFeetString(value) {
      if(value == 1) {
         return " foot";
      }
      else {
         return " feet";
      }
   }

   function getMilesString(value) {
      if(value == 1) {
         return " mile";
      }
      else {
         return " miles";
      }
   }

})
.filter('spellComponents', function() {
   return function(verbal, somatic, material, materialDescription) {
      var output = "";

      if(verbal) {
         output += "V";
      }
      if(somatic) {
         if(verbal) {
            output += ", "
         }
         output += "S";
      }
      if(material) {
         if(somatic) {
            output += ", "
         }
         output += "M (" + materialDescription + ")";
      }
      return output;
   };

})
.filter('spellConcentration', function() {
   return function(concentration) {
      var output = "";

      if(concentration) {
         output += "Concentration, ";
      }

      return output;
   };

})
.filter('spellDescription', function() {
   return function(input) {
      if(input) {
         var lines = input.split(/\r\n|\r|\n/g);
         var output = '';

         angular.forEach(lines, function(singleLine) {
            output += singleLine + "\n";
         });
         return output;
      }
      return input;
   };

});
