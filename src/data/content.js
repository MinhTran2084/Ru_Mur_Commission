const lorem =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea.'

export const home = {
  title: { vi: 'MEET THE DUO', en: 'MEET THE DUO' },
  text: { vi: lorem, en: lorem },
  tags: ['Design', 'Illustration', 'Customize for your idols'],
}

export const priceNotes = {
  intro: {
    vi: ['Mức giá dao động tùy vào độ chi tiết', 'Sản phẩm yêu cầu vẽ tay càng nhiều giá càng cao'],
    en: ['Prices vary with the level of detail', 'The more hand-drawn work a product needs, the higher the price'],
  },
  led: {
    vi: 'Lưu ý: Giá LED động có thể tăng tùy vào motion.',
    en: 'Note: animated LED prices may go up depending on the motion.',
  },
}

export const workflow = {
  vi: [
    'Liên hệ đặt comm qua instagram hoặc threads.',
    'Chốt brief và báo giá + deadline từng giai đoạn.',
    '**Cọc 70% để bắt đầu đơn.**',
    'Nhận bản demo và tiến hành feedback.',
    'Chốt bản cuối cùng.',
    'Thanh toán phần còn lại.',
    'Bàn giao file.',
  ],
  en: [
    'Contact us via Instagram or Threads to place a commission.',
    'Agree on the brief; we send the quote and deadlines for each stage.',
    '**Pay a 70% deposit to start the order.**',
    'Receive the demo and give feedback.',
    'Approve the final version.',
    'Pay the remaining balance.',
    'Receive the files.',
  ],
}

// **bold** and [text](/path) are supported.
// The English below is a draft translation: Ru should check it.
export const terms = {
  vi: {
    groups: [
      {
        title: 'Trước khi đặt',
        items: [
          'Bọn mình **chỉ nhận khách có brief rõ ràng** và sẽ từ chối nếu brief nằm ngoài khả năng. Tham khảo cách viết brief [ở đây.](/tos/brief)',
          'Bọn mình không chịu trách nhiệm về vấn đề bản quyền, hình ảnh/element bạn cung cấp.',
        ],
      },
      {
        title: 'Thanh toán',
        items: [
          'Cọc ít nhất **70%** tổng giá trị đơn hàng, thanh toán phần còn lại sau khi hoàn thành đơn, bạn sẽ nhận file sau khi thanh toán.',
          'Nếu hủy đơn sau khi nhận bản demo sẽ **không hoàn trả cọc**. Trong trường hợp bắt buộc phải hủy đơn, bọn mình sẽ thương lượng dựa trên tiến độ sản phẩm.',
        ],
      },
      {
        title: 'Bàn giao & chỉnh sửa',
        items: [
          'Bạn sẽ nhận file PNG hoặc uneditable PDF cho in ấn, không share working file.',
          'Sửa đổi miễn phí tối đa **3 lần**, từ lần thứ 4 trở đi **+10%/lần sửa**.',
          'Sửa đổi lớn (liên quan tới brief/concept) sẽ được tính thành đơn mới.',
          '1 đơn hàng sẽ được hoàn thành trong **2 tuần** tính từ ngày nhận cọc (tùy vào sản phẩm bạn đặt).',
          'Đơn gấp: <3 ngày **+50%** tổng giá trị đơn hàng; <24h **+100%** tổng giá trị đơn hàng.',
        ],
      },
      {
        title: 'Quyền sử dụng',
        items: [
          'Bọn mình giữ toàn bộ quyền sở hữu trí tuệ đối với sản phẩm. Vui lòng giữ nguyên credit (Ru&Mur) và tag bọn mình khi đăng tải sản phẩm.',
          'Sản phẩm sẽ được dùng làm sample và đăng tải ở các nền tảng mạng xã hội của bọn mình, nếu có nhu cầu private **+20%**, thương mại **x3** tổng giá trị đơn.',
          'Lưu ý đối với các đơn hàng phi thương mại (áp dụng cho fan project) chỉ được phát gift/give away hoặc gom in với số lượng **50 cái/set** trở xuống cho mỗi một sản phẩm design, **KHÔNG** mua/bán lại hoặc nảy sinh lợi nhuận từ sản phẩm của bọn mình dưới bất kì hình thức nào.',
          'Không dùng sản phẩm để huấn luyện AI, NFTs hoặc blockchain,... trong bất kì trường hợp nào, nếu vi phạm bọn mình sẽ ngưng làm việc và không hoàn trả cọc.',
        ],
      },
    ],
    bonus: '**Giảm giá 5% đơn tiếp theo cho các khách hàng quay lại!**',
  },
  en: {
    groups: [
      {
        title: 'Before you order',
        items: [
          'We **only accept clients with a clear brief** and will decline if the brief is beyond what we can do. See how to write a brief [here.](/tos/brief)',
          'We are not responsible for copyright issues with the images or elements you provide.',
        ],
      },
      {
        title: 'Payment',
        items: [
          'A deposit of at least **70%** of the total order value is required. The remaining balance is paid once the order is finished, and you receive the files after payment.',
          'If you cancel after receiving the demo, the deposit is **non-refundable**. If an order has to be cancelled, we will negotiate based on the progress of the work.',
        ],
      },
      {
        title: 'Delivery & revisions',
        items: [
          'You will receive a PNG file or an uneditable PDF for printing. Working files are not shared.',
          'Up to **3 free revisions**; from the 4th revision onwards, **+10% per revision**.',
          'Major changes (to the brief or concept) count as a new order.',
          'An order is completed within **2 weeks** from the day the deposit is received (depending on the product you order).',
          'Rush orders: <3 days **+50%** of the total order value; <24h **+100%** of the total order value.',
        ],
      },
      {
        title: 'Usage rights',
        items: [
          'We keep all intellectual property rights to the work. Please keep the credit (Ru&Mur) and tag us when you post it.',
          'The work may be used as a sample and posted on our social media. If you want it kept private, **+20%**; for commercial use, **x3** the order value.',
          'For non-commercial orders (fan projects): the products may only be given out as gifts/giveaways or group-printed in quantities of **50 pieces/set** or fewer per design, and you must **NOT** resell or make a profit from our work in any form.',
          'Do not use the work to train AI, or for NFTs or blockchain, under any circumstances. If this is violated, we will stop working with you and the deposit is not refunded.',
        ],
      },
    ],
    bonus: '**5% off your next order for returning customers!**',
  },
}

export const brief = {
  vi: {
    tips: [
      'Brief sẽ bao gồm: phong cách (style), bảng màu (color palette), ảnh, chữ (text) và các element bạn muốn xuất hiện trong thiết kế.',
      'Bạn có thể tìm ảnh có phong cách bạn muốn làm qua pinterest hoặc bất cứ nền tảng mạng xã hội nào.',
      'Nếu có thể, hãy vẽ hoặc trình bày thật chi tiết brief của bạn, người que cũng được, chữ viết tay cũng được lun!',
    ],
    templateTitle: 'Mẫu brief cho bạn tham khảo:',
    template: `Sản phẩm:
Mục đích sử dụng (phi lợi nhuận/có lợi nhuận):
Kích thước + định dạng file (cho digital/in ấn):
Concept/Style (có thể gửi ảnh minh họa):
Ảnh hoặc elements cần dùng trong bản thiết kế (link drive):
Màu chủ đạo + màu phụ:
Text (chính & phụ):
Yêu cầu khác:
Deadline nhận demo đầu:
Deadline nhận bản final:`,
    note: 'Lưu ý: bọn mình không chịu trách nhiệm về vấn đề bản quyền, hình ảnh/element mà bạn cung cấp.',
  },
  en: {
    tips: [
      'A brief should include: style, color palette, images, text, and the elements you want in the design.',
      'You can find images of the style you like on Pinterest or any social media platform.',
      'If you can, draw or lay out your brief in as much detail as possible. Stick figures and handwriting are totally fine!',
    ],
    templateTitle: 'Brief template for your reference:',
    template: `Product:
Purpose of use (non-profit/for-profit):
Size + file format (digital/print):
Concept/Style (feel free to send reference images):
Images or elements to use in the design (Drive link):
Main color + secondary color:
Text (main & secondary):
Other requests:
Deadline for the first demo:
Deadline for the final version:`,
    note: 'Note: we are not responsible for copyright issues with the images or elements you provide.',
  },
}