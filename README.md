# SpeerCheck – Interview Scheduling Interface

This project was developed as part of the Frontend Assignment for Speer.  
It is a React + TypeScript-based interface that enables recruiters to schedule interviews with engineers based on availability overlaps.

---

## Key Features

-  Candidate selection via dropdown
-  Weekly calendar view (Monday–Friday, 9 AM – 6 PM)
-  30-minute slot intervals
-  Highlighted engineer availability (green)
-  Candidate’s preferred availability range
-  Blue highlights for overlapping available slots
-  Click to confirm an interview
-  Confirmation message with selected candidate, engineer, and time
-  Slot is locked after selection (session-based)
-  AM/PM time format
-  Optional feature: Interview duration selection (15 / 30 / 60 minutes)

---

##  Tech Stack

- **React** (with **TypeScript**)
- **Tailwind CSS** for styling
- **Jest** for unit testing
- Local **JSON files** for mock data (no backend)

---

## Unit Test

To validate business logic beyond UI rendering, a custom unit test was implemented.

Test file:  
`src/utils/availabilityUtils.test.ts`

Test target:  
Intersection logic between engineer and candidate availability.

To run tests:

```bash
npm test

 Live Demo

     https://your-deployed-url.vercel.app
    (Replace with your actual deployment link)

 Demo Recording

A 5-minute walkthrough video was created to demonstrate:

    Candidate selection

    Calendar interaction

    Slot selection and confirmation

    Duration selection

    Unit test execution

Voice narration included, with live deployed URL visible in the browser.
 Design Decisions

    Reusable and type-safe components

    Local JSON data to avoid external dependencies

    AM/PM formatting for clarity

    Tailwind CSS for quick styling and responsive layout

    State-driven logic for selections and confirmations

Running Locally

npm install
npm start

To run tests:

npm test

 About Me

Developed by Ali Riza Sevgili
Toronto, Canada
https://github.com/AliRizaSevgili
https://www.linkedin.com/in/alirizasevgili/
    

 