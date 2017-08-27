angular.module('animalStoreApp')
    .filter("formatDate", function () {
    return function (item) {
    	if (true) {
			var dateParts = item.substring(0,10).split('-');
			var timePart = item.substr(11);
			var time = timePart[0] + timePart[1] + timePart[2] + timePart[3] + timePart[4]; 
			item = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0] /*+ ' ' + time*/;
			return item
		} else if (item != null) {
            return new Date(item);
        } 
        return "";
    };
  });
