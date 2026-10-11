# Project rules — IA#1 cartTotal

## Mục tiêu

Hoàn thành bài IA#1 của CSC13008 và giúp sinh viên hiểu, giải thích được từng dòng code. Đọc README.md trước khi thay đổi hành vi. README.md là đặc tả của bài.

## Stack

- JavaScript thuần, dùng ES modules (import/export).
- Node.js và npm; test dùng node:test và node:assert/strict có sẵn trong Node.js.
- Không thêm dependency hoặc devDependency bên ngoài.

## Các file liên quan

- src/cart.js: triển khai hàm cartTotal.
- test/cart.test.js: kiểm tra hành vi của hàm.
- package.json: khai báo lệnh của dự án.
- README.md: đặc tả và yêu cầu nộp bài.
- CLAUDE.md: quy tắc làm việc trong dự án.
- brief.md, AI-LOG.md, SELF_ASSESSMENT_REPORT.md: brief, log và báo cáo theo yêu cầu bài tập.
- PROJECT_SUMMARY.md: đối chiếu yêu cầu, kết quả và hướng dẫn vấn đáp.
- scripts/package.ps1: đóng gói trên Windows; submission/ chứa ZIP được Git bỏ qua.
- evidence/ci-success.png: ảnh bằng chứng CI thành công do sinh viên cung cấp.

Giới hạn sửa file theo brief của từng nhiệm vụ. Giải thích trước khi sửa code hoặc cấu hình. Không thay đổi README.md để làm đặc tả khớp với code sai.

## Hợp đồng của hàm

Giữ nguyên export và chữ ký cartTotal(items, options).

- items là mảng các object { name, price, qty }.
- options là object { vatRate, freeShipFrom, shipFee }.
- subtotal là tổng price * qty của các sản phẩm.
- VAT bằng subtotal * vatRate.
- Shipping bằng 0 khi subtotal >= freeShipFrom; ngược lại bằng shipFee.
- Trả về Math.round(subtotal + VAT + shipping), có kiểu number.
- Giỏ hàng rỗng trả về 0, không tính VAT hoặc shipping.
- price âm phải ném RangeError.
- qty không phải số nguyên dương phải ném RangeError, gồm số thập phân, 0 và số âm.
- Ví dụ trong README.md phải trả về số 467400.
- Không tự thêm yêu cầu ngoài đặc tả; nếu gặp điểm chưa rõ, giải thích giả định.

## Commands và kiểm tra

Chạy từ thư mục gốc dự án:

~~~sh
npm test
npm run format:check
npm run check
~~~

Đóng gói trên Windows: ./scripts/package.ps1; thêm -StudentID với MSSV thật để tạo tên nộp chính thức. Script chạy gate, lấy điểm từ SELF_ASSESSMENT_REPORT.md và không ghi đè ZIP đã có.

npm test chạy node --test. npm run format:check kiểm tra tab, khoảng trắng cuối dòng và xuống dòng cuối file trong src/, test/, scripts/, .github/workflows/ và package.json. npm run check chạy format trước, rồi chạy test nếu format đạt. Đây là kiểm tra định dạng cơ bản, không phải formatter đầy đủ.

Xem thay đổi trước khi chấp nhận:

~~~sh
git status --short
git diff
~~~

Với file mới chưa được Git theo dõi, đọc toàn bộ nội dung vì git diff thông thường chưa hiển thị file đó.

CI được cấu hình trong .github/workflows/ci.yml để chạy npm run check trên push và pull request bằng Node.js 22. Không cần npm install vì dự án không có dependencies. Cấu hình trong repository không chứng minh CI đã chạy thành công; cần xem kết quả trong GitHub Actions sau khi push.

## Quy trình làm việc

1. Đọc đặc tả, brief nếu đã có, và các file liên quan trước khi đề xuất thay đổi.
2. Nêu vấn đề, vị trí, lý do và cách kiểm tra; giải thích bằng tiếng Việt cho người mới học.
3. Khi sửa lỗi hành vi, thêm test phù hợp nếu thiếu, xác nhận test thất bại vì lỗi đó khi có thể, rồi sửa implementation.
4. Giữ thay đổi nhỏ, dễ đọc và trong phạm vi nhiệm vụ. Ưu tiên code sinh viên có thể giải thích được.
5. Chạy npm test sau thay đổi code hoặc test. Mỗi test nên tập trung vào một hành vi và chỉ có một nguyên nhân thất bại chính.
6. Đọc diff của file đã theo dõi và nội dung file mới; giải thích mọi thay đổi có ý nghĩa.
7. Ghi AI-LOG.md khi công việc còn mới trong trí nhớ. Phân biệt đề xuất của AI, phần đã giữ, đã sửa, đã từ chối và phần sinh viên tự làm.
8. Chỉ đánh giá điểm dựa trên bằng chứng thực tế. Tổng điểm tự chấm phải khớp với tên zip nộp bài.

## Never — những điều không được làm

- Never sửa kết quả mong đợi hoặc bỏ test chỉ để implementation sai vượt qua kiểm tra.
- Never thêm dependency hoặc devDependency bên ngoài.
- Never đổi chữ ký hàm, bỏ export hoặc trả về chuỗi thay cho number.
- Never dùng toFixed() làm giá trị trả về trực tiếp vì nó trả về string.
- Never tuyên bố test, lint/format hoặc CI đã đạt nếu chưa chạy và xem kết quả. Nếu công cụ không chạy được, ghi rõ giới hạn xác minh.
- Never bịa commit, test, bằng chứng, gợi ý đã từ chối hoặc phần làm bằng tay.
- Never mô tả lịch sử làm bài như thể đã theo đúng thứ tự yêu cầu nếu thực tế khác. Theo thông tin sinh viên cung cấp, test RED ban đầu, implementation và test bổ sung đã được làm trước khi thiết lập harness và brief.
- Never đưa API key, dữ liệu người dùng thật hoặc bài làm của bạn học vào prompt hay repository.

## Repository và bằng chứng CI hiện tại

Repository cá nhân: https://github.com/letanthanh160606-cloud/IA1-cartTotal

Quality checks #1: https://github.com/letanthanh160606-cloud/IA1-cartTotal/actions/runs/38140175587 — ảnh sinh viên xác nhận Success cho commit a5fe728. Không dùng kết quả này để tuyên bố các commit sau cũng đã chạy đạt; kiểm tra lần chạy tương ứng sau khi push. Không thay đổi lịch sử trong AI-LOG.md; ghi thêm entry khi có bằng chứng mới.
