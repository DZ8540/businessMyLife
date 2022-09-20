import Route from "@ioc:Adonis/Core/Route"

Route.group(() => {

    /**
     * Banners
     */

    Route.group(() => {

        Route.get('/', 'Api/BannersController.paginate')
        Route.get('/:id', 'Api/BannersController.get')
    
    }).prefix('banners')
}).prefix('api')