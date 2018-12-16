import React from 'react';

export default function LibraryItemFolder(props) {
  const { handleChangeFolder, data } = props;
  return (
    <tr onClick={handleChangeFolder}>
      <td>
        {data.fileName}
      </td>
      <td />
      <td />
    </tr>
  );
}
