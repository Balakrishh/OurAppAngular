(()=> {

  class AppComponent {

    static factory() {
      return {
        scope: {},
        bindToController: {},
        templateUrl: '/app/app-component.html',
        controller: AppComponent,
        controllerAs: '$ctrl',
        link: ( scope, element, attrs, controller: AppComponent )=> {controller.ngOnInit()}
      }
    }

    selected = null;
    selectedItem = null;
    views = [];

    constructor(
      private viewService,
      private $mdSidenav: ng.material.ISidenavService,
      private $mdBottomSheet: ng.material.IBottomSheetService,
      private $log: ng.ILogService,
      private $scope: ng.IScope,
      private $state: ui.router.state,
      private  $timeout:ng.ITimeoutService
    ) {}

    ngOnInit() {
      // Load all registered views

      this.viewService
        .loadAllViews()
        .then( ( views )=> {
          this.views = [].concat( views );
          this.selected = views[ 0 ];
        } );
    }

    /**
     * Hide or Show the 'left' sideNav area
     */
    toggleViewsList() {
      this.$mdSidenav( 'left' ).toggle();
    }

    /**
     * Select the current avatars
     * @param viewId
     */
    selectView( viewId ) {

      this.selected = angular.isNumber( viewId )
        ? this.views[ viewId ]
        : viewId;

      this.toggleViewsList();

    }

    navigate( viewId ) {
        this.$state.go('home');
        this.$timeout(()=> {
            this.$state.go(viewId);
            }, 100);
    }

    /**
     * Show the bottom sheet
     */
    share( $event ) {

      const bottomSheetConfig = {
        parent: angular.element( document.getElementById( 'content' ) ),
        template: `
        <md-bottom-sheet class="md-list md-has-header">
          <share-view contact="$ctrl.selected"></share-view>
        </md-bottom-sheet>
        `,
        scope: this.$scope.$new(),
        targetEvent: $event
      };

      this.$mdBottomSheet
        .show( bottomSheetConfig )
        .then( ( clickedItem )=> {
          this.$log.debug( `${clickedItem.name} clicked!` );
        } );

    }

  }

  angular
    .module( 'myApp' )
    .directive( 'app', AppComponent.factory )

})();
