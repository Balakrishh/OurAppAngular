(()=> {

  'use strict';

  /**
   * Bottom Sheet controller for the Avatar Actions
   */
  class ViewDetailComponent {

    view: any;

    static factory() {
      return {
        scope: {},
        bindToController: {
          view: '='
        },
        transclude: true,
        templateUrl: '/app/components/view-detail/view-detail.html',
        controller: ViewDetailComponent,
        controllerAs: '$ctrl',
        link: ( scope, element, attrs, controller: ViewDetailComponent )=> {controller.ngOnInit()}
      }
    };

    static $inject = [  ];
    constructor() {}

    ngOnInit() {}

  }

  angular.module('viewDetail')
    .directive( 'viewDetail', ViewDetailComponent.factory );


})();
