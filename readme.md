

1. Clone the Git repository:

   - Open your terminal.
   - Navigate to the desired directory where you want to clone the repository.
   - Run the following command to clone the repository:
     git clone <repository_url>

2. Navigate to the server directory:

   - In the terminal, change the directory to the server folder of the cloned repository:
     cd <repository_directory>/server

3. Install the necessary dependencies:

   - Run the following command to install the required dependencies using npm:
     npm install

4. Import the Postman file:

   - Open the Postman application.
   - Click on the "Import" button in the top-left corner.
   - Choose the Postman file (.json) that you want to import.
   - Follow the instructions to import the file into Postman.

5. Register admin and normal user:

   - In the Postman application, locate the createUser request in the users folder.
   - Send a request to register an admin user and a normal user by providing the necessary details.
   - Repeat this step for both the admin and normal user registrations.

6. Login process:

   - In the Postman application, locate the login request in the user folder.
   - Send a request to login using the credentials of the admin user and the normal user.
   - Collect the adminToken and normalUserToken from the response and store them in Postman environment variables for future use.

7. Access all APIs:
   - Now, you can access all the APIs using the adminToken and normalUserToken.
   - Make sure the respective token is included in the Authorization header or as a query parameter, depending on your API requirements.
   - Explore and use the available APIs as per your needs.

By following these steps, you should be able to clone the Git repository, set up the server, import the Postman file, register users, perform the login process, and access the APIs using the generated tokens.

Please find below the details of the practical task we would like you to complete:

Task Description:
Your task is to create a simple RESTful API using Node.js and Express.js. The API should allow users to perform basic CRUD operations (Create, Read, Update, Delete). The API should include the following functionalities:

## Table1:

post_id (primary),
DA (int (0 to 100)),
PA (int (0 to 100)),
DR (int (0 to 100)),
premium (bool),

---

- Create Auth module with two roles (Admin, Client);
- Admin can CRUD rights to add records in "Table1";
- Client have only rights to list and view records;
- Clients can request to delete posts. Admin can view and approve requests.

Requirements:

Use the Express.js framework to create the API.
Implement proper error handling and validation for the API endpoints.
Use any database of your choice to store the resources (e.g., MongoDB, MySQL, etc.).
Write clear and concise documentation on how to use your API.

Submission Guidelines:

Create a new GitHub repository for your project.
Implement the RESTful API based on the task requirements mentioned above.
Commit your code and ensure it is well-structured and maintainable.
Include a README.md file with clear instructions on how to set up and run your application.
Share the repository on github account "ms.dev20@gmail.com" with us when you have