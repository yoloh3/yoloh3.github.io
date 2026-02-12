import { Milestone } from './types';

export const PASSWORD = "0101";
export const ROAD_LENGTH = 6000; // Total pixel width of the road
export const VIEWPORT_HEIGHT = 600; // Reference height for calculations

export const MILESTONES: Milestone[] = [
  {
    id: 1,
    date: "01/01",
    title: "Chuyến đi đầu tiên",
    emoji: "🚩",
    content: "Hành trình bắt đầu từ đây...",
    positionX: 5,
  },
  {
    id: 2,
    date: "19/01",
    title: "Bát phở đêm",
    emoji: "🍜",
    content: "Trời lạnh nhưng lòng ấm bên em",
    positionX: 25,
  },
  {
    id: 3,
    date: "27/01",
    title: "Movie Date",
    emoji: "🎥",
    content: "Phim hay (dù anh ngủ gật 😅)",
    positionX: 50,
  },
  {
    id: 4,
    date: "05/02",
    title: "Biển vắng",
    emoji: "🏖️",
    content: "Chỉ có sóng và hai đứa mình",
    positionX: 75,
  },
  {
    id: 5,
    date: "14/02",
    title: "Valentine's Gift",
    emoji: "🎁",
    content: "Gửi Chan, Cảm ơn em đã cùng anh đi trên hành trình này. Chúc em một Valentine thật vui! ❤️",
    positionX: 95,
  },
];

export const THEME = {
  sky: "bg-gradient-to-b from-sky-300 via-pink-200 to-yellow-100",
  grass: "#7EC850",
  road: "#555555",
};
