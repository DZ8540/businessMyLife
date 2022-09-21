import Route from "@ioc:Adonis/Core/Route"

Route.group(() => {

    /**
     * Feedback
     */
    Route.group(() => {
        Route.post('/', 'Api/FeedbacksController.create')
    }).prefix('feedback')

}).prefix('api')