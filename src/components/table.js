function Table({ columns, data }) {
  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            {columns && columns.map(item => <th>{item.title}</th>)}
          </tr>
        </thead>
        <tbody>
            {data && data.length > 0 && data.map(item => (
                <tr>
                    {columns && columns.map(cl => <td className="py-4 px-6">{item[cl.key]}</td>)}
                </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
