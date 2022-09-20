import Route from "@ioc:Adonis/Core/Route"

Route.group(() => {

    /**
     * News
     */

    Route.group(() => {

        Route.get('/', 'Api/NewsController.paginate')
        Route.get('/:id', 'Api/NewsController.get')
    
    }).prefix('news')
}).prefix('api')