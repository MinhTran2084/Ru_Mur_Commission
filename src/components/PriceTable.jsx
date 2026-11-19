// Lets long names like "Keyring/Badge/Standee/Sticker..." wrap after each slash
const withBreaks = (text) =>
  text.split('/').flatMap((part, i, parts) =>
    i < parts.length - 1 ? [part + '/', <wbr key={i} />] : [part]
  )

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
              <th scope="row">{withBreaks(item)}</th>
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