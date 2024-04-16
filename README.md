# cineDataDB Client

## Description

cineDataDB Client is a front-end React application designed for users to explore and engage with a vast collection of movies. Users can register an account, personalize their list of favorite movies, view detailed information about each movie, and manage their user profile. The application is built with React and uses Bootstrap for styling, incorporating a responsive design for optimal viewing on various devices.

## Features

- Display a list of movies and detailed information about each movie.
- User registration and login functionality for personalized experiences.
- Ability to mark movies as favorites and manage a list of favorite movies.
- Dynamic navigation that adjusts based on the user's authentication status.
- User profile management, including updating personal information and deleting accounts.
- Movie filtering functionality allows users to search for movies by title.
- Recommendations for similar movies based on the movie details viewed.

## Installation

1. Clone the repository:

   ```
   https://github.com/animalelder/cineDataDB-client.git
   ```

2. Navigate to the project directory:

   ```
   cd cineDataDB-client
   ```

3. Install dependencies:
   ```
   npm install
   npm install -g parcel
   npm install --save react react-dom
   ```

## Usage

To start the application, run the following command in the repo directory:

```
parcel src/index.html
```

This will launch the application in your default web browser.

## Dependencies

- React with Sass (.scss)
- React DOM
- Bootstrap & Bootswatch
- Parcel, Babel
- Lodash for a delay function
- React Router for the browser router
- React Bootstrap for UI components
- React Slick for creating carousels
- PropTypes for checking the types of props

## Components

### Main Components

- **MainView**: Acts as the entry point for navigation and rendering of different views. MainView has a search bar below the Nav Bar for authenticated users to search based on movie titles or movie descriptions.
- **NavigationBar**: Provides dynamic navigation based on user authentication status.
- **MovieView**: Displays detailed information about movies and suggests similar movies.
- **MovieCard**: MainView populates a grid of these. Each one represents a single movie with the title, movie poster, favorite status, and link to MovieView.
- **SignupView & LoginView**: Handle user registration and authentication.
- **ProfileView**: Allows users to view and edit their profile, manage their favorite movies, and delete accounts.

## Routing with React Router

Utilizing React Router, the application ensures smooth navigation between different views, enabling a seamless user experience without page reloads.

## Styling and Responsiveness

The application uses Bootstrap, customized with a theme from Bootswatch, and utilizes Sass for styling, ensuring a responsive layout across different devices.

## Contributing

Contributions are welcome! I would certainly love to know what I could do to improve the project! Please fork the repository and create a pull request with your proposed changes.

## License

This project is licensed under the terms of the [ISC License](https://opensource.org/licenses/ISC).

## Contact

For any inquiries or support, please contact [me](wllearned@icloud.com).
