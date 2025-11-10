
# SceneAds: Ads Management Ecommerce Platform

SceneAds is a comprehensive ads management and ecommerce platform. It's a feature-rich system designed to connect businesses with billboard owners, allowing them to manage and display their advertisements seamlessly. This project was a collaborative team effort, built with a modern tech stack to deliver a robust and user-friendly experience.

## Key Features

### For Users/Businesses

* Account Management: Secure user authentication (login/signup) and profile management.
* Interactive Map: Explore available billboards on an interactive map, powered by the Google Maps Geolocation API.
* Campaign Creation: Easily create and customize ad campaigns by selecting desired screens or bundles of screens.
* Content Upload: Upload ad content (images/videos) for campaigns.
* Secure Payments: Integrated payment system to purchase ad space.
* Campaign Analytics: Monitor the performance of active ad campaigns with detailed statistics.
* Ad Management: View and manage all past and present ad campaigns.
* Real-time Chat System: Communicate directly with billboard owners/admins or users through an integrated chat system.

### For Admins

* Dashboard: A comprehensive admin panel to manage the entire platform.
* User Management: Oversee all registered users.
* Screen Management: Add, edit, and manage individual billboard screens.
* Campaign Approval: Review and approve or reject user-submitted ad campaigns.
* Payment Tracking: Monitor all transactions and payment details.
* Dynamic Pricing: Configure and manage pricing for different ad spaces and times.
* Real-time Chat System: Engage in direct communication with users to resolve queries and provide support.

## Tech Stack

This project leverages a modern and powerful tech stack to deliver a seamless and performant user experience.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind%20css-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-000000.svg?style=for-the-badge&logo=shadcn-ui&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=react-hook-form&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233E67B1.svg?style=for-the-badge&logo=zod&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf.svg?style=for-the-badge&logo=axios&logoColor=white)
![React Query](https://img.shields.io/badge/react%20query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google%20Maps-%234285F4.svg?style=for-the-badge&logo=google-maps&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![ApexCharts](https://img.shields.io/badge/ApexCharts-%2300E396.svg?style=for-the-badge&logo=apexcharts&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

## Google Maps Geolocation API

A core feature of our platform is the deep integration with the Google Maps Geolocation API. This allows for:


* Visualizing Billboards: Users can see the exact location of all available billboards on a dynamic and interactive map.
* Location-Based Search: Users can search for billboards in specific cities, states, or countries.
* Detailed Location Information: The platform provides rich data for each billboard, including its address, and surrounding points of interest.

This powerful mapping functionality is made possible by utilizing the @react-google-maps/api and @vis.gl/react-google-maps libraries, which provide a seamless bridge between our React application and the Google Maps API.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm (or yarn) installed on your machine.
* A Google Maps API key.

### Installation

1. Clone the repo

        git clone https://github.com/your_username/your_project_name.git
    

2. Install NPM packages

        npm install
    

3. Set up environment variables
    Create a .env file in the root of the project and and add your Google Maps API key:

    
    VITE_GOOGLE_MAPS_API_KEY=your_api_key
    

4. Run the development server

        npm run dev
    

The application will be available at http://localhost:5173 (or another port if 5173 is in use).

## Acknowledgment

This project was a collaborative effort by a dedicated team of developers. We are proud of the final product and the teamwork that went into it.