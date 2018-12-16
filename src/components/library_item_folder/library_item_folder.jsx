import React from 'react';

export default function LibraryItemFolder(props) {
  const { handleChangeFolder, data } = props;
  console.log(data.type);
  return (
    <tr onClick={handleChangeFolder}>
      <td scope="row">
        {data.fileName}
      </td>
      <td />
      <td />
    </tr>
  );
}
