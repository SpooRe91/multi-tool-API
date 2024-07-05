---

# multi-tool-API

Welcome to the **multi-tool**! This API enables users to manage recipes, authenticate, and interact with various other features, such as fetching information about clans and accessing NASA data. Below you’ll find detailed information on how to use the API endpoints effectively.

---

## **Base URL**

All API endpoints are prefixed with the base URL:
```
https://mb-cook-server.vercel.app/
```

---

## **API Endpoints**

### **Recipes**

#### **Fetch All Recipes**
- **GET** `/api/`
- **Description:** Retrieve all available recipes.

#### **Fetch Recipe Details**
- **GET** `/api/details/{id}`
- **Description:** Retrieve detailed information about a specific recipe.
- **Parameters:** 
  - `id` (Path): Unique identifier for the recipe.

#### **Edit Recipe**
- **PUT** `/api/edit/{id}`
- **Description:** Update an existing recipe.
- **Authentication:** Required
- **Authorization:** Required
- **Parameters:** 
  - `id` (Path): Unique identifier for the recipe.

#### **Delete Recipe**
- **DELETE** `/api/{id}`
- **Description:** Remove a recipe from the database.
- **Authentication:** Required
- **Authorization:** Required
- **Parameters:** 
  - `id` (Path): Unique identifier for the recipe.

---

### **Authentication**

#### **Register**
- **POST** `/api/auth/register`
- **Description:** Register a new user.

#### **Login**
- **POST** `/api/auth/login`
- **Description:** Authenticate and log in an existing user.

#### **Logout**
- **GET** `/api/auth/logout`
- **Description:** Log out the current user.

---

### **Recipe Management**

#### **Browse Recipes**
- **GET** `/api/recipe/browse`
- **Description:** Retrieve all recipes in the database.

#### **My Recipes**
- **GET** `/api/recipe/myRecipes`
- **Description:** Retrieve recipes of the currently logged-in user.
- **Authentication:** Required

#### **Add Recipe**
- **POST** `/api/recipe/add`
- **Description:** Add a new recipe.
- **Authentication:** Required

---
### **Destiny 2**
### **Clan Information**

#### **Fetch Clan Info**
- **GET** `/api/clanInfo`
- **Description:** Retrieve information about the specific clan the app focuses on.

#### **Get Clan Members**
- **GET** `/api/getClanMembers`
- **Description:** Retrieve information about all clan members in the current clan.

#### **Get User Info**
- **GET** `/api/getUser/{id}`
- **Description:** Retrieve information about a specific Destiny 2 user.
- **Parameters:**
  - `id` (Path): Unique identifier for the user.

#### **Get Character Info**
- **GET** `/api/getCharacter/{membershipType}/{destinyMembershipId}`
- **Description:** Retrieve character information for a specific Destiny 2 user.
- **Parameters:**
  - `membershipType` (Path): Type of membership (e.g., Xbox, PlayStation, Steam).
  - `destinyMembershipId` (Path): Destiny 2 membership ID.

---

### **NASA Integration**

#### **Picture of the Day**
- **GET** `/api/nasa/pod`
- **Description:** Retrieve NASA's picture of the day.

#### **Search Astronomy Articles**
- **GET** `/api/nasa/articles/?query={string}`
- **Description:** Retrieve articles related to a specific topic in astronomy.
- **Parameters:**
  - `query` (Query): The topic to search articles for.

#### **Search Planet Info**
- **GET** `/api/nasa/planets/?query={string}`
- **Description:** Retrieve information about a specific planet.
- **Parameters:**
  - `query` (Query): The name of the planet to search for.

---

## **Notes**

- **Authentication & Authorization:** Endpoints requiring authentication typically need an access token, which should be included in the request headers. 
- **Error Handling:** Ensure proper error handling and validation in your requests to avoid issues.

---

Feel free to explore the endpoints and integrate the `multi-tool` API into your applications. If you have any questions or encounter issues, please open an issue or contact us.

Happy coding!

---

