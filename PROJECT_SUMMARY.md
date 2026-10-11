# Tổng kết IA#1 — cartTotal với harness

Ngày hoàn thiện cục bộ: 2026-10-10.

MSSV: 24127540

Họ tên: Lê Tấn Thành

URL repository GitHub: [IA1-cartTotal](https://github.com/letanthanh160606-cloud/IA1-cartTotal)

Bằng chứng CI: [Quality checks #1 — Success](https://github.com/letanthanh160606-cloud/IA1-cartTotal/actions/runs/38140175587)

Commit code đã chạy CI: [a5fe728](https://github.com/letanthanh160606-cloud/IA1-cartTotal/commit/a5fe728b3dbcbe3c4270fe6ca46f20e14f067d65)

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
| CI chạy trên push | Đạt: Quality checks #1, push/main, commit a5fe728, Success theo ảnh sinh viên cung cấp | [CI run](https://github.com/letanthanh160606-cloud/IA1-cartTotal/actions/runs/38140175587); .github/workflows/ci.yml |
| Brief rõ phạm vi và đặc tả | Đã có, viết cho vòng hoàn thiện sau implementation | brief.md |
| AI log trung thực | Đã ghi các buổi Codex và phần lịch sử sinh viên cung cấp; không bịa phần tự làm hay từ chối | AI-LOG.md |
| Tự đánh giá đủ năm tiêu chí | Có; cập nhật điểm đề xuất 99/100 sau khi có bằng chứng CI | SELF_ASSESSMENT_REPORT.md |
| ZIP đúng nội dung | Đã tạo và giải nén kiểm chứng 24127540_99.zip: 14 file (có ảnh CI), format đạt, 14 test đạt; không chứa .git/.env/node_modules/ZIP cũ | scripts/package.ps1; submission/ |

## Kết quả kiểm tra thực tế

- Môi trường cục bộ: Node.js v24.18.0, npm 11.16.0. CI cấu hình Node.js 22; đã có workflow Success cho commit a5fe728 trên GitHub. Output cục bộ là bằng chứng riêng; không suy đoán chi tiết phiên bản Node/npm từ ảnh CI.
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
| evidence/ci-success.png | Ảnh CI Success do sinh viên cung cấp |

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

Script đọc total trong báo cáo nên tên ZIP tự khớp điểm. ZIP chỉ chứa danh sách file cần nộp, có .github và ảnh bằng chứng CI, không có .git, .env, node_modules hoặc ZIP cũ. Nếu ZIP cùng tên đã tồn tại, script từ chối ghi đè; chuyển bản cũ sang tên lưu trữ khác trước khi tạo lại.

## Những gì còn cần bạn xác nhận trước khi nộp

1. Kiểm tra MSSV 24127540, họ tên Lê Tấn Thành; đọc và xác nhận điểm tự chấm. Tổng hiện tại 99 là đề xuất: Behaviour 30, Tests 20, Harness 20, Brief 15, AI log 14.
2. Đọc AI log; sửa các mục Kept/Changed/Rejected/By hand theo công việc thực tế của bạn sau khi review. Không tự ghi có phần làm bằng tay nếu không có.
3. Repository cá nhân và CI đã có bằng chứng thành công. Commit/push phần cập nhật tài liệu hiện tại và kiểm tra lần CI mới; không gán kết quả của commit cũ cho commit mới.
4. Sau thay đổi tài liệu/điểm, tạo lại ZIP. Tên ZIP hiện dùng MSSV 24127540; nếu đổi điểm cần tạo lại ZIP theo tổng mới.
5. Kiểm tra gate từ bản giải nén và đảm bảo hiểu code trước vấn đáp.

Điểm tối đa chưa được khẳng định: hồ sơ lịch sử ban đầu còn giới hạn, sinh viên cần xác nhận hiểu và duyệt tài liệu; điểm cuối do giảng viên quyết định theo rubric chính thức.

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

Sinh viên cung cấp MSSV 24127540 và họ tên Lê Tấn Thành. Tại bước này đã điền vào báo cáo và tổng kết, URL GitHub còn trống. ZIP lúc đó mang tên 24127540_95.zip theo điểm đề xuất khi chưa có CI; bản cập nhật hiện tại dùng 99 điểm. Việc cung cấp thông tin không được coi là xác nhận điểm 95 hoặc xác nhận sinh viên đã hiểu mọi dòng code.

## Cập nhật bằng chứng GitHub và CI — 2026-10-11

- Repository: [IA1-cartTotal](https://github.com/letanthanh160606-cloud/IA1-cartTotal). origin hiện trỏ repository cá nhân này, không còn trỏ starter của thầy.
- Sinh viên đã tự commit/push: [a5fe728 — Complete IA1 cartTotal with tests and harness](https://github.com/letanthanh160606-cloud/IA1-cartTotal/commit/a5fe728b3dbcbe3c4270fe6ca46f20e14f067d65). Commit tồn tại trong Git local và ảnh CI.
- Ảnh sinh viên cung cấp xác nhận [Quality checks #1](https://github.com/letanthanh160606-cloud/IA1-cartTotal/actions/runs/38140175587) được kích hoạt bởi push trên main, status Success, job check đạt, tổng thời gian hiển thị 9 giây. Ảnh gốc được lưu trong [evidence/ci-success.png](evidence/ci-success.png) và đưa vào ZIP. URL của lần chạy được đọc trực tiếp từ thanh địa chỉ trong ảnh. Công cụ web không mở được trang run, nên không ghi là đã đọc log CI trực tiếp.
- Điểm đề xuất Harness tăng từ 16 lên 20 sau bằng chứng này, tổng từ 95 lên 99. AI log vẫn 14 vì lịch sử ban đầu chưa được lưu đầy đủ; không suy đoán điểm cuối của giảng viên.
- ZIP cần dùng cho tài liệu hiện tại: **24127540_99.zip**. Giữ các ZIP 95 điểm như bản cũ, không dùng để nộp tài liệu cập nhật.
- Các thay đổi lần này là tài liệu và đóng gói ảnh CI; code tính tiền, 14 test và workflow đã Success giữ nguyên. Chưa tạo commit/push cho phần cập nhật tài liệu; sinh viên thực hiện theo các lệnh bên dưới, rồi kiểm tra lần CI tương ứng.

### Hai thông báo trong lần CI thành công

1. Warning: actions/checkout@v4 và actions/setup-node@v4 nhắm runtime Node 20, đang bị GitHub chuyển sang Node 24. Đây là runtime của các action; node-version: '22' vẫn là Node dùng chạy project. Bản v5 của hai action dùng runtime Node 24 theo [checkout action.yml](https://raw.githubusercontent.com/actions/checkout/v5/action.yml) và [setup-node action.yml](https://raw.githubusercontent.com/actions/setup-node/v5/action.yml). Có thể nâng cấp khi bảo trì, nhưng phải kiểm tra lại CI; không tuyên bố đã nâng cấp trong lần này.
2. Notice: ubuntu-latest sẽ đổi ảnh hệ điều hành. Khi cần cố định môi trường, có thể dùng ubuntu-24.04 theo [runner image chính thức](https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2404-Readme.md). Đây là thông báo thay đổi môi trường tương lai, không phải test thất bại.

### Đồng bộ tài liệu trước khi nộp

~~~powershell
npm run check
git add README.md CLAUDE.md brief.md AI-LOG.md SELF_ASSESSMENT_REPORT.md PROJECT_SUMMARY.md scripts/package.ps1 evidence/ci-success.png
git --no-pager diff --cached
git commit -m "Update submission documents with CI evidence"
git push origin main
~~~

Sau push, vào Actions kiểm tra lần chạy của commit mới. Khi giữ tổng 99, nộp 24127540_99.zip trên Classroom bằng tài khoản sinh viên thầy yêu cầu. Chưa có bằng chứng xác nhận thầy chấp nhận email @clc.fitus.edu.vn; không tự ghi đã giải quyết việc tài khoản hoặc đã nộp bài.

Kiểm chứng bản đóng gói cập nhật: 24127540_99.zip có đủ 14 file, gồm workflow và ảnh CI; thông tin 24127540 — Lê Tấn Thành, tổng 99 và URL run khớp báo cáo. Gate từ bản giải nén đạt: format 5 file, tests 14/pass 14/fail 0.
