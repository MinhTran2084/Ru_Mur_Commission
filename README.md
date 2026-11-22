Commission URL: https://minhtran2084.github.io/Ru_Mur_Commission/#/

**Cheat sheet**
| Muốn đổi | Sửa file này |
|---|---|
| Email, Instagram, Threads, link nút "Book now" | `src/content/site.json` (để giá trị là `""` thì icon sẽ biến mất) |
| Giá, sản phẩm hoặc nhóm trong bảng giá | `src/content/prices.csv` (mỗi dòng là một sản phẩm) |
| Điều khoản dịch vụ | `src/content/terms.vi.md` và `terms.en.md` |
| 7 bước quy trình | `workflow.vi.md` và `workflow.en.md` |
| Mẹo viết brief và mẫu brief | `brief.vi.md` và `brief.en.md` |
| Nội dung trang chủ và các tag | `home.vi.md` và `home.en.md` |
| Ghi chú dưới bảng giá | `price-notes.vi.md` và `price-notes.en.md` |

Các ký hiệu cần biết: `**chữ đậm**`, `[chữ của link](/tos/brief)`, `- ` ở đầu dòng để tạo gạch đầu dòng, và `## ` để tạo tiêu đề cho một nhóm. Nếu thiếu file tiếng Anh, trang sẽ hiện bản tiếng Việt thay vào.

## Cần biết

- **Bảng giá (CSV):** mở `prices.csv` bằng Excel hoặc Google Sheets. Mỗi dòng có tên tiếng Việt và tiếng Anh, ô tiếng Anh để trống nghĩa là "giống tiếng Việt". Muốn hiện "IB" ở bản tiếng Việt và "DM" ở bản tiếng Anh, điền `IB` vào cột `price` và `DM` vào cột `price_en`. Giá nào có chữ `COMING SOON` sẽ hiện là "Sắp ra mắt" hoặc "Coming soon" và tự xuống cuối bảng.
- **Chữ tiếng Việt trong Excel:** lưu file dạng **CSV UTF-8**, nếu không Excel sẽ làm hỏng dấu. Trong VS Code, bạn có thể lưu bằng "UTF-8 with BOM" (góc dưới bên phải, chọn "Save with Encoding") để Excel mở ra đúng chữ. Google Sheets thì không bị lỗi này. Dấu phẩy hay dấu chấm phẩy làm dấu phân cách đều được.
- **`site.json` cần cẩn thận.** Giữ nguyên các dấu ngoặc kép và dấu phẩy. Nếu thiếu một dấu phẩy, việc build sẽ lỗi. VS Code sẽ gạch chân đỏ chỗ sai.
- **Ẩn một project:** thêm `"hidden": true` vào `info.json` của project đó.
- **Không bị đổi:** thứ tự các thẻ trong gallery từ `order.txt` vẫn hoạt động như cũ. Plugin chỉ thêm các tên còn thiếu vào cuối danh sách, nên không bao giờ xáo trộn thứ tự bạn đã sắp.
