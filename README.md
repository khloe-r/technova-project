# willow

This project was created with `react`, `material ui` and `firebase` along with APIs from `myHealthfinder` and `CDC Content Services`

## Inspiration

Our team realized that not all women are educated about the body and health. We ignore chest pain and belly aches without realizing the consequences until it’s too late, or inaccurately self-diagnose using the internet. Minimal knowledge and awareness of how to mitigate these agonizing situations often lead to excessive worrying or anxiety. Women should have access to a platform that educates them on their health and give them the opportunity to seek out information easily in a safe and comfortable space.

## What it does

The web-app is a health resource designed to educate women on their body and health and give them the resources to express their concerns while tracking their body patterns.

The user will be prompted to create an account or log in upon entering the landing page using secure Firebase authentication. After they are logged into their account they will be taken to the Home Page. Here the user will be given the option to start browsing through a library of trusted articles on women’s health with the help of the CDC Content Services API, take a health self-assessment or create folders to organize their articles. If the user decides to start browsing through articles and finds one they like and want to reference later they can save it by creating a folder. This folder will be stored on their homepage for later use. If the users decide to start with their health self-assessment, the user will be prompted to answer a series of personal questions with the help of the MyHealthFinder API. Once they have completed the assessment they will be given a list of personalized article recommendations to educate themselves around their personal health. Moving on to the Symptoms Tracker page: The user can enter symptoms they are experiencing that day or log their menstruation schedule to track long-term patterns easily in one place! All symptoms are viewable on a working calendar! Lastly, we have the My Account page that stores the user’s name and email and is also where they can log out at the end of the day!

## How we built it

We first planned, designed and routed the prototype in Figma. Then we built the site using React for the frontend and Google Firebase including Authentication, Hosting and Firestore for the backend. We used an API integration with CDC Content Services API to provide reputable resources and articles to users through search queries, and MyHealthfinder API to provide personalized recommendations based on user's responses to a self-assessment.

## Challenges we ran into

The primary challenge we faced was differentiating Willow to be competitive against other apps currently on the market. It was crucial for Willow to have a unique selling proposition that makes it a better choice for users.

## Accomplishments that we're proud of

We’re extremely proud we were able to build an entire full-stack platform in a short time while fitting the prototype style guide. We ended up adapting our ideas as we moved forward but we’re happy with the design of the final product and its functionality.

## What we learned

We learned about the process of designing and creating a prototype. This allowed us to improve our UI/UX of Willow and gain insight into the design aspect and importance of aesthetics. Furthermore, we learned how to efficiently work as a team with members from different backgrounds by capitalizing on individual strengths.

## What's next for Willow

In the future we would love to add additional features to enhance the community of women online through discussion. One step would be adding a message board for users to connect and talk about their personal experiences, resources that helped them, and give advice.


