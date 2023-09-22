# Free Lunch Usage

This is a brief highlight of the expected usage/functionality of the Free Lunch App from the Backend standpoint.

Feel free to add/remove/edit any neccessary infomation here.

Link to endpoints declaration
[https://benrobo.notion.site/benrobo/Free-Lunch-Endpoint-9ffcb74dfe274c968fa412553e015791](https://benrobo.notion.site/benrobo/Free-Lunch-Endpoint-9ffcb74dfe274c968fa412553e015791)

Link to database schema
[https://drawsql.app/teams/benrobo/diagrams/free-lunch](https://drawsql.app/teams/benrobo/diagrams/free-lunch)

- ### User luanches the App and has Three options:

  1. Create Organization
  2. Join Existing Organization using invite
  3. Login to App

  ### Create Organization:

  user registers himself; along with the organization's Info. He automatically gets the admin role.

  #### Endpoint (ideally could be done in single request)

  `/api/auth/user/signup` - `POST`

  `/api/organization/create` - `PUT`

  ### Join Existing Organization:

  user registers using the verification token/link sent via the invite.

  #### Endpoint

  `/api/organization/staff/signup` - `POST` (could be `/api/organizations/:org_id/users`)

  ### Login to App:

  Login to App using email and password.

  #### Endpoint

  `/api/auth/login` - `POST`

- ### Logged in Admin User:

  1. create/share invite to invitees email

     `/api/organization/invite` - `POST`

  2. delete user form organization (to be considered)

- ### All Logged in User(including Admin):

  1. view profile

     `/api/user/profile` - `GET` (ideally should be `/api/users/:user_id`)

  2. view all employees

     `/api/users` - `GET`

  3. search for employee

     `/api/search/:name_or_email` - `GET`

  4. view received lunch(es)

     `/api/lunch/all` - `GET` (could be `/api/users/:user_id/lunch`)

  5. send lunch

     `/api/lunch/send` - `POST`

  6. get all lunch

     `/api/lunch/` - `GET`

  7. get a lunch details

     `/api/lunch/:lunch_id` - `GET`

  8. redeem lunch

     `/api/withdrawal/request` - `GET` (could be `/api/withdrawal`)

  9. add bank details

     `/api/user/bank` - `POST` (could be `/api/users/:user_id/bank`)
