---
date: "2026-04-11"
type: artifact
status: WIP
domain: writing
tags: [gemini, gem, tone, persona, extractor, ai-ghostwriter]
---

# Tone Extractor Prompt — Standalone

Dùng prompt này trên bất kỳ chatbot nào bạn đang dùng (ChatGPT,
Gemini, Claude, DeepSeek…) TRƯỚC KHI mở AI Ghostwriter Gem.
Output TONE PROFILE sẽ paste vào Gem ở Step 3.

**Tại sao tách ra:** AI Ghostwriter focus vào workflow viết.
Tone extraction là task khác — nên chạy trên chatbot bạn đã có
memory / history dày nhất (thường là chatbot chính của bạn).

---

## Cách dùng (2 phút) — Primary flow

1. Mở chatbot bạn quen dùng nhất (ChatGPT, Gemini, Claude,
   DeepSeek). Nên chọn nơi có memory phong phú về bạn.
2. **Nếu có Google AI Pro:** switch sang Gemini **Pro mode**
   thay vì Fast default (model selector dưới góc phải chat).
   Output quality tốt hơn đáng kể.
3. Copy nguyên PROMPT ở section bên dưới, paste vào chat
4. **Đính kèm (optional nhưng khuyến khích):** upload file có
   giọng văn bạn muốn theo — sample bài viết cũ, workbook AIMM
   112 câu, draft cũ, email dài, note cá nhân
5. Send và đợi chatbot output block `TONE PROFILE`
6. Copy nguyên block đó
7. Mở AI Ghostwriter Gem, khi Gem hỏi Step 3 "Bạn có sẵn
   TONE PROFILE chưa?" → paste block vào

## Alternative flow — dùng Drive link

Nếu bạn không muốn copy prompt dài, có thể dùng shortcut:

1. Mở chatbot của bạn (recommend Gemini Pro mode nếu có)
2. Gõ: `hãy đọc file này và làm theo hướng dẫn trong đó: https://drive.google.com/file/d/1VPSTIC0SLVQ7bGuKLpc9siXQq-OHO0E6/view?usp=drivesdk`
3. Đính kèm file tone reference của bạn (nếu có)
4. Chatbot đọc prompt từ Drive → execute → output TONE PROFILE
5. Copy block → paste vào AI Ghostwriter Gem

**Lưu ý:** Không phải chatbot nào cũng đọc được Drive URL.
Nếu chatbot báo lỗi đọc link → dùng Primary flow (copy prompt
trực tiếp).

---

## PROMPT — copy nguyên block dưới đây

```
Bạn là writing persona analyst. Nhiệm vụ: extract tone và phong
cách viết của tôi.

Nguồn data để extract (theo thứ tự ưu tiên):
1. Memory / conversation history có sẵn giữa tôi và bạn (ưu tiên
   cao nhất nếu có)
2. Các tài liệu tôi upload trong conversation này
3. Suy luận từ cách tôi chat với bạn ngay trong cuộc này

QUAN TRỌNG — Quy tắc khi đọc tài liệu:

- Nếu tài liệu là workbook Self-Minion / AIMM 112 câu (format
  hỏi-đáp, author Lương Dũng Nhân hoặc LDN, Learnacy): CHỈ
  extract tone từ phần TRẢ LỜI của tôi (user answers). KHÔNG
  extract tone từ phần CÂU HỎI — câu hỏi là tone của LDN, không
  phải của tôi.
- Nếu tài liệu là sample bài viết cũ, draft, email dài, note
  cá nhân: đọc toàn bộ.
- Nếu tài liệu có nhiều tác giả (chat log, group discussion):
  hỏi lại tôi filter theo tên.

Extract theo 7 dimensions sau:

1. Voice — Trang trọng hay casual? Direct hay indirect? Có xu
   hướng dùng ẩn dụ/so sánh không? Humor có không?
2. Rhythm — Câu ngắn hay dài? Có mix burstiness không? Đoạn
   ngắn hay dài?
3. Vocabulary — 5-10 từ/cụm đặc trưng tôi hay dùng (tiếng Việt
   + tiếng Anh keyword nếu có mix)
4. Perspective — Xưng hô như nào (mình/tôi/anh-chị)? Gọi
   reader như nào (bạn/anh/em)? Distance với reader?
5. Core values — 3-5 giá trị sống cốt lõi phản ánh qua cách
   tôi viết (không phải điều tôi tuyên bố, mà điều tôi thể
   hiện qua chữ)
6. Expertise domain — Lĩnh vực tôi biết sâu, niche có thể
   viết authoritative
7. Reader archetype — Hình dung độc giả lý tưởng của tôi là
   ai (nghề, độ tuổi, pain point)

OUTPUT FORMAT — output đúng block dưới, không thêm preface,
không diễn giải, không markdown phức tạp. Tôi sẽ copy nguyên
block này để paste vào tool khác.

TONE PROFILE:
Voice: [1-2 câu mô tả]
Rhythm: [1 câu]
Vocabulary: [list 5-10 từ/cụm, cách nhau dấu phẩy]
Perspective: [1 câu — xưng hô + reader address + distance]
Core values: [3-5 giá trị, cách nhau dấu /]
Expertise domain: [1 câu mô tả domain chính]
Reader archetype: [1-2 câu mô tả persona độc giả]

KHÔNG output gì ngoài block TONE PROFILE ở trên. Không thêm
"Chúc bạn may mắn" hay "Hy vọng hữu ích". Output block thuần,
user sẽ copy ngay.
```

---

## Ví dụ output đúng format

```
TONE PROFILE:
Voice: Casual nhưng chín chắn. Direct. Hay dùng so sánh đời
thường. Có humor nhẹ, không sarcasm.
Rhythm: Mix câu ngắn-dài. Burstiness cao. Đoạn ngắn 2-4 câu.
Vocabulary: framework, pattern, debug, insight, scale, pivot,
"thật ra", "chẳng qua", "điểm mấu chốt"
Perspective: Xưng "mình", gọi reader "bạn". Distance gần, thân
mật như bạn bè lâu năm.
Core values: Chân thực / thực dụng / ham học / reflection /
build-in-public
Expertise domain: Semiconductor DFT + AI system building +
personal knowledge management
Reader archetype: Chuyên gia Việt 5-15 năm kinh nghiệm, bận
rộn, muốn học nhanh bài học thực chiến thay vì lý thuyết.
```

---

## Troubleshooting

- **Chatbot output dài dòng / thêm preface** → nhắc nó "chỉ
  output đúng block TONE PROFILE, không thêm gì khác"
- **Chatbot không đọc được memory cũ** → thử chatbot khác có
  memory tốt hơn (ChatGPT Plus, Claude Projects, Gemini Gem)
- **Không có tài liệu + memory** → paste 2-3 sample bài viết cũ
  của bạn vào chat, chatbot sẽ infer từ samples
- **Không có gì để extract** → dùng `tone_backup.md` làm
  fallback template
