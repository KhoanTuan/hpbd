# Đưa trang sinh nhật lên Vercel, có lưu điều ước

1. Trên Vercel, vào **Storage** (hoặc Marketplace) và tạo một **Neon Postgres**. Liên kết nó với project. Vercel sẽ tự thêm biến `DATABASE_URL`.
2. Vào **Settings → Environment Variables**, thêm `ADMIN_TOKEN` là một chuỗi bí mật dài, chỉ bạn biết.
3. Đưa thư mục này lên GitHub, hoặc chạy `npx vercel` trong thư mục này. Vercel sẽ deploy `index.html` và hai hàm trong `api/`.
4. Xem điều ước: mở terminal và chạy

   curl -H "Authorization: Bearer <ADMIN_TOKEN>" https://<ten-project>.vercel.app/api/wishes

   Hoặc vào dashboard của Neon, bảng `wishes`.

Người khác không gọi được `/api/wishes` nếu không có `ADMIN_TOKEN`.
