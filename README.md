FlexFeed - A Gym-Rat’s Social Media

**Index:**

[**i. Use Cases**](#i-use-cases)

[**ii. Models**](#iii-models)

[**iii. Controllers (API Routes)**](#iv-controllers-api-routes)

[**iv. Technologies Used**](#v-technologies-used)

[**v. Credits**](#vi-credits)


## i. Use Cases

|                    |                                                                                                                      |                     |                |
| :----------------: | :------------------------------------------------------------------------------------------------------------------: | :-----------------: | :------------: |
|  Name of use case: |                                                Sharing Workout Routine                                               |                     |                |
|     Created By:    |                                                    Phoenix Staley                                                    |   Last Updated By:  | Phoenix Staley |
|    Date Created:   |                                                       1/29/2025                                                      | Last Revision Date: |    1/29/2025   |
|    Description:    |                                A logged-in user wants to share their workout routine.                                |                     |                |
|       Actors:      |                                            A normal user, with an account.                                           |                     |                |
|   Preconditions:   |                                        The user has logged into their account.                                       |                     |                |
|        Flow:       | The user clicks on the post button, writes a post about their routine, attaches any images, and posts that publicly. |                     |                |
| Alternative Flows: |                                                          N/A                                                         |                     |                |
|     Exceptions:    |                          The user does not have an account, or they do not fill in the post.                         |                     |                |
|    Requirements:   |                                               The user has an account.                                               |                     |                |

\


|                    |                                                                                                   |                     |                |
| :----------------: | :-----------------------------------------------------------------------------------------------: | :-----------------: | :------------: |
|  Name of use case: |                                       ADMIN - Delete A Post                                       |                     |                |
|     Created By:    |                                           Phoenix Staley                                          |   Last Updated By:  | Phoenix Staley |
|    Date Created:   |                                             1/31/2025                                             | Last Revision Date: |    1/31/2025   |
|    Description:    |    An admin user wants to remove a post that goes against community guidelines for the web app.   |                     |                |
|       Actors:      |                                              An admin                                             |                     |                |
|   Preconditions:   |                            The user is logged in with an admin account                            |                     |                |
|        Flow:       | The user goes from the home page, to the post in question, and then clicks a button to remove it. |                     |                |
| Alternative Flows: |                                                N/A                                                |                     |                |
|     Exceptions:    |                     The admin does not have admin privileges on their account.                    |                     |                |
|    Requirements:   |                  The admin has logged in recently, and is able to find the post.                  |                     |                |

|                    |                                                                                                                                                                                                          |                     |        |
| :----------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------: | :----: |
|  Name of use case: |                                                                                               User Sign up                                                                                               |                     |        |
|     Created By:    |                                                                                                Ivan Duenas                                                                                               |   Last Updated By:  |  Team  |
|    Date Created:   |                                                                                                  2/3/25                                                                                                  | Last Revision Date: | 2/5/25 |
|    Description:    |                                                                                     A new user is looking to sign up                                                                                     |                     |        |
|       Actors:      |                                                                                                Normal User                                                                                               |                     |        |
|   Preconditions:   |                                                  User must have valid gmail address, User must have access to the internet and a compatible web browser.                                                 |                     |        |
|        Flow:       | The user enters their full name, email address, and password.The system validates the email format and password strength.The user is redirected to the login page and can log in with their credentials. |                     |        |
| Alternative Flows: |                                                  If the user enters an invalid email format, the system prompts the user to enter a valid email address                                                  |                     |        |
|     Exceptions:    |                                               If the provided email is already registered, the system notifies the user and prompts them to log in instead.                                              |                     |        |
|    Requirements:   |                                                           The system must validate email addresses and passwords before allowing registration.                                                           |                     |        |

\


|                    |                                                                                                                                                                                                                                |                     |             |
| :----------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------: | :---------: |
|  Name of use case: |                                                                                                           User Login                                                                                                           |                     |             |
|     Created By:    |                                                                                                           Ivan Duenas                                                                                                          |   Last Updated By:  | Ivan Duenas |
|    Date Created:   |                                                                                                             2/3/25                                                                                                             | Last Revision Date: |    2/3/25   |
|    Description:    |                                                                           A registered user wants to log in to their account to access the platform.                                                                           |                     |             |
|       Actors:      |                                                                                                           Normal User                                                                                                          |                     |             |
|   Preconditions:   |                                                                 The user must have a registered and verified account.The system must be online and operational.                                                                |                     |             |
|        Flow:       | The user navigates to the login page.The user enters their email and password.The system verifies that the password matches the stored credentials.If authentication is successful, the user is redirected to their dashboard. |                     |             |
| Alternative Flows: |         If the user enters incorrect credentials, the system displays an error message and allows them to try again.If the user forgets their password, they can click "Forgot Password" to initiate a password reset.         |                     |             |
|     Exceptions:    |                                                                  if the system is down for maintenance, the user sees a notification and is unable to log in.                                                                  |                     |             |
|    Requirements:   |                                                                                  The system must securely store and validate user credentials.                                                                                 |                     |             |

\


|                    |                                                                                                                                                                                                                                                                                                                                                                                                        |                     |              |
| :----------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------: | :----------: |
|  Name of use case: |                                                                                                                                                                                               Make a Post                                                                                                                                                                                              |                     |              |
|     Created By:    |                                                                                                                                                                                              Nihal Thomas                                                                                                                                                                                              |   Last Updated By:  | Nihal Thomas |
|    Date Created:   |                                                                                                                                                                                                 2/3/25                                                                                                                                                                                                 | Last Revision Date: |    2/3/25    |
|    Description:    |                                                                                                                                A logged-in user wants to create and share a post containing text, an image, and a post button to publish their content on the platform.                                                                                                                                |                     |              |
|       Actors:      |                                                                                                                                                                                    Normal User (who has an account)                                                                                                                                                                                    |                     |              |
|   Preconditions:   |                                                                                                                                              The user must be logged into their account.The user must have access to a compatible device and web browser.                                                                                                                                              |                     |              |
|        Flow:       | 1. The user navigates to the "Create Post" page.

2. The user enters a title for their post.

3. The user writes the body of their post.

4. The user clicks the "Select File" button to attach an image.

5. The user confirms the file selection.

6. The user clicks the "Post" button to publish their content.

7. The system saves the post and makes it visible to other users on the platform. |                     |              |
| Alternative Flows: |                                                                                                                                                            If the user decides not to attach an image, they can still proceed with posting.                                                                                                                                                            |                     |              |
|     Exceptions:    |                                                               If the user is not logged in, they are prompted to log in first.If the post body is left empty, the system displays an error message prompting the user to add content.If the uploaded file format is not supported, the system notifies the user and prevents the upload.                                                               |                     |              |
|    Requirements:   |                                                                                             The user must have an account.The system must allow text input, file upload, and post submission.The system must validate post content before submission.The system must store and display the post correctly.                                                                                             |                     |              |

\


|                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                     |        |
| :----------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------: | :----: |
|  Name of use case: |                                                                                                                                                                                                                   Delete User’s Own Post                                                                                                                                                                                                                  |                     |        |
|     Created By:    |                                                                                                                                                                                                                        Nihal Thomas                                                                                                                                                                                                                       |   Last Updated By:  |  Team  |
|    Date Created:   |                                                                                                                                                                                                                           2/3/25                                                                                                                                                                                                                          | Last Revision Date: | 2/5/25 |
|    Description:    |                                                                                                                                                                                               A logged-in user wants to delete a post they previously made.                                                                                                                                                                                               |                     |        |
|       Actors:      |                                                                                                                                                                                                  Normal User (who has an account and has created a post)                                                                                                                                                                                                  |                     |        |
|   Preconditions:   |                                                                                                                                                                             The user must be logged into their account.The user must have at least one post they have created.                                                                                                                                                                            |                     |        |
|        Flow:       | 1. The user navigates to their profile or the post they wish to delete.

2. The user clicks on the "Options" or "More" button (e.g., three dots icon).

3. The user selects the "Delete Post" option.

4. A confirmation prompt appears asking if they are sure about deleting the post.

5. The user confirms the deletion.

6. The system removes the post from the platform.

7. A success message appears, confirming that the post has been deleted. |                     |        |
| Alternative Flows: |                                                                                                                                                                                  If the user changes their mind at the confirmation prompt, they can cancel the deletion.                                                                                                                                                                                 |                     |        |
|     Exceptions:    |                                                                                                                     If the user is not logged in, they are prompted to log in first.If the post does not belong to the user, they cannot delete it.If there is a system error, the deletion fails, and an error message is displayed.                                                                                                                     |                     |        |
|    Requirements:   |                                                                                         The user must be able to access their posts.The system must verify that the user is the post owner before allowing deletion.The system must confirm the deletion before permanently removing the post.The system must ensure the post is no longer visible after deletion.                                                                                        |                     |        |

|                    |                                                                                                                         |                     |                |
| :----------------: | :---------------------------------------------------------------------------------------------------------------------: | :-----------------: | :------------: |
|  Name of use case: |                                                       View a Post                                                       |                     |                |
|     Created By:    |                                                      Phoenix Staley                                                     |   Last Updated By:  | Phoenix Staley |
|    Date Created:   |                                                          2/5/25                                                         | Last Revision Date: |     2/5/25     |
|    Description:    |                                          A user views a post from the homepage.                                         |                     |                |
|       Actors:      |                                                  A user with an account                                                 |                     |                |
|   Preconditions:   |                                                  The user is logged in                                                  |                     |                |
|        Flow:       |           A user visits the website, logs in, is redirected to the home page, and clicks on a post to view it.          |                     |                |
| Alternative Flows: | A user visits the website, is already logged in, and is already on the home page, before clicking on a post to view it. |                     |                |
|     Exceptions:    |                                              A user doesn’t have an account                                             |                     |                |
|    Requirements:   |                                                 The user has an account                                                 |                     |                |



## ii. Models

**User**:

id Integer Unique

fullName String Display name

email String Unique email address

password String User’s password

**Post**:

id Integer Unique

username String The poster’s username

title String

media String An optional link to an image/video

type Enum “image” or “video”

content String A long string of text, the post’s body

created\_at DateTime The time it was posted

**Comment**:

id Integer Unique

username String The commenter’s username

post\_id Integer The ID of the associated post

content String The comment’s content

created\_at DateTime The time the comment was created


********


## iii. Controllers (API Routes)

/api/user/:

Method: POST

Body:

username (string)

email (string, must be valid email)

password (string): user’s unencrypted password

Return:

A JSON formatted User object of the newly created user

Exceptions:

400: One or more body properties missing or invalidly formatted

/api/user/login/:

Method: PUT

Body:

email (string, must be valid email): user’s email

password (string): user’s (unencrypted) password

Return:

A JSON formatted User object of the found user

Exceptions:

400: One or more body properties missing or invalidly formatted

401: Incorrect password

404: User not found with the given email

/api/post/:

Method: GET

Return:

A JSON formatted object, with a “posts” property, that has an array of Post objects, sorted by most recently posted

Exceptions:

/api/post/:postID/:

Method: GET

Return:

A JSON formatted version of the Post object with id = postID

This will include populated comments

Exception:

404: No post with id = postID

/api/post/:

Method: PUT

Body:

title (string, minimum 3 characters in length): the post’s title

body (string, non-empty): the post’s text body

mediaLink (string): link to the post’s img/video, in S3 bucket

Return:

A JSON formatted version of the new Post object

Exceptions:

400: One or more body properties missing or invalidly formatted

401: Not logged in

/api/post/:postID/:

Method: DELETE

Return:

201: Successfully deleted

Exceptions:

404: Post not found in the database

401: Not logged in as the poster or an admin

/api/comment/:

Method: GET

Body:

postID (int)

content (string)

Return:

A JSON formatted version of the new comment

Exceptions:

400: Not logged in

404: No post with the given post id found

/api/media/:

Handles the uploading and requesting of media.

Currently unused.

/api/\*:

Exceptions:

404: API path not found

5XX: Error on the server side


## iv. Technologies Used

**Dependencies**:

- Sequelize & Sequelize’s “Connect Session” Module

  - Used to handle SQL queries, and connect to a SQL DB

* Sqlite (Version: Sqlite3) & Sequelize’s Sqlite3 Module

  - Used to more easily store databases locally

- AWS SDK

  - Used to create a connection to AWS

* Dotenv

  - Used to hold AWS connection credentials

- Express & Express’s “List Endpoints” and “Session” Modules

  - Used to run the server, and keep track of user sessions

* Multer & Multer’s S3 Module

  - Used to communicate with an S3 bucket

- Nodemon

  - Used to run the server in a way that updates during development

**File Structure**:

- Config/: Manages the DB connection

- Data/: Hold the .sqlite DB file

- Models/: Bundles the User, Post, and Comment models

- Public/: Holds all the publicly accessible files

  - Assets/: Contains the favicon

  - Pages/: Contains the non-homepage HTML files

- Routes/:

  - Backend/: Contains the API routes and the relevant .env file

  - Frontend/: Bundles the routes to each page

- Utils/: Contains useful miscellaneous files, including middleware

- index.js: The server file that runs with “npm run dev”


## v. Credits

Developed by Phoenix Staley, Ivan Duenas, and Nihal Thomas

Created for the Web Development class, CPTS 489, at Washington State University
