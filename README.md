
# Artflick 🎨

Artflick is an AI-powered image generation platform that allows users to create and share stunning AI-generated artwork. The application is built using Spring Boot for the backend, React for the frontend, and Firestore for database management. Users can log in using Google OAuth2, generate images via Stability AI, and publish their creations to a public feed. Non-authenticated users can view and download images from the feed.


## Features ✨

- **AI Image Generation:** Users can generate multiple AI-driven images based on Prompts.
- **Image Selection:** Choose your favorite image from a set of generated options.
- **Public Feed:** Publish and share your selected images on a public feed for everyone to view.
- **User Profiles:** Manage your created images, view your posts.
- **JWT Security:** Secure user data and authentication using JWT tokens.
- **Downloadable Art:** Public images are downloadable by any user, with or without an account.
## Tech Stack 🛠️

- **Frontend**: React, Tailwind CSS
- **Backend**: Spring Boot, Java
- **Database**: Firestore
- **Authentication**: Google OAuth2, JWT
- **AI**: Stability AI


## Environment Variables

To run this project, you will need to add the following environment variables to your `application.properties` file:

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`STABILITY_AI_API_KEY`



## Screenshots
![Screenshot 2024-09-18 004848](https://github.com/user-attachments/assets/5b00cb16-17ac-429f-bf27-64a8a9ad09b3)
![Screenshot 2024-09-18 004914](https://github.com/user-attachments/assets/a0edd91d-e852-42a9-91bb-2ebe8754f942)
![Screenshot 2024-09-18 004745](https://github.com/user-attachments/assets/30a20628-f966-4c0c-9090-8db2a941198f)
![Screenshot 2024-09-18 004818](https://github.com/user-attachments/assets/e004ee49-8069-4827-bdcb-0a11e17ab80c)
![Screenshot 2024-09-18 005014](https://github.com/user-attachments/assets/f7ca1137-a35c-4be8-b110-012f9fb64aeb)




## Lessons Learned

- **API Design:** Ensured clear and consistent endpoint naming and HTTP methods to enhance usability and maintainability.
- **Security:** Implemented secure authentication and authorization practices, including OAuth2 for user login.
