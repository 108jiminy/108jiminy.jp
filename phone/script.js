// Jiminy Public PBXのテーブルを生成する関数
function populatePublicPBXTable(jsonUrl, tableId) {
    const tableBody = document.querySelector(`#${tableId} tbody`);

    if (!tableBody) {
        console.error(`テーブルID "${tableId}" が見つかりません。`);
        return;
    }

    // JSONデータを取得してテーブルに埋め込む
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('JSONの取得に失敗しました');
            }
            return response.json();
        })
        .then(data => {
            // JSONからextensionsを取得
            const extensions = data.extensions;

            // テーブル行をクリア
            tableBody.innerHTML = '';

            // テーブル行を作成して追加
            extensions.forEach(extension => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const extensionCell = document.createElement('td');

                nameCell.textContent = extension.name;
                extensionCell.textContent = extension.extension;

                row.appendChild(nameCell);
                row.appendChild(extensionCell);
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('エラー:', error);
        });
}

// ページ読み込み時にテーブルを生成
document.addEventListener('DOMContentLoaded', () => {
    populatePublicPBXTable('jiminypublicmantela.json', 'public-pbx-table');
    populatePublicPBXTable('jiminylocalmantela.json', 'local-pbx-table');
});
