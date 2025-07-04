//GENERAL CONSTANTS

import { FIREBASE_AUTH, FIREBASE_STORE } from "@/firebaseConfig";
import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");

export const lessonMetaData = {
  Css: {
    title: ` CSS: The Art of Styling Your Digital World`,
    description: `Wield the power of CSS to shape the web! Master the art of
              styling, layout, and responsiveness as you transform plain pages
              into polished, pixel-perfect designs. Your mission: bring beauty
              and order to the digital realm.`,

    about: `Embark on a creative journey where you become a master of design! As
            an aspiring stylist, you’ll wield the magic of CSS to transform
            plain web pages into stunning digital artworks. Learn to craft
            colors, layouts, and typography that will bring your creations to
            life. Your quest: turn your simple web page into a visually
            captivating masterpiece that wows users across the globe!`,
    icon: require("@/assets/images/lessonIcons/CSSicon.png"),
    ionIcon: "logo-css3",
    gradient: {
      color1: "#00BFFF",
      color2: "#1E90FF",
    },
  },
  Html: {
    title: `HTML: The Gateway to Web Adventure`,
    description: `Every great structure needs a solid foundation—HTML is the
              skeleton that holds the web together! Without it, web pages would
              collapse into chaos`,
    about: `   Step into the world of web development! As a novice adventurer,
            you’ll unlock the powerful language that forms the backbone of the
            internet—HTML. In this first quest, you’ll discover how to craft the
            structure of your web pages, using simple tags and elements. Your
            mission: build your very first web page and lay the foundation for
            your journey into the digital realm`,
    icon: require("@/assets/images/lessonIcons/HTMLicon.png"),
    ionIcon: "logo-html5",
    gradient: {
      color1: "#FFC300",
      color2: "#FF5733",
    },
  },
  Database: {
    title: `Database: The Vault of Digital Knowledge`,
    description:
      "Step into the realm of JavaScript magic! As a budding code \n\
              sorcerer, you'll learn to bring websites to life—making pages \n\
              interactive, dynamic, and full of wonder. Ready to wield the power \n\
              of the web? Your journey begins now!",
    about: `Step into the world of web development! As a novice adventurer,
            you’ll unlock the powerful language that forms the backbone of the
            internet—HTML. In this first quest, you’ll discover how to craft the
            structure of your web pages, using simple tags and elements. Your
            mission: build your very first web page and lay the foundation for
            your journey into the digital realm`,
    icon: require("@/assets/images/lessonIcons/DATABASEicon.png"),
    ionIcon: "cube",

    gradient: {
      color1: "#4CAF50",
      color2: "#388E3C",
    },
  },
  JavaScript: {
    title: `Database: The Vault of Digital Knowledge`,
    description: `Enter the fortress of data! As a Database Guardian, you'll learn
              to organize and retrieve information with precision. Harness SQL
              to unlock insights and guard the digital realm with skill and
              efficiency`,
    about: ` Venture into the depths of data storage and mastery! As a Database
            Guardian, you’ll learn to organize and retrieve vast amounts of
            information with precision and speed. Harness the power of SQL to
            access and manipulate data, keeping your digital vault secure and
            efficient. Your quest: unlock the secrets of database querying and
            become the protector of vast digital knowledge!`,
    icon: require("@/assets/images/lessonIcons/JSicon.png"),
    ionIcon: "logo-javascript",
    gradient: {
      color1: "#F7DF1E",
      color2: "#FF8C00",
    },
  },
};

//FIREBASE
export const auth = FIREBASE_AUTH;
export const db = FIREBASE_STORE;

//Onboarding Constants
export const onboardingData = [
  {
    id: 1,
    lottie: require("@/assets/Lottie/onboarding/onBoardingScreen1.json"),
    title: "🧙‍♂️ Welcome to DevLab",
    subtitle: "You’re the chosen one.",
    description:
      "Train as a full-stack dev. Complete quests. Earn XP. Break the code curse.",
    background: "#1e1b4b",
  },
  {
    id: 2,
    lottie: require("@/assets/Lottie/onboarding/onBoardingScreen2.json"),
    title: "⚔️ Master Your Arsenal",
    subtitle: "HTML. CSS. JavaScript. Databases.",
    description:
      "Each skill is a weapon. Each bug is a battle. Learn by fighting real dev challenges.",
    background: "#0f172a",
  },
  {
    id: 3,
    lottie: require("@/assets/Lottie/onboarding/onBoardingScreen3.json"),
    title: "🧩 Quests, Levels, Loot",
    subtitle: "Defeat challenges. Gain XP. Unlock achievements.",
    description: "Progress isn’t a number. It’s a badge of honor.",
    background: "#212121",
  },
  {
    id: 4,
    lottie: require("@/assets/Lottie/onboarding/onBoardingScreen4.json"),
    title: "🚪 Enter the Lab",
    subtitle: "Your first mission awaits.",
    description:
      "Code bravely, break things gloriously, and become the full-stack hero you were born to be.",
    background: "#2c0e37",
  },
];
// Home Constatns
export const lessons = [
  { id: 1, name: "HTML", color: "#FFC300", icon: "logo-html5" },
  { id: 2, name: "CSS", color: "#00BFFF", icon: "logo-css3" },
  { id: 3, name: "JavaScript", color: "#FF8C00", icon: "logo-javascript" },
  { id: 4, name: "Database", color: "#388E3C", icon: "albums" },
];

// Achievements Constants

export const htmlMockUp = [
  {
    id: 1,
    name: "Markup Master",
    description: "Master the basics of HTML elements and tags.",
    complete: false,
  },
  {
    id: 2,
    name: "Hyperlink Hero",
    description: "Successfully add links to your webpage using anchor tags.",
    complete: true,
  },
  {
    id: 3,
    name: "List Lord",
    description: "Create ordered and unordered lists to organize content.",
    complete: false,
  },
  {
    id: 4,
    name: "Image Inserter",
    description: "Embed images into your webpage using the <img> tag.",
    complete: true,
  },
  {
    id: 5,
    name: "Form Founder",
    description: "Build basic forms with inputs, buttons, and labels.",
    complete: false,
  },
];

export const cssMockUp = [
  {
    id: 1,
    name: "Styling Starter",
    description: "Apply basic styles to text and elements using CSS.",
    complete: true,
  },
  {
    id: 2,
    name: "Box Model Boss",
    description:
      "Understand and use padding, borders, and margins effectively.",
    complete: false,
  },
  {
    id: 3,
    name: "Flexbox Fanatic",
    description: "Create flexible layouts using Flexbox.",
    complete: true,
  },
  {
    id: 4,
    name: "Color Crafter",
    description:
      "Master color properties including hex, rgb, and named colors.",
    complete: false,
  },
  {
    id: 5,
    name: "Selector Specialist",
    description: "Use class, ID, and pseudo selectors like a pro.",
    complete: true,
  },
  {
    id: 6,
    name: "Layout Legend",
    description: "Create responsive layouts with media queries.",
    complete: false,
  },
  {
    id: 7,
    name: "Grid Guru",
    description: "Build complex grid-based layouts using CSS Grid.",
    complete: true,
  },
  {
    id: 8,
    name: "Animation Ace",
    description: "Add transitions and keyframe animations to enhance UI.",
    complete: false,
  },
];

export const jsMockUp = [
  {
    id: 1,
    name: "Variable Virtuoso",
    description: "Declare variables using let, const, and var.",
    complete: true,
  },
  {
    id: 2,
    name: "Function Finesse",
    description: "Create and call functions to organize code.",
    complete: false,
  },
  {
    id: 3,
    name: "Loop Lord",
    description: "Use for, while, and do-while loops effectively.",
    complete: true,
  },
  {
    id: 4,
    name: "Conditional",
    description: "Make decisions using if, else if, and else statements.",
    complete: false,
  },
  {
    id: 5,
    name: "Array Architect",
    description: "Store and manipulate lists using arrays.",
    complete: true,
  },
  {
    id: 6,
    name: "Object Oracle",
    description: "Structure data using objects and access their properties.",
    complete: false,
  },
  {
    id: 7,
    name: "DOM Dominator",
    description: "Select and manipulate HTML elements with the DOM API.",
    complete: true,
  },
  {
    id: 8,
    name: "Event Expert",
    description: "Handle user interactions using event listeners.",
    complete: false,
  },
];

export const databaseMockUp = [
  {
    id: 1,
    name: "Query Newbie",
    description: "Write basic SELECT statements to retrieve data.",
    complete: true,
  },
  {
    id: 2,
    name: "Table Tactician",
    description: "Create tables using CREATE TABLE statements.",
    complete: false,
  },
  {
    id: 3,
    name: "Insert Initiate",
    description: "Add new records with INSERT INTO.",
    complete: true,
  },
  {
    id: 4,
    name: "Update Upstart",
    description: "Modify data in a table using UPDATE.",
    complete: false,
  },
  {
    id: 5,
    name: "Delete Disciple",
    description: "Remove records using DELETE FROM.",
    complete: true,
  },
  {
    id: 6,
    name: "Join Genius",
    description: "Combine tables using INNER JOIN.",
    complete: false,
  },
  {
    id: 7,
    name: "Filter Fanatic",
    description: "Use WHERE clauses to filter query results.",
    complete: true,
  },
  {
    id: 8,
    name: "Index Initiator",
    description: "Improve performance by creating indexes.",
    complete: false,
  },
];

export const mockData = [
  {
    id: 1,
    name: "HTML",
    data: htmlMockUp,
  },
  {
    id: 2,
    name: "CSS",
    data: cssMockUp,
  },
  {
    id: 3,
    name: "JavaScript",
    data: jsMockUp,
  },
  {
    id: 4,
    name: "Database",
    data: databaseMockUp,
  },
];
