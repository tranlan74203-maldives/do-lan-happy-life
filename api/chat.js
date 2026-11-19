export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { messages = [] } = req.body || {};
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const q = lastUser.toLowerCase();
  const hasPhone = /(0|\+84)\d{8,10}/.test(q.replace(/[\s.-]/g, ""));

  if (hasPhone) {
    return res.status(200).json({
      reply:
        "Dạ em đã ghi nhận số điện thoại và yêu cầu giữ bàn của anh/chị rồi ạ! Quản lý quán sẽ liên hệ xác nhận với mình ngay. Anh/chị cần dặn bếp chuẩn bị sẵn Lẩu gà lá quế trước khi đến không ạ?",
      leadCaptured: true,
      suggestedQuestion: "Món ngon & món không cay cho bé?",
    });
  }

  if (q.includes("hoàng hôn") || q.includes("giờ") || q.includes("đặt bàn") || q.includes("giữ bàn")) {
    return res.status(200).json({
      reply:
        "Dạ anh/chị nên đến trước giờ mặt trời lặn khoảng 45 phút (tầm 16:30) để chọn bàn Dọc lan can ngắm trọn hoàng hôn và thung lũng lên đèn ạ.\n\nAnh/chị đi mấy người và muốn đặt lúc mấy giờ? Nhắn giúp em Tên + Số điện thoại tại đây hoặc điền Phiếu đặt bàn ngay trên trang nhé!",
      leadCaptured: false,
      suggestedQuestion: "Món ngon & món không cay cho bé?",
    });
  }

  if (q.includes("món") || q.includes("không cay") || q.includes("bé") || q.includes("trẻ") || q.includes("lẩu") || q.includes("giá")) {
    return res.status(200).json({
      reply:
        "Dạ món đặc trưng nhất tại quán là Lẩu gà lá quế (259.000đ) — nước dùng thanh ngọt, thơm lá quế, ớt để riêng nên bé ăn thoải mái ạ!\n\nNgoài ra các bé rất thích Gà nướng mật ong (159.000đ), Ba chỉ bò cuộn nấm (169.000đ) và Cơm chiên trái thơm (95.000đ).",
      leadCaptured: false,
      suggestedQuestion: "Trời mưa có khu mái che không?",
    });
  }

  if (q.includes("mưa") || q.includes("mái che") || q.includes("chỗ ngồi") || q.includes("lan can")) {
    return res.status(200).json({
      reply:
        "Dạ quán có cả khu bàn Dọc lan can ngoài trời cạnh khinh khí cầu lẫn Khu sảnh mái che kiên cố, rộng rãi và ấm áp, vẫn nhìn thẳng ra toàn cảnh thung lũng nhà kính Trại Mát. Ngày mưa hoặc đi cùng ông bà, em bé đều ngồi rất yên tâm ạ!",
      leadCaptured: false,
      suggestedQuestion: "Chỉ đường & đỗ xe từ chợ Đà Lạt",
    });
  }

  if (q.includes("đường") || q.includes("địa chỉ") || q.includes("ở đâu") || q.includes("đỗ xe") || q.includes("ô tô")) {
    return res.status(200).json({
      reply:
        "Dạ quán nằm tại Lô C1, Khu tái định cư Huỳnh Tấn Phát, Trại Mát, Đà Lạt (cách chợ Đà Lạt khoảng 7–8km, đi tầm 15–20 phút). Đường nhựa rộng rãi, có chỗ đỗ xe máy và ô tô thoải mái ạ!",
      leadCaptured: false,
      suggestedQuestion: "Đặt bàn ngắm hoàng hôn chiều nay",
    });
  }

  return res.status(200).json({
    reply:
      "Dạ cảm ơn anh/chị đã nhắn tin cho Lẩu Treo Xóm Lào! Quán mở cửa 12:00 – 23:00 hàng ngày tại Lô C1 Huỳnh Tấn Phát, Trại Mát.\n\nAnh/chị có thể để lại Tên + SĐT + Giờ đến + Số khách ngay trong khung chat này để em giữ bàn đẹp ngắm hoàng hôn, hoặc gọi hotline 0989 706 168 nhé ạ!",
    leadCaptured: false,
    suggestedQuestion: "Đặt bàn ngắm hoàng hôn chiều nay",
  });
}
