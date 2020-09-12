'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {

  Route.resource("/users", "UserController")
  Route.resource("/tags", "TagController")
  Route.resource("/blogs", "BlogController")
  Route.resource("/comments", "CommentController")

  // Route.get("/subjects/:id/teacher", "SubjectController.showTeacher")
  // Route.get("/subjects/:id/enrollment", "SubjectController.showEnrollment")

  // Route.get("/students/:id/group", "StudentController.showGroup")

}).prefix("api/v1")
