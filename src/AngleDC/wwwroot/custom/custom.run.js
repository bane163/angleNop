(function () {
	'use strict';

	angular
        .module('custom')
        .run(appCustomRun);

	appCustomRun.$inject = ['authService'];

	function appCustomRun(authService) {
		authService.fillAuthData();
	}

})();

