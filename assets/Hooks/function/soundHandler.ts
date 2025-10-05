import { Audio } from "expo-av";
import tryCatch from "./tryCatch";

const soundFiles: Record<string, any> = {
  purchase: require("@/assets/sound/purchase.mp3"),
  correctAnswer: require("@/assets/sound/correct.mp3"),
  stageUnlocked: require("@/assets/sound/correct.mp3"),
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
  for (const key in sounds) {
    const [sound, error] = await tryCatch(
      Audio.Sound.createAsync(soundFiles[key])
    );

    if (sound) {
      sounds[key] = sound.sound;
    }
    if (error) {
      console.log(error);
      return;
    }
  }
};

export const playSound = async (soundName: string) => {
  const sound = sounds[soundName];

  if (!sound) return;
  const [, error] = await tryCatch(sound.replayAsync());

  if (error) {
    console.log(error);
    return;
  }
};

export const unloadSounds = async () => {
  for (const key in sounds) {
    await sounds[key]?.unloadAsync();
  }
};
