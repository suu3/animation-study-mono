import { EmojiSrcType, TextureType } from "../types/emojiTypes";
import { convertTextureNameToPath } from "./path";
import { getRandomIntegerInRange } from "./random";

const createEmoji = (
  name: EmojiSrcType,
  position: { x: number; y: number; z: number }
) => ({
  name,
  position,
  texture: getRandomTexture(),
});

const TEXTURE_NAME: TextureType[] = [
  "hologram",
  "metalic",
  "purple",
  "red",
  "green",
];
const getRandomTexture = () => {
  const randomIndex = getRandomIntegerInRange(0, TEXTURE_NAME.length);
  return convertTextureNameToPath(TEXTURE_NAME[randomIndex]);
};

const getEmojiList = (count: number, emojiNames: EmojiSrcType[]) => {
  const gridSize = Math.ceil(Math.sqrt(count));
  const gridSpacing = 1.4;

  const offsetX = ((gridSize - 1) * gridSpacing) / 2;
  const offsetY = ((gridSize - 1) * gridSpacing) / 2;

  return Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const position = {
      x: col * gridSpacing - offsetX,
      y: row * gridSpacing - offsetY,
      z: getRandomIntegerInRange(-5, 5), // 격자 형태로 설정하되 z는 랜덤
    };
    return createEmoji(emojiNames[i % emojiNames.length], position);
  });
};

const EMOJI_NAME: EmojiSrcType[] = ["animal", "game_device", "camera"];
const COUNT = 100;

export const emojis = getEmojiList(COUNT, EMOJI_NAME);
