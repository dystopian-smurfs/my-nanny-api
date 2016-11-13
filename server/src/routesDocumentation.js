/**
* @api {post} /login Login
* @apiName UserLogin
* @apiGroup Auth
*
* @apiParamExample POST format:
*     {
*       "account": {
*         "amazonId": "999888777666"
*       },
*     }
*
* @apiSuccess {String} Successfully logged in.
*
* @apiError Failed to log in.
*/

/**
* @api {post} /logout Logout
* @apiName UserLogout
* @apiGroup Auth
*
*
* @apiSuccess {String} Successfully logged out.
*
* @apiError Failed to log out.
*/

/**
* @api {post} /signup Signup
* @apiName UserSignup
* @apiGroup Auth
*
* @apiParamExample POST format:
*     {
*       "account": {
*         "token": "1234",
*         "username": "Mary",
*         "amazonId": "999888777666",
*         "timeZone": "EST",
*         "phone": "1234567890",
*         "email": "mary@example.com"
*       },
*     }
*
* @apiSuccess {String} Account successfully created.
*
* @apiError Failed to create account.
*/

/**
* @api {PUT} /api/account Update Account
* @apiName UserUpdate
* @apiGroup Account
*
* @apiParamExample PUT format:
*     {
*       "account": {
*         "amazonId": "999888777666"
*       },
*       "updatedAccount": {
*         "username": "Mary",
*         "timeZone": "EST",
*         "phone": "9990009999",
*         "email": "mary@anotherExample.com"
*       },
*     }
*
* @apiSuccess {String} Successfully updated account.
*
* @apiError Failed to update account.
*/

/**
* @api {post} /api/children Add Child to Account
* @apiName UserChildren
* @apiGroup Children
*
* @apiParamExample POST format:
*     {
*       "account": {
*         "amazonId": "999888777666"
*       },
*       "child": {
*         "name": "Winston",
*         "phone": "8887776666"
*       },
*     }
*
* @apiSuccess {String} Successfully added child.
*
* @apiError Failed to add child.
*/

/**
* @api {PUT} /api/children Update a child
* @apiName UserChildren
* @apiGroup Children
*
* @apiParamExample PUT format:
*     {
*       "account": {
*         "amazonId": "999888777666"
*       },
*       "child": {
*         "name": "Winston",
*       },
*       "updatedChild": {
*         "name": "Oliver",
*         "phone": "2223334444"
*       },
*     }
*
* @apiSuccess {String} Successfully updated child.
*
* @apiError Failed to update child.
*/
