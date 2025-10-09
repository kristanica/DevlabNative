import { Audio } from "expo-av";
import tryCatch from "./tryCatch";

const soundFiles: Record<string, any> = {
  purchase: require("@/assets/sound/purchase.mp3"),
  correctAnswer: require("@/assets/sound/correct.mp3"),
  stageUnlocked: require("@/assets/sound/correct.mp3"), // double-check this
  wrongAnswer: require("@/assets/sound/inCorrect.mp3"),
  levelUp: require("@/assets/sound/levelUp.mp3"),
  achievementUnlocked: require("@/assets/sound/achievementUnlocked.mp3"),
  success: require("@/assets/sound/success.mp3"),
};

const sounds: Record<string, Audio.Sound | null> = {
  stageUnlocked: null,
  purchase: null,
  correctAnswer: null,
  wrongAnswer: null,
  levelUp: null,
  achievementUnlocked: null,
  success: null,
};

export const loadSounds = async () => {
  for (const key in soundFiles) {
    // prevent reloading if already loaded

    const [result, error] = await tryCatch(
      Audio.Sound.createAsync(soundFiles[key])
    );

    if (result) {
      sounds[key] = result.sound;
    }

    if (error) {
      console.error(`Error loading sound "${key}":`, error);
    }
  }
};

export const playSound = async (soundName: string) => {
  if (!sounds[soundName]) {
    const { sound } = await Audio.Sound.createAsync(soundFiles[soundName]);
    sounds[soundName] = sound;
  }
  await sounds[soundName]?.replayAsync();
};

export const unloadSounds = async () => {
  for (const key in sounds) {
    if (sounds[key]) {
      await sounds[key]?.unloadAsync();
      sounds[key] = null;
    }
  }
};
