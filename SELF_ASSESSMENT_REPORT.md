# Self-assessment — IA#1

Submitted by: 24127540 — Lê Tấn Thành

Student ID: 24127540

Full name: Lê Tấn Thành

GitHub repository URL:

Total I claim: 95 / 100

**Bản nháp tự chấm do Codex đề xuất để sinh viên đọc, điều chỉnh và xác nhận trước khi nộp. Đây không phải điểm đã được giảng viên chấm.** MSSV và họ tên đã điền theo thông tin sinh viên cung cấp ngày 2026-10-11; URL GitHub vẫn để trống theo yêu cầu. Rubric được đối chiếu với nội dung sinh viên cung cấp; nếu rubric Classroom có chi tiết khác, cần cập nhật điểm theo bản chính thức.

| Criterion | Max | I claim | Evidence |
|---|---:|---:|---|
| Behaviour | 30 | 30 | [src/cart.js](src/cart.js): giỏ rỗng, kiểm tra giá và số lượng, subtotal, VAT, shipping, Math.round. [test/cart.test.js](test/cart.test.js): the example from the slides = 467400; free shipping at the threshold = 540000; empty cart returns 0; negative price/non-integer quantity/zero quantity/negative quantity throws RangeError. |
| Tests | 20 | 20 | [test/cart.test.js](test/cart.test.js): 14 test, bao phủ yêu cầu chính, ngưỡng trước VAT, số âm, giá 0, kiểu number và làm tròn. Ngày 2026-10-10 chạy npm run check: tests 14, pass 14, fail 0. Mỗi test tập trung một hành vi, expected được ghi độc lập. |
| Harness | 20 | 16 | [CLAUDE.md](CLAUDE.md): stack, commands, Never và quy tắc project. [package.json](package.json): npm run check chạy format rồi test. [scripts/check-format.js](scripts/check-format.js): kiểm tra whitespace; đã thử phát hiện tab, trailing whitespace và thiếu newline. [.github/workflows/ci.yml](.github/workflows/ci.yml): cấu hình push/pull_request, nhưng chưa có lần chạy CI trên repository cá nhân. Tự chấm theo nhóm rules + working gate, chưa có CI được xác minh. |
| Brief | 15 | 15 | [brief.md](brief.md): mục tiêu, stack, phạm vi file được sửa, chữ ký, inputs, công thức, RangeError, no dependencies, điều kiện nghiệm thu và giới hạn. Brief ghi rõ được viết sau implementation ban đầu, cho vòng hoàn thiện hiện tại. |
| AI-LOG.md | 15 | 14 | [AI-LOG.md](AI-LOG.md): tool, Asked for, Kept, Changed, Rejected, By hand; có lịch sử sinh viên thuật lại, công việc Codex thực hiện, kết quả xác minh và giới hạn. Chưa có xác nhận sinh viên đã review hết; lịch sử ban đầu không có ngày thực hiện cụ thể hoặc output gốc lưu trong repository. |

Tổng: 30 + 20 + 16 + 15 + 14 = 95.

## What I did not manage

- Chưa có bằng chứng CI chạy thành công trên repository cá nhân. origin hiện vẫn là repository starter của thầy; không tự đổi remote hoặc push.
- Theo lịch sử sinh viên cung cấp, đã làm implementation và test trước khi thiết lập harness và brief, khác thứ tự yêu cầu. Không thể sửa lại lịch sử đã xảy ra.
- URL repo vẫn để trống; chưa có xác nhận sinh viên hiểu toàn bộ thay đổi hoặc xác nhận điểm 95. Thông tin cá nhân đã điền; báo cáo và ZIP vẫn cần sinh viên duyệt trước khi nộp.
- Format gate chỉ kiểm tra whitespace cơ bản, không chuẩn hóa mọi kiểu trình bày như formatter đầy đủ. Không thêm công cụ ngoài vì yêu cầu no dependencies.

## What I would do differently

- Đọc rubric, dựng harness và viết brief trước vòng implementation đầu tiên.
- Ghi AI log ngay trong từng buổi và lưu output kiểm tra làm bằng chứng.
- Tạo repository cá nhân và xác nhận CI sớm nếu muốn đạt mức cao nhất của harness.
- Tự giải thích mỗi thay đổi và ghi cụ thể các chỉnh sửa do mình làm, thay vì chỉ nhận file do AI tạo.

## Before submission

1. Kiểm tra MSSV 24127540 và họ tên Lê Tấn Thành; URL repo chỉ điền nếu có.
2. Đọc toàn bộ diff, AI log và báo cáo; điều chỉnh nội dung và điểm nếu cần. Không tự ghi đã hiểu khi chưa hiểu.
3. Chạy npm run check. Nếu có kết quả CI, bổ sung link bằng chứng và chấm lại Harness.
4. Tạo ZIP mới bằng scripts/package.ps1 sau các chỉnh sửa. Tên nộp chính thức là 24127540_95.zip nếu giữ điểm 95; nếu đổi điểm, tên ZIP phải đổi theo tổng mới.
5. Giải nén ZIP và chạy npm run check để kiểm tra lại.
