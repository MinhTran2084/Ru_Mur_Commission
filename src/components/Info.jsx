import { Link } from 'react-router-dom'

export function Terms() {
  return (
    <ul className="terms">
      <li>Bọn mình <strong>chỉ nhận khách có brief rõ ràng</strong> và sẽ từ chối nếu brief nằm ngoài khả năng. Tham khảo cách viết brief <Link to="/brief">ở đây.</Link></li>
      <li>Bọn mình không chịu trách nhiệm về vấn đề bản quyền, hình ảnh/element bạn cung cấp.</li>
      <li>Cọc ít nhất 70% tổng giá trị đơn hàng, thanh toán phần còn lại sau khi hoàn thành đơn, bạn sẽ nhận file sau khi thanh toán.</li>
      <li>Nếu hủy đơn sau khi nhận bản demo sẽ không hoàn trả cọc. Trong trường hợp bắt buộc phải hủy đơn, bọn mình sẽ thương lượng dựa trên tiến độ sản phẩm.</li>
      <li>Bạn sẽ nhận file PNG hoặc uneditable PDF cho in ấn, không share working file.</li>
      <li>Sửa đổi miễn phí tối đa 3 lần, từ lần thứ 4 trở đi +10%/lần sửa.</li>
      <li>Sửa đổi lớn (liên quan tới brief/concept) sẽ được tính thành đơn mới.</li>
      <li>1 đơn hàng sẽ được hoàn thành trong 2 tuần tính từ ngày nhận cọc (tùy vào sản phẩm bạn đặt).</li>
      <li>Đơn gấp: &lt;3 ngày +50% tổng giá trị đơn hàng; &lt;24h +100% tổng giá trị đơn hàng.</li>
      <li>Bọn mình giữ toàn bộ quyền sở hữu trí tuệ đối với sản phẩm. Vui lòng giữ nguyên credit (Ru&amp;Mur) và tag bọn mình khi đăng tải sản phẩm.</li>
      <li>Sản phẩm sẽ được dùng làm sample và đăng tải ở các nền tảng mạng xã hội của bọn mình, nếu có nhu cầu private +20%, thương mại x3 tổng giá trị đơn.</li>
      <li>Lưu ý đối với các đơn hàng phi thương mại (áp dụng cho fan project) chỉ được phát gift/give away hoặc gom in với số lượng 50 cái/set trở xuống cho mỗi một sản phẩm design, <strong>KHÔNG</strong> mua/bán lại hoặc nảy sinh lợi nhuận từ sản phẩm của bọn mình dưới bất kì hình thức nào.</li>
      <li>Không dùng sản phẩm để huấn luyện AI, NFTs hoặc blockchain,... trong bất kì trường hợp nào, nếu vi phạm bọn mình sẽ ngưng làm việc và không hoàn trả cọc.</li>
      <li><strong>Giảm giá 5% đơn tiếp theo cho các khách hàng quay lại!</strong></li>
    </ul>
  )
}

export function Workflow() {
  return (
    <ol className="steps">
      <li>Liên hệ đặt comm qua instagram hoặc threads.</li>
      <li>Chốt brief và báo giá + deadline từng giai đoạn.</li>
      <li><strong>Cọc 70% để bắt đầu đơn.</strong></li>
      <li>Nhận bản demo và tiến hành feedback.</li>
      <li>Chốt bản cuối cùng.</li>
      <li>Thanh toán phần còn lại.</li>
      <li>Bàn giao file.</li>
    </ol>
  )
}

const briefTemplate = `Sản phẩm:
Mục đích sử dụng (phi lợi nhuận/có lợi nhuận):
Kích thước + định dạng file (cho digital/in ấn):
Concept/Style (có thể gửi ảnh minh họa):
Ảnh hoặc elements cần dùng trong bản thiết kế (link drive):
Màu chủ đạo + màu phụ:
Text (chính & phụ):
Yêu cầu khác:
Deadline nhận demo đầu:
Deadline nhận bản final:`

export function Brief() {
  return (
    <div className="brief">
      <ul>
        <li>Brief sẽ bao gồm: phong cách (style), bảng màu (color palette), ảnh, chữ (text) và các element bạn muốn xuất hiện trong thiết kế.</li>
        <li>Bạn có thể tìm ảnh có phong cách bạn muốn làm qua pinterest hoặc bất cứ nền tảng mạng xã hội nào.</li>
        <li>Nếu có thể, hãy vẽ hoặc trình bày thật chi tiết brief của bạn, người que cũng được, chữ viết tay cũng được lun!</li>
      </ul>
      <p><strong>Mẫu brief cho bạn tham khảo:</strong></p>
      <pre className="brief-template">{briefTemplate}</pre>
      <p>Lưu ý: bọn mình không chịu trách nhiệm về vấn đề bản quyền, hình ảnh/element mà bạn cung cấp.</p>
    </div>
  )
}