Commission URL: https://minhtran2084.github.io/Ru_Mur_Commission/#/
Showcase URL: https://minhtran2084.github.io/Ru_Mur_Commission/#/showcase
Brand URL: https://minhtran2084.github.io/Ru_Mur_Commission/#/brand

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

## Cần biết

- **Bảng giá (CSV):** mở `prices.csv` và chỉnh sửa trong GitHub. Mỗi dòng có tên tiếng Việt và tiếng Anh, ô tiếng Anh để trống nghĩa là "giống tiếng Việt". Muốn hiện "IB" ở bản tiếng Việt và "DM" ở bản tiếng Anh, điền `IB` vào cột `price` và `DM` vào cột `price_en`. Giá nào có chữ `COMING SOON` sẽ hiện là "Sắp ra mắt" hoặc "Coming soon" và tự xuống cuối bảng.
- **Ẩn một project:** thêm `"hidden": true` vào `info.json` của project đó.
- **Thứ tự sắp xếp gallery:** Mỗi folder sample và personal project đều có file `order.txt`, chỉ cần đổi thứ tự trong đây thì bên web cũng sẽ tự đổi.
- **Không bị đổi:** thứ tự các thẻ trong gallery từ `order.txt` vẫn hoạt động như cũ. Plugin chỉ thêm các tên còn thiếu vào cuối danh sách, nên không bao giờ xáo trộn thứ tự bạn đã sắp.

## Thêm sample hoặc personal project mới

Mỗi sample hoặc project là **một thư mục** chứa ảnh (hoặc video) và một file `info.json`. Sample nằm trong `src/gallery/sample/`, personal project nằm trong `src/gallery/personal/`.

### Các bước làm trên GitHub

1. Vào repo, mở thư mục `src/gallery/sample/` (hoặc `src/gallery/personal/`).
2. Bấm **Add file → Create new file**. Ở ô tên file, gõ đường dẫn đầy đủ, ví dụ `src/gallery/sample/ten-sample/info.json`. Gõ dấu `/` là GitHub tự tạo thư mục.
3. Dán nội dung `info.json` (mẫu ở bên dưới), sửa lại chữ, rồi bấm **Commit changes**.
4. Mở thư mục vừa tạo, bấm **Add file → Upload files**, kéo ảnh hoặc video vào, rồi bấm **Commit changes**.
5. Chờ khoảng 1 phút, vào tab **Actions**: dấu tích xanh nghĩa là web đã cập nhật, rồi mở web để kiểm tra.

### Sample

Thư mục chỉ cần 1 ảnh (hoặc video) và `info.json`. Nếu thư mục có nhiều file, hãy đặt tên file muốn hiện ở gallery là `cover.jpg` (hoặc `cover.png`, `cover.mp4`).

```json
{
  "title": "Tên sample",
  "date": "2026-11-23",
  "for": "for@ten_khach",
  "tags": ["Printing", "Fan project"]
}
```

- `title`: tên hiện dưới ảnh.
- `date`: ngày làm, viết dạng `năm-tháng-ngày`. Năm (ví dụ 2026) được lấy từ đây.
- `for`: chữ hiện ở bên phải, gõ đúng như muốn hiện. Không cần thì bỏ nguyên dòng này.
- `tags`: các nhãn, thêm bao nhiêu cũng được.

### Personal project

Thư mục gồm `info.json`, ảnh cover, và mỗi bước (stage) một ảnh hoặc video.

```json
{
  "title": "Tên project",
  "date": "2026-11-23",
  "for": "for@xxx",
  "tags": ["Illustration", "3D"],
  "cover": "cover.jpg",
  "stages": [
    {
      "image": "01-moodboard.jpg",
      "title": "Moodboard & sketches",
      "notes": "Ghi chú ngắn dưới tiêu đề",
      "description": "Mô tả dài hơn, hiện ở bên phải."
    },
    {
      "image": "02-blockout.jpg",
      "title": "Block-out",
      "notes": "Ghi chú ngắn",
      "description": "Mô tả dài hơn."
    },
    {
      "image": "03-final.mp4",
      "title": "Final",
      "notes": "Ghi chú ngắn",
      "description": "Mô tả dài hơn.",
      "controls": true
    }
  ]
}
```

- `stages`: danh sách các bước, hiện đúng theo thứ tự viết. Mỗi bước có `image` là **tên file** nằm trong cùng thư mục (ảnh hoặc video đều được).
- `"controls": true`: chỉ dùng cho video dài, để hiện nút dừng và bật tiếng. Video ngắn thì bỏ dòng này, video sẽ tự chạy lặp lại như GIF.

### Chữ hai ngôn ngữ

Bất kỳ đoạn chữ nào cũng có thể viết riêng cho tiếng Việt và tiếng Anh:

```json
"title": { "vi": "Khăn cổ vũ", "en": "Towel slogan" }
```

Tên riêng hoặc handle không đổi giữa hai ngôn ngữ thì cứ viết chữ bình thường.

### Thứ tự hiển thị

Thư mục mới nếu chưa có tên trong `order.txt` vẫn hiện trên web nhưng nằm ở cuối. Muốn đặt ở vị trí khác, mở `order.txt` của mục đó (cùng thư mục với các project), bấm cây bút và thêm tên thư mục vào đúng vị trí muốn.
