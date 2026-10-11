# Tổng kết IA#1 — cartTotal với harness

Ngày hoàn thiện cục bộ: 2026-10-10.

MSSV: 24127540

Họ tên: Lê Tấn Thành

URL repository GitHub:

## Yêu cầu bài tập

Theo README.md và rubric sinh viên đã cung cấp, bài yêu cầu viết cartTotal bằng JavaScript không dependencies, có test và harness, brief, AI log, báo cáo tự đánh giá. Nộp một ZIP tên <StudentID>_<total>.zip. Không thấy yêu cầu bắt buộc nộp bằng URL GitHub trong README; CI trên push là điều kiện hướng tới mức điểm cao nhất của Harness.

Thứ tự yêu cầu: Harness → Brief → Plan/Implement/Validate và đọc diff → AI log.

Thứ tự thực tế, theo sinh viên thuật lại và công việc trong phiên: test RED ban đầu → implementation → thêm test → rules/format/CI → brief cho vòng hoàn thiện → bổ sung test và validate → tài liệu/đóng gói. Không tuyên bố đã làm đúng thứ tự từ đầu.

## Đối chiếu yêu cầu với kết quả

| Yêu cầu | Kết quả hiện tại | Bằng chứng |
|---|---|---|
| JavaScript thuần, không dependencies | Có; chỉ dùng Node.js built-ins cho code/test/gate. Đóng gói dùng PowerShell và .NET sẵn trên Windows | package.json; src/cart.js; scripts/ |
| Đúng chữ ký cartTotal(items, options) | Giữ nguyên named export | src/cart.js |
| Subtotal, VAT, shipping | Tính đúng; ngưỡng so subtotal trước VAT | the example from the slides; shipping uses subtotal before VAT |
| Ví dụ = 467400 | Đạt | the example from the slides |
| Miễn ship tại/vượt ngưỡng | Đạt; ngưỡng 500000, test tại ngưỡng trả 540000 | free shipping at the threshold; free shipping above the threshold |
| Giỏ rỗng trả 0 | Đạt, không VAT/ship | empty cart returns 0 |
| Giá âm ném RangeError | Đạt | negative price throws RangeError |
| Số lượng là số nguyên dương | Đạt: test số thập phân, 0 và âm | Ba test quantity tương ứng |
| Giá bằng 0 được phép | Đạt; giỏ có món giá 0 vẫn tính ship khi dưới ngưỡng | zero price is allowed and still incurs shipping below threshold |
| Trả number, làm tròn đồng | Đạt; làm tròn một lần ở tổng cuối | result has number type; ba test rounds... |
| npm test xanh | Đạt: 14 test, 14 pass, 0 fail | npm run check ngày 2026-10-10 |
| Rules file có stack, commands, Never | Đã có, cụ thể cho project | CLAUDE.md |
| Gate gồm test và format/lint | Đạt cục bộ: format check + node --test | package.json; scripts/check-format.js |
| CI chạy trên push | Đã cấu hình; chưa có lần chạy trên GitHub được xác minh | .github/workflows/ci.yml |
| Brief rõ phạm vi và đặc tả | Đã có, viết cho vòng hoàn thiện sau implementation | brief.md |
| AI log trung thực | Đã ghi các buổi Codex và phần lịch sử sinh viên cung cấp; không bịa phần tự làm hay từ chối | AI-LOG.md |
| Tự đánh giá đủ năm tiêu chí | Có; điểm đề xuất 95/100, còn cần sinh viên xác nhận | SELF_ASSESSMENT_REPORT.md |
| ZIP đúng nội dung | Bản nháp trước đã được giải nén và kiểm tra đạt. Sau khi điền thông tin, đóng gói thành 24127540_95.zip gồm 13 file; điểm 95 còn cần sinh viên xác nhận | scripts/package.ps1; submission/ |

## Kết quả kiểm tra thực tế

- Môi trường cục bộ: Node.js v24.18.0, npm 11.16.0. CI cấu hình Node.js 22; chưa xác minh chạy ở môi trường CI.
- Lần kiểm tra ban đầu của phiên: 6 test đạt.
- Sau bổ sung test: npm run check đạt; format kiểm tra 5 file, tests 14 / pass 14 / fail 0.
- Đã kiểm tra formatIssues phát hiện tab, khoảng trắng cuối dòng và thiếu newline, đồng thời chấp nhận nội dung hợp lệ.
- git diff --check đạt; đã đọc diff file có theo dõi và đọc nội dung các file mới.
- Đã kiểm tra ZIP gồm đủ 13 file, có .github/workflows/ci.yml và không có nội dung bị loại trừ. Gate từ bản giải nén đạt: format 5 file, tests 14/pass 14/fail 0.
- Logic tính tiền không đổi trong phiên hoàn thiện; src/cart.js chỉ cập nhật chú thích đầu file. Thêm 8 test thay vì viết lại hàm đang đúng.

## Các file và cách dùng

| File | Vai trò |
|---|---|
| src/cart.js | Hàm tính tổng giỏ hàng |
| test/cart.test.js | 14 test hành vi |
| scripts/check-format.js | Cổng kiểm tra whitespace |
| .github/workflows/ci.yml | Tự chạy gate trên GitHub |
| CLAUDE.md | Quy tắc làm việc cho trợ lý |
| brief.md | Giao nhiệm vụ và điều kiện hoàn thành |
| AI-LOG.md | Ghi rõ sự hỗ trợ AI và lịch sử thực tế |
| SELF_ASSESSMENT_REPORT.md | Điểm đề xuất và bằng chứng rubric |
| scripts/package.ps1 | Tạo ZIP trên Windows, lấy tổng điểm từ báo cáo |
| PROJECT_SUMMARY.md | File tổng kết bạn đang đọc |

Chạy từ thư mục gốc:

~~~sh
npm test
npm run format:check
npm run check
git diff
git status --short
~~~

Không cần npm install. Trong npm run check, && chỉ chạy test nếu format đạt. Script format báo lỗi bằng cách ném Error, khiến Node trả mã thất bại. Kiểm tra này chỉ xử lý whitespace; nó không thay thế test hành vi.

Đóng gói trên Windows PowerShell:

~~~powershell
./scripts/package.ps1
# Sau khi điền thông tin và xác nhận điểm, dùng MSSV thật:
./scripts/package.ps1 -StudentID 'YOUR_STUDENT_ID'
~~~

Script đọc total trong báo cáo nên tên ZIP tự khớp điểm. ZIP chỉ chứa danh sách file cần nộp, có .github, không có .git, .env, node_modules hoặc ZIP cũ. Nếu ZIP cùng tên đã tồn tại, script từ chối ghi đè; chuyển bản cũ sang tên lưu trữ khác trước khi tạo lại.

## Những gì còn cần bạn xác nhận trước khi nộp

1. Kiểm tra MSSV 24127540, họ tên Lê Tấn Thành; đọc và xác nhận điểm tự chấm. Tổng hiện tại 95 là đề xuất: Behaviour 30, Tests 20, Harness 16, Brief 15, AI log 14.
2. Đọc AI log; sửa các mục Kept/Changed/Rejected/By hand theo công việc thực tế của bạn sau khi review. Không tự ghi có phần làm bằng tay nếu không có.
3. Nếu muốn hướng tới mức tối đa của Harness, dùng repository cá nhân và xác nhận CI đạt trên tab Actions. Hiện origin trỏ repository mẫu của thầy; chưa đổi remote hay push.
4. Sau thay đổi tài liệu/điểm, tạo lại ZIP. Tên ZIP hiện dùng MSSV 24127540; nếu đổi điểm cần tạo lại ZIP theo tổng mới.
5. Kiểm tra gate từ bản giải nén và đảm bảo hiểu code trước vấn đáp.

Điểm tối đa chưa được khẳng định: thiếu bằng chứng CI, chưa có xác nhận sinh viên hiểu và duyệt tài liệu; điểm cuối do giảng viên quyết định theo rubric chính thức.

## Chuẩn bị vấn đáp: giải thích code bằng lời của bạn

- export cho phép file test import hàm; items là mảng, options là object.
- items.length === 0 làm hàm trả 0 ngay, tránh tính shipping cho giỏ rỗng.
- for...of lấy lần lượt từng sản phẩm. Vòng đầu kiểm tra hợp lệ, vòng sau cộng tiền.
- Number.isInteger kiểm tra số nguyên; ! đảo true/false; || là hoặc. Số nguyên âm vẫn phải bị chặn bằng qty <= 0.
- throw new RangeError báo lỗi đầu vào; assert.throws nhận callback để gọi hàm và kiểm tra loại lỗi.
- subtotal += item.price * item.qty nghĩa là cộng thành tiền món đó vào tổng hiện tại.
- VAT tính trên subtotal; shipping đổi từ shipFee về 0 khi subtotal >= freeShipFrom. Dùng let vì shipping được gán lại.
- Math.round trả number; toFixed trả string nên không dùng làm kết quả trực tiếp.
- test(name, callback) giao hàm kiểm tra cho Node test runner; callback là hàm được truyền vào một hàm khác để được gọi khi cần.

Ví dụ cần tự tính được: 180000 × 2 + 45000 = 405000; VAT 32400; ship 30000; tổng 467400.

Tự luyện: vì sao qty = -2 là số nguyên nhưng vẫn bị từ chối? Vì sao subtotal 490000 vẫn có ship dù cộng VAT thành 529200? Vì sao phải dùng >= thay vì >? Vì sao giỏ có món giá 0 khác giỏ rỗng?

## Audit test/cart.test.js — 2026-10-11

Đã thêm đầy đủ header Test 1 đến Test 14 theo mẫu // Test 6: zero quantity. Mỗi test có chú thích tiếng Việt về đầu vào, phép tính hoặc lý do ném lỗi. Đã đối chiếu với README.md và src/cart.js; không phát hiện kết quả mong đợi sai trong phạm vi đặc tả.

| Test | Hành vi được kiểm tra | Kết quả mong đợi |
|---|---|---|
| 1 | Ví dụ trong đề: subtotal 405000, VAT 32400, ship 30000 | 467400 |
| 2 | Giỏ rỗng, dù options có VAT và ship | 0 |
| 3 | Subtotal đúng ngưỡng 500000 | 540000, không ship |
| 4 | Giá âm; số lượng hợp lệ | RangeError |
| 5 | Số lượng 1.5; giá hợp lệ | RangeError |
| 6 | Số lượng 0 | RangeError |
| 7 | Số lượng -1 | RangeError |
| 8 | Subtotal 490000, sau VAT 529200; ngưỡng so trước VAT | 559200, có ship |
| 9 | Subtotal 600000, vượt ngưỡng | 648000, không ship |
| 10 | Giỏ có một món giá 0; dưới ngưỡng | 30000 |
| 11 | Kiểu của giá trị trả về | typeof trả chuỗi 'number' |
| 12 | Tổng 109.08 làm tròn xuống | 109 |
| 13 | Tổng 115.5 làm tròn lên ở đúng nửa đồng | 116 |
| 14 | Tổng 202.808 làm tròn một lần ở cuối | 203 |

Kết quả xác minh: npm run check đạt, format 5 file đạt, 14 test/pass 14/fail 0; git diff --check đạt. So sánh trước/sau khi bỏ comment và whitespace xác nhận nội dung thực thi không đổi; không đổi tên test, input, assertion hoặc expected. Các test lỗi đầu vào chỉ làm sai một trường dữ liệu để tránh nhận RangeError vì nguyên nhân khác.

Giới hạn audit: test hiện tại bao phủ đặc tả đã nêu; không chứng minh đúng cho mọi dữ liệu JavaScript có thể có. Options thiếu/sai kiểu và giá không phải số chưa được bài quy định nên không tự bổ sung hành vi. Audit này không phải bằng chứng CI đã chạy trên GitHub.

## Cập nhật thông tin nộp bài — 2026-10-11

Sinh viên cung cấp MSSV 24127540 và họ tên Lê Tấn Thành. Đã điền vào báo cáo và tổng kết; URL GitHub vẫn trống. ZIP chuẩn bị nộp mang tên 24127540_95.zip theo điểm đề xuất hiện có. Việc cung cấp thông tin không được coi là xác nhận điểm 95 hoặc xác nhận sinh viên đã hiểu mọi dòng code.
