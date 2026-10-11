# Brief — Hoàn thiện IA#1 cartTotal

Ngày viết: 2026-10-10.

Brief này được viết khi implementation và sáu test đã có. Đây là nhiệm vụ kiểm tra, bổ sung test và hoàn thiện project hiện tại, không phải brief đã dùng trước implementation ban đầu. Thứ tự thực tế được ghi trong AI-LOG.md.

## Mục tiêu và stack

Hoàn thiện `cartTotal(items, options)` đúng README.md bằng JavaScript thuần, ES modules và các công cụ có sẵn trong Node.js. **No dependencies**: không thêm dependency hoặc devDependency. Giữ code dễ hiểu để sinh viên giải thích được trong vấn đáp.

Đọc README.md và CLAUDE.md trước khi sửa. Giải thích thay đổi bằng tiếng Việt, kèm lý do và cách xác minh.

## Phạm vi file được sửa

- `src/cart.js`: chỉ sửa nếu phát hiện sai đặc tả hoặc cần chỉnh chú thích.
- `test/cart.test.js`: bổ sung test hành vi; giữ các kết quả đúng theo README.md.
- `scripts/check-format.js`, `package.json`, `.github/workflows/ci.yml`: hoàn thiện quality gate và CI khi cần.
- `scripts/package.ps1`, `.gitignore`, `evidence/ci-success.png`: chuẩn bị ZIP, lưu ảnh CI do sinh viên cung cấp và loại trừ file sinh ra.
- `CLAUDE.md`, `brief.md`, `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md`, `PROJECT_SUMMARY.md`: hoàn thiện tài liệu dựa trên bằng chứng thực tế.
- `README.md`: được bổ sung hướng dẫn chạy, cấu trúc và đóng gói; giữ nguyên đặc tả và yêu cầu nộp bài gốc.

Không sửa `.git`, không tự commit hoặc push, không điền thông tin cá nhân hay URL GitHub nếu sinh viên chưa cung cấp.

## Hợp đồng hàm

Giữ nguyên `export function cartTotal(items, options)`.

- `items`: mảng `[{ name, price, qty }]`. `name` chỉ là nhãn, không tham gia tính tiền.
- `options`: `{ vatRate, freeShipFrom, shipFee }`; `vatRate` là tỉ lệ, ví dụ `0.08` tương ứng 8%.
- `subtotal = sum(price * qty)`.
- `VAT = subtotal * vatRate`.
- `shipping = 0` nếu `subtotal >= freeShipFrom`; ngược lại bằng `shipFee`. Ngưỡng so với subtotal trước VAT.
- Giỏ rỗng trả về số `0`, không VAT, không shipping.
- Giỏ có sản phẩm trả về `Math.round(subtotal + VAT + shipping)`: kiểu JavaScript `number`, làm tròn một lần ở tổng cuối cùng đến đồng nguyên.
- Ví dụ hai áo giá 180000 và một sổ giá 45000, VAT 0.08, ngưỡng 500000, ship 30000 phải trả về `467400`.

## Lỗi bắt buộc

- `price < 0`: ném `RangeError`.
- `qty` không phải số nguyên dương: ném `RangeError`, gồm số thập phân, `0` và số âm.
- Dùng `Number.isInteger(qty)` và kiểm tra `qty > 0`.

Đầu vào khác được giả định tuân theo cấu trúc đặc tả. Không tự thêm chính sách cho options thiếu, VAT âm, giá không phải số hoặc dữ liệu quá lớn vì bài chưa quy định.

## Test và điều kiện hoàn thành

1. Chạy gate hiện tại làm mốc; đọc diff trước khi sửa.
2. Bổ sung test số lượng âm, miễn ship trên ngưỡng, thu ship dưới ngưỡng dù sau VAT vượt ngưỡng, giá bằng 0, kiểu trả về và làm tròn lên/xuống/một lần ở tổng cuối.
3. Mỗi test tập trung vào một hành vi; expected được tính độc lập, không dùng chính implementation để tính expected.
4. Chạy `npm run check`: format phải đạt và toàn bộ test phải đạt.
5. Kiểm chứng format gate có thể phát hiện lỗi, đọc diff các file đã theo dõi và toàn bộ file mới.
6. CI cấu hình chạy `npm run check` trên push và pull request. Chỉ ghi CI đạt khi có kết quả trên GitHub.
7. Viết log trung thực, báo cáo có đúng năm hàng rubric và file tổng kết đối chiếu yêu cầu với kết quả.
8. Tạo ZIP chứa code, test, harness, brief và báo cáo; không chứa `.git`, `.env`, `node_modules` hay ZIP cũ. Kiểm tra lại gate từ bản giải nén.

## Tài liệu và giới hạn

Tại thời điểm viết brief, sinh viên yêu cầu để trống MSSV, họ tên và URL GitHub. Cập nhật ngày 2026-10-11: sinh viên cung cấp MSSV 24127540 và họ tên Lê Tấn Thành; đã điền vào báo cáo và tổng kết. Cập nhật tiếp sau khi sinh viên push: repository https://github.com/letanthanh160606-cloud/IA1-cartTotal; CI Success được ghi bằng URL run và ảnh evidence/ci-success.png. Khi chưa có MSSV, ZIP mang tên bản nháp; trước khi nộp phải đổi thành `<StudentID>_<total>.zip`, với total bằng điểm trong báo cáo. Điểm tự chấm là đề xuất để sinh viên đọc và chịu trách nhiệm, không phải điểm đã được giảng viên xác nhận.

Không bịa lịch sử RED, commit, CI, phần viết tay hoặc đề xuất sinh viên đã từ chối. Ghi rõ phần lịch sử do sinh viên thuật lại và phần được công cụ xác minh.
