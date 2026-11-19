# Lẩu Treo Xóm Lào — Demo Website (Đà Lạt)

Trang web giới thiệu & đặt bàn trực tuyến cho quán lẩu nướng ngắm hoàng hôn tại Trại Mát, Đà Lạt.

## Tính năng nổi bật
- **Giờ hoàng hôn & Nhiệt độ thực tế**: Tự động tính toán giờ mặt trời lặn tại Trại Mát theo thuật toán thiên văn NOAA và lấy nhiệt độ thời gian thực qua Open-Meteo API.
- **Thực đơn thông minh**: Gợi ý combo theo số người (2, 4, 6, 10 người), bộ lọc món ăn, tự chọn món ước tính chi phí và thanh tiến trình nhận quà tặng theo mốc hoá đơn.
- **Chọn khu vực chỗ ngồi trực quan**: Dọc lan can, Khu có mái che, Bàn gỗ thấp, Bàn dài cho nhóm.
- **Phiếu đặt bàn & Trợ lý AI 24/7**: Hỗ trợ đặt bàn nhanh, chọn sẵn vị lẩu, gửi qua API `/api/booking` hoặc kết nối Zalo/SMS trực tiếp.

## Cấu trúc thư mục
- `index.html`: Giao diện chính chuẩn SEO, tích hợp Schema Restaurant & SVG Sprite.
- `styles.css`: Thiết kế Mobile-First, giao diện tối ấm áp (`#110d0b`, `#cf5f2c`, `#d6b373`).
- `app.js`: Xử lý tương tác thực đơn, đặt bàn, tính giờ hoàng hôn và Chatbot AI.
- `api/booking.js` & `api/chat.js`: Vercel Serverless Functions xử lý đặt bàn và trả lời tự động.
- `assets/`: Hình ảnh WebP tối ưu dung lượng và video phóng sự.
