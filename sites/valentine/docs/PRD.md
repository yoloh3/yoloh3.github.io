# 🏍️ PRD: Love Trip - Cartoon Hills Edition 🏍️💨

**Product**: Valentine Love Road Trip
**Author**: H3
**Version**: 2.0 (Cartoon Hills Edition)
**Date**: 2026-02-12
**URL**: yoloh3.com/sites/valentine
**Password**: `0101` (Ngày đi xem phim đầu tiên)

---

## 1. Tổng Quan & Mục Tiêu

### Vấn Đề Cần Giải Quyết

- **H3 (Creator)**: Tạo trải nghiệm digital độc đáo, vui tươi, gây bất ngờ cho Chan vào Valentine 14/02. Phong cách **KHÔNG** lãng mạn buồn — mà **vui vẻ, hoạt hình, playful** 🎉
- **Chan (Receiver)**: Được "đi chơi" qua một hành trình cartoon thú vị, cười nhiều hơn khóc, cảm nhận sự sáng tạo và vui vẻ của anh

### Design Philosophy 🎨

> **"Vui vẻ như phim hoạt hình, đơn giản mà thú vị, như hai đứa đi chơi trên một chuyến xe vui nhộn!"**

| Keyword             | Mô tả                                          |
| ------------------- | ---------------------------------------------- |
| **Cartoonish**      | Màu sắc rực rỡ, nét vẽ tròn trịa, bouncy       |
| **Hills & Valleys** | Đường đi lên đồi xuống đồi, không phẳng lè     |
| **Playful Motion**  | Xe nhún lên xuống, khói phì phì, bánh quay tít |
| **Fun Stops**       | Mỗi cột mốc là một "trạm dừng chân" vui nhộn   |

---

## 2. Kiến Trúc Tổng Quan

### 2.1 Cấu Trúc Màn Hình

```
┌─────────────────────────────────────────────────────────────┐
│  SCREEN 1: PASSWORD GATE                                    │
│  ┌─────────────────────────┐                                │
│  │ Love Road Trip 🏍️       │  ← Cartoon title, bouncy      │
│  │ "Ngày mình đi xem phim" │                                │
│  │ [••••] [Let's Go!]      │                                │
│  └─────────────────────────┘                                │
│  Background: Gradient bầu trời hoạt hình + mây bay          │
└─────────────────────────────────────────────────────────────┘

                        ↓ Correct Password

┌─────────────────────────────────────────────────────────────┐
│  SCREEN 2: LOVE ROAD TRIP  (← Cuộn ngang →)                │
│                                                              │
│  ☁️    ☁️        ☀️      ☁️    ☁️                           │
│              🌈                                              │
│   ⛰️  ⛰️    🌲🌲      ⛰️⛰️  🌲                           │
│  START ──╱╲──╱  ╲──╱╲──STOP1──╱╲──╱  ╲──STOP2──╱╲──END    │
│         ╱  ╲╱    ╲╱  ╲       ╱  ╲╱    ╲       ╱  ╲        │
│     🏍️�                                                    │
│  [H3][Chan]  ← Xe chạy trên đồi, lên xuống theo terrain    │
│                                                              │
│  ♫ Play Music                                                │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Layer System (Parallax Nâng Cấp)

| Layer | Tên            | Tốc độ | Nội dung                                       |
| ----- | -------------- | ------ | ---------------------------------------------- |
| 0     | Sky            | Fixed  | Gradient bầu trời cartoon (xanh → hồng → vàng) |
| 1     | Celestial      | 0.1x   | Mặt trời (bouncing nhẹ), cầu vồng              |
| 2     | Clouds         | 0.3x   | Mây hoạt hình, đủ kiểu (tròn, dài, nhỏ)        |
| 3     | Mountains      | 0.5x   | Đồi núi cartoon (tròn, mềm mại, nhiều màu)     |
| 4     | Trees/Deco     | 0.7x   | Cây xanh, hoa, cỏ, decoration                  |
| 5     | **Hilly Road** | 1x     | ⭐ Con đường gồ ghề, lên xuống (SVG path)       |
| 6     | Motorcycle     | Fixed  | Xe H3+Chan, di chuyển theo terrain             |

---

## 3. Tính Năng Chi Tiết

### ⭐ 3.1 TERRAIN HỒI SINH — Đường Đồi (Core Feature Mới)

> **Đây là thay đổi lớn nhất so với V2 hiện tại (đường phẳng).**

#### Cách Hoạt Động

```
Thay vì đường thẳng phẳng lì:
────────────────────────────────

Bây giờ là đường lên đồi xuống đồi:
      ╱╲          ╱╲
     ╱  ╲    ╱╲  ╱  ╲       ╱╲
────╱    ╲  ╱  ╲╱    ╲─────╱  ╲────
          ╲╱          ╲   ╱
                       ╲─╱
```

#### Kỹ Thuật

- **SVG Path** cho đường terrain (mượt mà, scalable)
- Hàm sin/cos với noise tạo đồi tự nhiên
- Motorcycle (`bottom` position) theo đường path
- Xe **nghiêng** khi lên/xuống đồi (rotation theo slope)
- Cỏ/hoa mọc dọc terrain
- Milestones đặt trên các **đỉnh đồi** (nổi bật)

#### Motorcycle Animation Chi Tiết

| Trạng thái | Animation                                                |
| ---------- | -------------------------------------------------------- |
| Đang chạy  | Bounce nhẹ (translateY ±3px)                             |
| Lên đồi    | Nghiêng lên (rotate -15deg), bánh sau bốc khói nhiều hơn |
| Xuống đồi  | Nghiêng xuống (rotate +10deg), tóc bay, biểu cảm vui 😆   |
| Dừng trạm  | Xe dừng, 2 người quay đầu nhìn nhau, tim bay ra ❤️        |

---

### 3.2 Password Screen (Cập Nhật)

| Thuộc tính | Giá trị                                   |
| ---------- | ----------------------------------------- |
| Hint       | "Ngày đầu tiên mình đi xem phim 🎬 (DDMM)" |
| Password   | `0101`                                    |
| Error msg  | "Sai mật khẩu rồi anh ơi! 😜"              |
| Transition | Fade out + Zoom-in vào con đường          |

**Background animation**: Mây bay chậm, mặt trời nhấp nháy, có thể thêm 1-2 con bướm bay

---

### 3.3 Milestones — Trạm Dừng Chân 🚩

Mỗi milestone bây giờ là một **trạm dừng trên đỉnh đồi**, với biển chỉ đường cartoon:

| #      | Ngày  | Tên                | Emoji | Nội dung (ngắn)                  |
| ------ | ----- | ------------------ | ----- | -------------------------------- |
| START  | 01/01 | Chuyến đi đầu tiên | 🚩     | "Hành trình bắt đầu từ đây..."   |
| STOP 1 | 19/01 | Bát phở đêm        | 🍜     | "Trời lạnh nhưng lòng ấm bên em" |
| STOP 2 | 27/01 | Movie Date         | 🎥     | "Phim hay (dù anh ngủ gật 😅)"    |
| STOP 3 | 05/02 | Biển vắng          | 🏖️     | "Chỉ có sóng và hai đứa mình"    |
| 🏁 END  | 14/02 | Valentine's Gift   | 🎁     | Gift box + Confetti + Lời nhắn   |

**Khi milestone active:**
- Card zoom up + drop shadow mạnh hơn
- Biển chỉ đường rung lắc nhẹ
- Particles/sparkles quanh card
- Xe dừng lại, H3 và Chan quay nhìn card

---

### 3.4 Music Player (Giữ Nguyên)

- Nút toggle cố định góc trên phải
- Auto-play sau khi unlock (nếu browser cho phép)
- Loop liên tục
- Style: Viên thuốc bo tròn, màu trắng mờ

---

### 3.5 Gift Box (Cuối Đường) 🎁

- Nằm ở milestone cuối (Valentine's Day)
- **Hiệu ứng trước khi click**: Rung nhẹ + phát sáng (glow pulse)
- **Khi click**: 
  1. Nắp hộp bay lên
  2. Confetti nổ (3 giây, 3 màu theme)
  3. Alert box với lời nhắn Valentine

---

## 4. UI/UX Theme — Cartoon Edition 🎨

### Bảng Màu Mới

| Màu              | Hex       | Dùng cho                 |
| ---------------- | --------- | ------------------------ |
| **Sky Blue**     | `#87CEEB` | Bầu trời phía trên       |
| **Sunset Pink**  | `#FFB6C1` | Gradient bầu trời chiều  |
| **Grass Green**  | `#7EC850` | Cỏ, đồi, terrain         |
| **Hot Pink**     | `#F06C9B` | Accent, buttons, markers |
| **Sunny Yellow** | `#FFD93D` | Mặt trời, highlights     |
| **Road Gray**    | `#555`    | Đường đi                 |
| **White**        | `#FFF`    | Cards, text backgrounds  |

### Typography

- **Title**: "Dancing Script" (vui vẻ, cursive)
- **Body**: "Lato" (clean, friendly)
- **Emoji**: Dùng nhiều emoji cho feel cartoon 🎉

### Brand Feeling

| ❌ Không phải     | ✅ Phải là           |
| ---------------- | ------------------- |
| Lãng mạn buồn    | Vui vẻ sáng tạo     |
| Pastel nhẹ nhàng | Màu rực rỡ cartoon  |
| Chậm rãi, dreamy | Năng động, bouncy   |
| Thư tay          | Chuyến đi phiêu lưu |

---

## 5. Kỹ Thuật

### Tech Stack

| Component | Công nghệ                             |
| --------- | ------------------------------------- |
| Structure | HTML5                                 |
| Styling   | Vanilla CSS3 (animations, transforms) |
| Logic     | Vanilla JS (ES6+)                     |
| Terrain   | SVG `<path>` hoặc CSS clip-path       |
| Confetti  | canvas-confetti (CDN)                 |
| Fonts     | Google Fonts (Dancing Script + Lato)  |
| Audio     | HTML5 `<audio>`                       |

### Performance Targets

- First load: < 3 giây
- Smooth 60fps scroll trên mobile
- Tổng file size < 500KB (không tính media)

### File Structure

```
valentine/
├── index.html          # Cấu trúc HTML
├── style.css           # Toàn bộ styling + animations
├── script.js           # Password, parallax, terrain, interactions
├── docs/
│   └── PRD.md          # File này
├── media/              # Ảnh & video thật (15 files)
└── diary/              # Nhật ký entries
```

---

## 6. Phân Pha Triển Khai

### Phase 1: Terrain & Hills (Core)
- [ ] Tạo SVG terrain path với sin/cos curves
- [ ] CSS cho đồi cỏ xanh, mềm mại
- [ ] Motorcycle position theo terrain path
- [ ] Xe nghiêng khi lên/xuống đồi

### Phase 2: Cartoon Scenery
- [ ] Mây hoạt hình (nhiều kích cỡ, bay chậm)
- [ ] Mặt trời cartoon (vàng, có tia sáng, bounce nhẹ)
- [ ] Đồi núi background (tròn, mềm mại, gradient)
- [ ] Cây cối/hoa mọc dọc đường

### Phase 3: Enhanced Milestones
- [ ] Biển chỉ đường cartoon trên đỉnh đồi
- [ ] Active state animation (zoom, sparkle)
- [ ] Cards bo tròn, bóng mềm, viền màu

### Phase 4: Polish & Fun Details
- [ ] Xe dừng animation tại milestone
- [ ] Thêm particles/sparkles
- [ ] Gift box glow effect
- [ ] Responsive cho mobile
- [ ] Final content review

---

## 7. Media Assets Hiện Có

```
media/ (15 files):
├── first_picture.JPG       # Ảnh đầu tiên
├── first_talk.jpg          # Chat đầu tiên
├── IMG_8361.HEIC           # (6 ảnh HEIC cần convert)
├── IMG_8924.PNG            # 
├── IMG_9237.PNG            # 
├── IMG_9269.MOV            # Video kỷ niệm
└── ... (và nhiều ảnh khác)
```

> **Lưu ý**: Ảnh HEIC cần convert sang JPG/PNG để hiển thị trên web. Xem xét thêm ảnh vào các milestones ở V3.

---

## Appendix

### Milestone Content Chi Tiết

| #   | Ngày       | H3 viết cho Chan                                                                              |
| --- | ---------- | --------------------------------------------------------------------------------------------- |
| 1   | 01/01/2026 | "Ngày chúng mình bắt đầu hành trình này. Anh nhớ mãi nụ cười của em khi đó..."                |
| 2   | 19/01/2026 | "Hôm đó trời lạnh, nhưng đi ăn cùng em thấy ấm áp lạ thường."                                 |
| 3   | 27/01/2026 | "Bộ phim em chọn hay lắm (dù anh ngủ gật một tí 😅). Lần sau anh hứa thức!"                    |
| 4   | 05/02/2026 | "Chỉ có sóng và hai đứa mình. Mong được đi cùng em đến nhiều nơi nữa."                        |
| 5   | 14/02/2026 | "💌 Gửi Chan, Cảm ơn em đã cùng anh đi trên hành trình này. Chúc em một Valentine thật vui! ❤️" |
