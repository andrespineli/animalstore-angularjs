angular.module('animalStoreApp')
  .filter('phone', function () {
    return function (phone) {
      if (!phone) { return ''; }
        var value = phone.toString().trim().replace(/^\+/, '');
        if (value.match(/[^0-9]/)) {
            return phone;
        }
        var country, city, number;
        switch (value.length) {
          case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 2);
            number = value.slice(2);
            nono = '';
            break;

          case 11: // +CPPP####### -> CCC (PP) ###-####
            country = 1;
            city = value.slice(0, 2);
            nono = value.slice(2, 3);
            number = value.slice(3);
            break;
 
          default:
            return phone;
          }
        if (country == 1) {
          country = "";
        }

        number = number.slice(0, 4) + '-' + number.slice(4);
        return (country + " (" + city + ")  " + nono + " " + number).trim();
      };
  });
