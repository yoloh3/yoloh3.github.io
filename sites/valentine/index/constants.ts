import { Milestone } from './types';

export const PASSWORD = "0101";
export const ROAD_LENGTH = 9000; // Increased for 7 stops
export const VIEWPORT_HEIGHT = 600; // Reference height for calculations

export const MILESTONES: Milestone[] = [
  {
    id: 0,
    date: "04/2024",
    title: "Lần đầu nói chuyện",
    emoji: "💬",
    content: "LinkedIn → Messenger → và rồi...",
    image: "/photos/first_talk.jpg",
    positionX: 3,
  },
  {
    id: 1,
    date: "07/2024",
    title: "Nha Trang Trip",
    emoji: "📸",
    content: "Company trip và bức ảnh chung đầu tiên 📷",
    image: "/photos/first_picture.JPG",
    positionX: 12,
  },
  {
    id: 2,
    date: "01/01",
    title: "Coi phim cùng nhau",
    emoji: "🎬",
    content: "Xem phim, ăn tối, cafe khuya, chở về — nhẹ nhàng mà bình yên 🏍️",
    image: "/photos/avatar3.jpeg",
    positionX: 25,
  },
  {
    id: 3,
    date: "09/01",
    title: "Đi nghe nhạc cùng nhau",
    emoji: "🎵",
    content: "Em nói mình chỉ là 'đồng nghiệp cũ'... anh cười mà lệ đổ trong tim 😅",
    image: "/photos/second_date.jpeg",
    positionX: 40,
  },
  {
    id: 4,
    date: "18/01",
    title: "Ngắm mặt trời lặn",
    emoji: "🌅",
    content: "Cờ vây là khởi đầu... và sau đó là những chia sẻ sâu sắc và lần đầu tiên chúng ta nắm tay nhau <3",
    image: "/photos/third_date.jpeg",
    positionX: 57,
  },
  {
    id: 5,
    date: "08/02",
    title: "5th Date: First Kiss",
    emoji: "💋",
    content: "Em bắt anh phải đuổi theo em hoài à, nhưng mà, anh vẫn sẽ luôn đuổi theo hehe",
    image: "/photos/fifth_date2.jpeg",
    positionX: 75,
  },
  {
    id: 6,
    date: "14/02",
    title: "Happy Valentine",
    emoji: "🎁",
    content: "Gửi Chan yêu dấu ❤️", // Before video
    contentAfterVideo: "14/2 anh không gặp được em, nhưng có một người thì vẫn luôn ở trong trái tim anh. Một món quà nhỏ gửi em hôm nay, còn lại thì để dành hôm nào chúng ta gặp nhau nhé ❤️", // After video
    image: "/photos/fifth_date.jpeg",
    positionX: 92,
  },
];

export const THEME = {
  sky: "bg-gradient-to-b from-sky-300 via-pink-200 to-yellow-100",
  grass: "#7EC850",
  road: "#555555",
};


