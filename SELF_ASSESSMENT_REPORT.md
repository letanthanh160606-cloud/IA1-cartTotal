# Self-assessment — IA#1

Submitted by: 24127540 — Lê Tấn Thành

Student ID: 24127540

Full name: Lê Tấn Thành

GitHub repository URL: [IA1-cartTotal](https://github.com/letanthanh160606-cloud/IA1-cartTotal)

CI evidence: [Quality checks #1 — Success](https://github.com/letanthanh160606-cloud/IA1-cartTotal/actions/runs/38140175587) — [ảnh bằng chứng](evidence/ci-success.png)

Code commit: [a5fe728](https://github.com/letanthanh160606-cloud/IA1-cartTotal/commit/a5fe728b3dbcbe3c4270fe6ca46f20e14f067d65)

Total I claim: 99 / 100

Điểm tự đánh giá do Codex đề xuất, cần sinh viên đọc và xác nhận trước khi nộp; không phải điểm giảng viên đã chấm. Rubric đối chiếu theo nội dung sinh viên cung cấp. Bằng chứng CI là ảnh do sinh viên gửi ngày 2026-10-11: workflow Quality checks #1, event push, nhánh main, commit a5fe728, status Success, job check đạt. Không coi ảnh này là bằng chứng của một commit tài liệu được tạo sau đó.

| Criterion | Max | I claim | Evidence |
|---|---:|---:|---|
| Behaviour | 30 | 30 | [src/cart.js](src/cart.js): giỏ rỗng, giá âm, số lượng nguyên dương, subtotal, VAT, shipping và Math.round. [test/cart.test.js](test/cart.test.js): the example from the slides = 467400; free shipping at the threshold = 540000; empty cart returns 0; negative price/non-integer quantity/zero quantity/negative quantity throws RangeError. |
| Tests | 20 | 20 | [test/cart.test.js](test/cart.test.js): 14 test có header Test 1–14 và chú thích; bao phủ ngưỡng trước VAT, giá 0, kiểu number và làm tròn. Đã chạy npm run check cục bộ: tests 14/pass 14/fail 0; sinh viên cũng gửi output tự chạy đạt. Mỗi test tập trung một hành vi; expected được tính độc lập. |
| Harness | 20 | 20 | [CLAUDE.md](CLAUDE.md): stack, commands và Never cụ thể cho project. [package.json](package.json): gate format + test; [scripts/check-format.js](scripts/check-format.js): đã kiểm chứng phát hiện lỗi whitespace. [.github/workflows/ci.yml](.github/workflows/ci.yml): push/pull_request, npm run check. [CI #1 Success](https://github.com/letanthanh160606-cloud/IA1-cartTotal/actions/runs/38140175587) xác nhận workflow chạy trên push của commit a5fe728 trong repository cá nhân. |
| Brief | 15 | 15 | [brief.md](brief.md): phạm vi file, chữ ký, inputs, công thức, RangeError, no dependencies, điều kiện nghiệm thu. Ghi rõ brief cho vòng hoàn thiện được viết sau implementation ban đầu. |
| AI-LOG.md | 15 | 14 | [AI-LOG.md](AI-LOG.md): Tool, Asked for, Kept, Changed, Rejected, By hand; ghi lịch sử thực tế, phân biệt phần sinh viên thuật lại và phần công cụ xác minh, có các bước review/test/commit/push do sinh viên thực hiện. Chưa có ngày thực hiện chính xác hoặc output RED gốc lưu trong repository; không tự chấm tối đa cho hồ sơ lịch sử. |

Tổng: 30 + 20 + 20 + 15 + 14 = 99.

## What I did not manage

- Theo lịch sử sinh viên cung cấp, đã làm implementation và test trước harness/brief, khác thứ tự yêu cầu. Không dựng lại lịch sử như thể đã theo đúng thứ tự từ đầu.
- Chưa lưu output RED ban đầu và ngày thực hiện chính xác vào repository. Log bổ sung được ghi rõ là dựa trên thông tin sinh viên cung cấp.
- Format gate là kiểm tra whitespace cơ bản, không chuẩn hóa mọi kiểu trình bày như formatter đầy đủ; giữ yêu cầu no dependencies.
- Lần CI thành công có warning về runtime của Actions v4 và notice về ubuntu-latest. Workflow vẫn Success; chưa nâng cấp cấu hình trong lần cập nhật tài liệu này.
- Sinh viên cần xác nhận điểm tự chấm và khả năng giải thích toàn bộ code. Không tuyên bố đã hoàn tất vấn đáp hoặc đã nộp Classroom.

## What I would do differently

- Đọc rubric, dựng harness và viết brief trước implementation đầu tiên.
- Ghi AI log và lưu output xác minh ngay trong từng buổi.
- Thiết lập repository cá nhân và CI từ sớm.
- Nâng cấp Actions lên phiên bản dùng runtime được hỗ trợ và chọn phiên bản Ubuntu cụ thể khi bảo trì; xác nhận lại CI sau mỗi thay đổi workflow.

## Before submission

1. Kiểm tra thông tin 24127540 — Lê Tấn Thành, URL repository và bằng chứng CI ở đầu báo cáo.
2. Đọc AI log và báo cáo; xác nhận hoặc điều chỉnh điểm. Nếu đổi tổng điểm, tạo lại ZIP theo tổng mới.
3. Các thay đổi tài liệu sau commit a5fe728 cần được commit/push để repository trực tuyến phản ánh đúng nội dung ZIP. Kiểm tra CI của commit cập nhật trước khi nộp.
4. ZIP theo điểm đề xuất hiện tại là 24127540_99.zip, được tạo bằng ./scripts/package.ps1 -StudentID '24127540'. Các ZIP 95 điểm cũ là phiên bản trước.
5. Kiểm tra bản giải nén bằng npm run check. Nộp ZIP trên Classroom bằng tài khoản sinh viên thầy yêu cầu, sau đó xác nhận trạng thái đã nộp.
