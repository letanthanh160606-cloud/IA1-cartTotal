# AI usage log

## 2026-10-08 — Cấu hình rules file, format gate và CI
Tool: ChatGPT / Codex
Asked for: Viết đầy đủ rules file và cấu hình quality gate cùng CI cho IA#1.
Kept: Codex đã tạo CLAUDE.md, scripts/check-format.js, .github/workflows/ci.yml và thêm các lệnh format:check, check vào package.json; các file này đang có trong thư mục làm việc, sinh viên chưa xác nhận đã đọc và hiểu hết.
Changed: Codex xóa khoảng trắng cuối dòng và bổ sung xuống dòng cuối test/cart.test.js; không đổi nội dung assertion hoặc hành vi cartTotal.
Rejected: Chưa ghi nhận sinh viên từ chối đề xuất nào trong bước này.
By hand: Chưa ghi nhận phần cấu hình nào do sinh viên tự viết trong bước này.

Xác minh: Codex đã chạy trực tiếp script format trong môi trường JavaScript: đạt trên 5 file; đã kiểm tra script phát hiện tab, khoảng trắng cuối dòng và thiếu xuống dòng cuối file. npm run check và git diff chưa chạy được vì công cụ terminal lỗi khởi tạo. CI mới được cấu hình, chưa có bằng chứng chạy thành công trên GitHub.

Lịch sử trước bước này, theo thông tin sinh viên cung cấp: test RED ban đầu → implementation → test bổ sung → tìm hiểu harness. Không coi đây là quy trình harness → brief → implementation đã hoàn thành đúng thứ tự. Entry này chỉ ghi bước cấu hình hiện tại; lịch sử hỗ trợ AI trước đó cần bổ sung riêng theo thông tin thực tế.

## 2026-10-10 — Ghi bổ sung lịch sử hỗ trợ trước harness
Tool: ChatGPT, theo context sinh viên cung cấp
Asked for: Giải thích bài tập, test starter, callback, implementation và cách bổ sung test.
Kept: Theo sinh viên, đã dùng các giải thích và gợi ý implementation cartTotal, shipping, test bổ sung và kiểm tra số lượng nguyên dương; code hiện tại được kiểm tra có những phần này.
Changed: Theo sinh viên, đã gõ, đọc và thử code trong quá trình học; không có bằng chứng đủ chi tiết để gán từng thay đổi là thiết kế độc lập của sinh viên.
Rejected: Chưa có thông tin về đề xuất cụ thể nào đã bị sinh viên từ chối.
By hand: Theo sinh viên, đã tự thao tác clone, mở project, gõ/đọc code và chạy test; không coi việc gõ code AI gợi ý là tự thiết kế implementation.

Đây là ngày ghi bổ sung dựa trên context, không phải ngày thực hiện các bước ban đầu. Sinh viên thuật lại lần test RED với Error: not implemented và lần 5 test xanh; output gốc không có trong repository nên không ghi là Codex đã chứng kiến. Phiên trước Codex đọc được 6 test và kiểm tra trực tiếp hàm; chưa chạy được npm vì lỗi terminal. Thứ tự thực tế là RED → implementation → test bổ sung → học về harness.

## 2026-10-10 — Hoàn thiện project và tổng kết
Tool: ChatGPT / Codex
Asked for: Hoàn thiện toàn bộ project và tạo Markdown đối chiếu yêu cầu với kết quả; để trống MSSV, họ tên và URL GitHub.
Kept: Giữ logic cartTotal đang có, rules file, gate và CI. Codex tạo brief.md, scripts/package.ps1, SELF_ASSESSMENT_REPORT.md và PROJECT_SUMMARY.md; các file còn cần sinh viên đọc và xác nhận.
Changed: Codex thêm 8 test (số lượng âm, shipping trước VAT, trên ngưỡng, giá 0, kiểu number và ba trường hợp làm tròn); đổi chú thích starter cho đúng trạng thái. Bổ sung README với hướng dẫn, cập nhật CLAUDE.md và thêm submission/ vào .gitignore. Không thay đổi công thức hay validation trong cartTotal.
Rejected: Sinh viên yêu cầu để trống thông tin cá nhân và URL thay vì cung cấp chúng. Chưa ghi nhận sinh viên từ chối đề xuất code nào; không bịa thêm ví dụ rejected để đủ rubric.
By hand: Trong phiên này sinh viên giao nhiệm vụ và đặt câu hỏi về GitHub; chưa ghi nhận sinh viên tự viết phần code/test/tài liệu mới. Các thay đổi file do Codex thực hiện.

Xác minh thực tế: terminal đã hoạt động. npm run check trước bổ sung: 6 test đạt. Sau bổ sung: format đạt trên 5 file, tests 14/pass 14/fail 0. Đã kiểm tra formatIssues chấp nhận mẫu đúng và phát hiện tab, trailing whitespace, thiếu newline. git diff --check đạt; đọc diff file theo dõi và nội dung file mới. Môi trường Node v24.18.0, npm 11.16.0.

CI mới có cấu hình Node 22, chưa có lần chạy GitHub được xác minh; origin vẫn trỏ starter của thầy. Không tạo commit, đổi remote hoặc push trong phiên. Điểm đề xuất 95/100 là bản nháp theo bằng chứng, không phải điểm giảng viên xác nhận. Đóng gói lấy điểm từ báo cáo, dùng tên DRAFT khi chưa có MSSV. Không tuyên bố sinh viên đã hiểu hết hoặc đã review diff; sinh viên cần kiểm tra trước khi nộp.

Kiểm chứng đóng gói: scripts/package.ps1 đã tạo submission/IA1-cartTotal_DRAFT_95.zip gồm 13 file. Đã đọc danh sách entry, kiểm tra có CI và không có .git/.env/node_modules/submission. Giải nén sang thư mục tạm riêng và chạy npm run check: format 5 file đạt, 14 test đạt, 0 fail. Cập nhật log và tổng kết trong ZIP theo tài liệu hiện tại.

## 2026-10-11 — Thêm comment đầy đủ và audit test
Tool: ChatGPT / Codex
Asked for: Thêm comment cho toàn bộ cart.test.js theo mẫu Test 6: zero quantity và audit lại.
Kept: Giữ toàn bộ 14 test, tên test, input, assertion và expected; thêm header đánh số 1–14 và giải thích tiếng Việt về từng hành vi/phép tính.
Changed: Codex chuẩn hóa khoảng cách giữa test và xuống dòng LF, thay chú thích cũ bằng chú thích cụ thể hơn; ghi bảng audit trong PROJECT_SUMMARY.md và đồng bộ ZIP bản nháp với file hiện tại.
Rejected: Chưa có đề xuất code nào bị sinh viên từ chối trong bước này.
By hand: Sinh viên đã gửi output tự chạy npm run check, npm test (14 pass/0 fail) và ví dụ thủ công (467400, number) ở các tin nhắn trước, đồng thời cho biết đã đọc xong cart.js. Comment và tài liệu audit mới trong bước này do Codex viết; chưa có xác nhận sinh viên hiểu hết mọi test.

Audit: đối chiếu từng expected với README.md và công thức trong src/cart.js, không phát hiện lỗi trong phạm vi đặc tả. Đã so sánh nội dung thực thi trước/sau bỏ comment và whitespace, xác nhận không đổi. npm run check sau sửa đạt: format 5 file, tests 14/pass 14/fail 0. git diff --check đạt. Không thêm test hoặc sửa implementation trong bước này.

## 2026-10-11 — Điền thông tin sinh viên và chuẩn bị ZIP
Tool: ChatGPT / Codex
Asked for: Sinh viên cung cấp MSSV 24127540 và họ tên Lê Tấn Thành trong quá trình chuẩn bị nộp bài.
Kept: Giữ nguyên code, 14 test và điểm đề xuất 95; URL GitHub vẫn trống.
Changed: Codex điền thông tin vào SELF_ASSESSMENT_REPORT.md và PROJECT_SUMMARY.md; cập nhật trạng thái thông tin trong README.md và brief.md; đóng gói tên 24127540_95.zip theo tổng hiện có trong báo cáo.
Rejected: Không có đề xuất mới nào bị sinh viên từ chối trong bước này.
By hand: Sinh viên tự cung cấp MSSV và họ tên; cập nhật file và đóng gói do Codex thực hiện.

Điểm 95 chưa được sinh viên xác nhận trong tin nhắn cung cấp thông tin. Không tự ghi đã duyệt báo cáo, đã hiểu hết code hoặc đã nộp lên Classroom. CI trên GitHub chưa được xác minh.

## 2026-10-11 — Hoàn thiện bằng chứng CI và hồ sơ nộp bài
Tool: ChatGPT / Codex
Asked for: Điền toàn bộ phần còn thiếu sau khi sinh viên gửi ảnh chi tiết CI Success.
Kept: Giữ code cartTotal, 14 test và workflow đã chạy thành công; giữ lịch sử các entry trước đúng với trạng thái tại thời điểm đó.
Changed: Codex điền URL repository và run CI, cập nhật README.md, CLAUDE.md, brief.md, SELF_ASSESSMENT_REPORT.md và PROJECT_SUMMARY.md; lưu ảnh gốc vào evidence/ci-success.png; thêm ảnh vào danh sách đóng gói. Tự chấm đề xuất Harness từ 16 lên 20, tổng từ 95 lên 99; AI log vẫn 14/15 vì thiếu output RED gốc và ngày thực hiện chính xác. ZIP mới dùng tên 24127540_99.zip, tổng điểm khớp báo cáo.
Rejected: Chưa có đề xuất mới bị sinh viên từ chối. Codex giữ workflow v4 đã Success và ghi hướng nâng cấp trong tổng kết, không tạo thay đổi workflow chưa được xác minh gần thời điểm nộp.
By hand: Sinh viên đã tự đổi remote sang repository cá nhân, chạy git add/diff, tạo commit a5fe728 và push, mở GitHub Actions và gửi ảnh Success. Điều này có bằng chứng từ output sinh viên gửi, commit Git local và ảnh CI. Các cập nhật file tài liệu, lưu ảnh và đóng gói trong bước này do Codex làm.

Bằng chứng: repository https://github.com/letanthanh160606-cloud/IA1-cartTotal; run https://github.com/letanthanh160606-cloud/IA1-cartTotal/actions/runs/38140175587; full commit a5fe728b3dbcbe3c4270fe6ca46f20e14f067d65. Ảnh thể hiện event push, main, status Success và job check đạt. Web tool không mở được trang run nên không ghi là đã trực tiếp đọc log CI. Các nhận định về CI dựa trên ảnh sinh viên cung cấp; ảnh được lưu vào repository để đối chiếu offline.

Hai thông báo trong run không làm CI thất bại: warning runtime của Actions v4 và notice thay đổi ubuntu-latest. Đã xem action.yml chính thức của checkout/setup-node v5 để ghi hướng nâng cấp runtime, nhưng không đổi workflow trong phiên này. Chưa tự commit/push các cập nhật tài liệu và chưa nộp Classroom. Điểm 99 vẫn cần sinh viên xác nhận, không phải điểm đã được giảng viên chấm. Các entry cũ nói URL trống hoặc CI chưa được xác minh là lịch sử trước bước push, được giữ nguyên.

Xác minh cục bộ sau cập nhật: git diff xác nhận src/cart.js, test/cart.test.js, package.json, scripts/check-format.js và workflow không đổi so với commit a5fe728. npm run check đạt: format 5 file, tests 14/pass 14/fail 0. git diff --check đạt; kiểm tra báo cáo có 5 hàng rubric, tổng 99 và các link file bằng chứng tồn tại. Script đóng gói tạo ZIP từ danh sách 14 file gồm ảnh CI.

Kiểm chứng ZIP 24127540_99.zip: đủ 14 file có workflow và ảnh CI, không có nội dung bị loại trừ. Đã giải nén sang thư mục tạm riêng; thông tin cá nhân, tổng 99 và URL run đúng. npm run check từ bản giải nén đạt: format 5 file, 14 test đạt, 0 fail. Ghi kết quả xác minh vào log/tổng kết và đồng bộ hai file này vào ZIP.
