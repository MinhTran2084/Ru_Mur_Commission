export default function PriceTable({ title, rows }) {
  return (
    <div className="price-card">
      <table>
        <thead>
          <tr>
            <th>{title}</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([item, price]) => (
            <tr key={item}>
              <th scope="row">{item}</th>
              <td>
                <span className={/^\d/.test(price) ? 'price' : 'price price-soft'}>
                  {price}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}