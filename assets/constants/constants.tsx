//GENERAL CONSTANTS

import { Dimensions, ImageSourcePropType } from "react-native";
import {
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
  FIREBASE_STORE,
} from "../../firebaseConfig";
export const URL = `https://30199f26f6a1.ngrok-free.app` as const;
//icon for tabs
export const userIcon = ["home", "cart", "book", "trophy"] as const;
export const adminIcon = ["people-circle", "archive"] as const;

export const { width, height } = Dimensions.get("screen");
export const auth = FIREBASE_AUTH;
export const db = FIREBASE_STORE;
export const storage = FIREBASE_STORAGE;
export const achievementPlaceHolder = [
  {
    id: 1,
    subject: "Html",
  },
  {
    id: 2,
    subject: "Css",
  },

  {
    id: 3,
    subject: "JavaScript",
  },

  {
    id: 4,
    subject: "Database",
  },
];
export const gameModes = [
  "Lesson",
  "BugBust",
  "CodeRush",
  "CodeCrafter",
  "BrainBytes",
];

//path
export const path = {
  INDEX: "/",
  ONBOARDING: "/OnBoarding",
  //auth
  LOGIN: "/Login",
  REGISTER: "/Register",
  //generalapp
  HOME: "/(user)/home/Home",
  ACHIEVEMENTS: "/(user)/home/Achievements",
  SETTINGS: "/(user)/home/Settings",
  SHOP: "/(user)/home/Shop",
  LESSON: "/(user)/home/(Lessons)/Lesson",
  //dynamic path
  LESSON_CATEGORY: "/(user)/home/(Lessons)/category/[categoryId]",
  LEVEL: "/(user)/level/[levelid]",
  //
  LOADING_SCREEN: "/(user)/LoadingScreen",
  CODING_PLAYGROUND: "/(user)/playground/Coding",
  QUERY_PLAYGROUND: "/(user)/playground/Database",

  //admin route
  ADMIN_LOGIN: "/(admin)/AdminLogin",
} as const;
// export type USERPATH = keyof typeof path;
// export type USERROUTE = (typeof path)[USERPATH];

export const lessonMetaData = {
  Css: {
    title: "CSS: The Art of Styling Your Digital World",
    description: `Wield the power of CSS to shape the web! Master the art of styling, layout, and responsiveness as you transform plain pages into polished, pixel-perfect designs. Your mission: bring beauty and order to the digital realm.`,
    about: `Embark on a creative journey where you become a master of design! As an aspiring stylist, you’ll wield the magic of CSS to transform plain web pages into stunning digital artworks. Learn to craft colors, layouts, and typography that will bring your creations to life. Your quest: turn your simple web page into a visually captivating masterpiece that wows users across the globe!`,
    icon: require("@/assets/images/lessonIcons/CSSicon.png"),
    ionIcon: "logo-css3",
    gradient: {
      color1: "#00BFFF",
      color2: "#1E90FF",
    },
  },
  Html: {
    title: "HTML: The Gateway to Web Adventure",
    description: `Every great structure needs a solid foundation—HTML is the skeleton that holds the web together! Without it, web pages would collapse into chaos.`,
    about: `Step into the world of web development! As a novice adventurer, you’ll unlock the powerful language that forms the backbone of the internet—HTML. In this first quest, you’ll discover how to craft the structure of your web pages, using simple tags and elements. Your mission: build your very first web page and lay the foundation for your journey into the digital realm.`,
    icon: require("@/assets/images/lessonIcons/HTMLicon.png"),
    ionIcon: "logo-html5",
    gradient: {
      color1: "#FFC300",
      color2: "#FF5733",
    },
  },
  Database: {
    title: "Database: The Vault of Digital Knowledge",
    description: `Enter the fortress of data! As a Database Guardian, you'll learn to organize and retrieve information with precision. Harness SQL to unlock insights and guard the digital realm with skill and efficiency.`,
    about: `Venture into the depths of data storage and mastery! As a Database Guardian, you’ll learn to organize and retrieve vast amounts of information with precision and speed. Harness the power of SQL to access and manipulate data, keeping your digital vault secure and efficient. Your quest: unlock the secrets of database querying and become the protector of vast digital knowledge!`,
    icon: require("@/assets/images/lessonIcons/DATABASEicon.png"),
    ionIcon: "cube",
    gradient: {
      color1: "#4CAF50",
      color2: "#388E3C",
    },
  },
  JavaScript: {
    title: "JavaScript: The Magic Behind the Web",
    description: `Step into the realm of JavaScript magic! As a budding code sorcerer, you'll learn to bring websites to life—making pages interactive, dynamic, and full of wonder. Ready to wield the power of the web? Your journey begins now!`,
    about: `Unleash the true power of interactivity! As a code sorcerer, you’ll learn how to create dynamic and responsive experiences with JavaScript. From handling user input to controlling behavior with logic, you’ll cast spells with code that bring static pages to life. Your quest: master the fundamental spells of JavaScript and enchant the web like never before!`,
    icon: require("@/assets/images/lessonIcons/JSicon.png"),
    ionIcon: "logo-javascript",
    gradient: {
      color1: "#F7DF1E",
      color2: "#FF8C00",
    },
  },
} as const;

//Shop constants

export const mockUpShopItem = [
  {
    id: 1,
    name: "Double Down",
    description:
      "Multiply your rewards at a risk! Earn double or lose the bonus depending on your answer.",
    functionality: "Multiply or lose rewards by 2x",
    price: "$400",
  },
  {
    id: 2,
    name: "Syntax Scroll",
    description:
      "Reveal the syntax of the correct answer. Ideal for trick questions or mental breakdowns.",
    functionality: "Highlight correct syntax in one question",
    price: "$250",
  },
  {
    id: 3,
    name: "Hint Potion",
    description:
      "Consume to unlock a helpful hint for a hard question. May include a mild ego boost.",
    functionality: "Reveals a contextual hint",
    price: "$300",
  },
  {
    id: 4,
    name: "Time Freeze",
    description:
      "Pauses the countdown timer, giving you a breather and some much-needed sanity.",
    functionality: "Freezes timer for 15 seconds",
    price: "$500",
  },
  {
    id: 5,
    name: "Debug Drone",
    description:
      "Automatically identifies a small mistake in your code. Doesn't fix emotional bugs though.",
    functionality: "Highlights one syntax or logic error",
    price: "$600",
  },
  {
    id: 6,
    name: "XP Magnet",
    description:
      "Pulls XP from every corner of the battlefield. Temporarily boosts XP gained.",
    functionality: "Gives +50% XP for next 3 questions",
    price: "$350",
  },
] as const;

//LoadingScreen constants
export const devlabTips = [
  "Breaking your code is just ✨unit testing✨ in disguise.",
  "If Google ever crashes, we riot.",
  "Learning to code? Step 1: Panic. Step 2: Google it.",
  "If it works on your machine, it's basically production-ready.",
  "Syntax errors are just your code asking for attention.",
  "Comment your code like you're leaving instructions for aliens.",

  "Console.log is the duct tape of JavaScript.",
  "Commit early, commit often, regret nothing (until production).",
  "`===` saves lives. `==` starts fires.",
  "Naming things is hard. Just call it `thingyMcThingface` and move on.",
  "Don’t repeat yourself… unless you're debugging, then repeat yourself loudly.",

  "There’s no place like 127.0.0.1 — unless you forgot the port number.",
  "Programming: turning coffee into bugs since forever.",
  "It’s not a bug, it’s a surprise mechanic.",
  "Want to feel alive? Deploy without testing.",
  "CSS is just sorcery we pretend to understand.",
  "You miss 100% of the semicolons you don’t place.",

  "DevLab Tip: Pressing 'Run' counts as bravery.",
  "XP Bonus: Read your error message *before* crying.",
  "JS functions are like spells. Forget the parentheses, summon chaos.",
  "HTML is like pizza dough. Easy to make, hard to get crispy.",
  "Your bugs fear one thing: `console.log('you')`",

  "You’re one crash away from greatness.",
  "Even the best devs once misspelled `console`.",
  "Keep pushing. The bugs are more afraid of you than you are of them.",
  "A failed build is just a plot twist.",
  "Coding is 10% writing and 90% explaining to your rubber duck.",
  "Your future self will look at this and say: 'why tho?' — and that's growth.",
] as const;

export const devlabBootLines = [
  "Injecting 3 shots of espresso into mainframe...",
  "Unleashing the rubber duck debugger army...",
  "Bribing the compiler with compliments...",
  "Assembling pixels into something vaguely UI-ish...",
  "Reciting forbidden Stack Overflow incantations...",
  "Drawing a pentagram with flexbox...",
  "Sacrificing semicolons for stronger typings...",
  "Reviving dead commits from Git graveyard...",
  "Slapping bugs with a keyboard (gently)...",
  "Brewing dark mode potions...",
  "Installing `hope`... failed. Retrying...",
  "Deploying divs into the void...",
  "Asking ChatGPT for life advice...",
  "Converting caffeine to source code...",
  "Taming rogue animations with duct tape...",
  "Binding the soul of a junior dev to this project...",
  "Buffing syntax with +5 chaos energy...",
  "Enabling God Mode for your console.logs...",
  "All systems unstable. Proceed anyway 🚀",
] as const;
export const evaluatingCodeLines = [
  "Parsing the sacred markup scrolls...",
  "Whispering sweet nothings to your CSS...",
  "Gently poking the DOM tree with a virtual stick...",
  "Evaluating your JavaScript sorcery...",
  "Untangling the web of tangled styles...",
  "Summoning phantom bugs for inspection...",
  "Translating hieroglyphic comments...",
  "Validating inline styles with a magnifying glass...",
  "Conversion of caffeine into code analysis...",
  "Summoning the ghost of coding past...",
  "Gulping bulk coffee during static analysis...",
  "Bowing to the altar of semantic tags...",
  "Hunting rogue selectors in the style jungle...",
  "Feeding your JavaScript to the syntax monster...",
  "Balancing pixel perfection and browser quirks...",
  "Polishing the pixels before pixel perfect...",
  "Applying magic patches to your CSS grid...",
  "Decoding cryptic variable names...",
  "Blessing your tags with accessibility...",
  "Debugging while humming the internet’s anthem...",
] as const;

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
  {
    id: 1,
    name: "Html",
    color: "#FFC300",
    icon: require("@/assets/images/lessonIcons/HTMLicon.png"),
  },
  {
    id: 2,
    name: "Css",
    color: "#00BFFF",
    icon: require("@/assets/images/lessonIcons/CSSicon.png"),
  },
  {
    id: 3,
    name: "JavaScript",
    color: "#FF8C00",
    icon: require("@/assets/images/lessonIcons/JSicon.png"),
  },
  {
    id: 4,
    name: "Database",
    color: "#388E3C",
    icon: require("@/assets/images/lessonIcons/DATABASEicon.png"),
  },
];

export const filters: Record<
  string,
  { omit: string[]; toNumber?: (item: any) => void }
> = {
  Lesson: {
    omit: ["hint", "timer", "choices", "copyCode"],
  },
  BugBust: {
    omit: ["timer", "choices", "copyCode"],
  },
  CodeRush: {
    omit: ["hint", "choices", "copyCode"],
    toNumber: (item) => ({ ...item, timer: Number(item.timer) }),
  },
  BrainBytes: {
    omit: ["timer", "hint", "copyCode"],
  },

  CodeCrafter: {
    omit: ["timer", "hint", "choices"],
  },
};
export const itemIcon: Record<string, ImageSourcePropType> = {
  CodePatch_Icon: require("../images/iconItems/CodePatch_Icon.png"),
  CodeWhisper_Icon: require("../images/iconItems/CodeWhisper_Icon.png"),
  CoinSurge_Icon: require("../images/iconItems/CoinSurge_Icon.png"),
  BrainFilter_Icon: require("../images/iconItems/BrainFilter_Icon.png"),
  ErrorShield_Icon: require("../images/iconItems/ErrorShield_Icon.png"),
  TimeFreeze_Icon: require("../images/iconItems/TimeFreeze_Icon.png"),
};

export const categoryIcon: Record<string, ImageSourcePropType> = {
  Html: require("@/assets/images/lessonIcons/HTMLicon.png"),
  Css: require("@/assets/images/lessonIcons/CSSicon.png"),
  JavaScript: require("@/assets/images/lessonIcons/JSicon.png"),
  Database: require("@/assets/images/lessonIcons/DATABASEicon.png"),
};

export const navIcon = [
  require(`@/assets/images/navBarIcons/Dashboard.png`),
  require(`@/assets/images/navBarIcons/Shop.png`),
  require(`@/assets/images/navBarIcons/Achievement.png`),
];

export const navIconAdmin = [
  require(`@/assets/images/navBarIcons/userManagement.png`),
  require(`@/assets/images/navBarIcons/contentManagement.png`),
];
