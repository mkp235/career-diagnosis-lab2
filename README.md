# 20代キャリア診断ラボ

第二新卒・20代向けの無料転職診断ツールサイトです。HTML / CSS / JavaScriptのみで動く静的サイトなので、Cloudflare Pagesにそのまま公開できます。

## フォルダ構成

```text
career-diagnosis-lab/
├─ index.html
├─ config.js
├─ privacy.html
├─ disclaimer.html
├─ README.md
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  └─ main.js
│  └─ img/
│     └─ ogp.svg
├─ tools/
│  ├─ salary.html
│  ├─ it-fit.html
│  ├─ reason.html
│  ├─ motivation.html
│  └─ interview.html
└─ articles/
   ├─ salary-up.html
   ├─ it-career.html
   └─ interview-questions.html
```

## ページ一覧

- トップページ: `index.html`
- 第二新卒 年収アップ可能性診断: `tools/salary.html`
- 未経験IT職種 適性診断: `tools/it-fit.html`
- 退職理由ポジティブ変換ツール: `tools/reason.html`
- 志望動機メーカー: `tools/motivation.html`
- 面接回答メーカー: `tools/interview.html`
- 記事: `articles/salary-up.html`
- 記事: `articles/it-career.html`
- 記事: `articles/interview-questions.html`
- プライバシーポリシー: `privacy.html`
- 免責事項: `disclaimer.html`

## ローカル確認

サーバーなしでも動作します。`index.html` をブラウザで開いて確認してください。

ローカルサーバーで確認する場合は、任意で次のように起動できます。

```bash
cd career-diagnosis-lab
python -m http.server 8787
```

## Cloudflare Pagesへの公開手順

1. この `career-diagnosis-lab` フォルダをGitHubリポジトリへ push します。
2. Cloudflare ダッシュボードで「Workers & Pages」を開きます。
3. 「Create application」から「Pages」を選び、GitHubリポジトリを接続します。
4. Build settings は以下にします。
   - Framework preset: `None`
   - Build command: 空欄
   - Build output directory: `/` またはリポジトリ直下に置く場合は空欄
5. このフォルダをリポジトリのサブディレクトリとして公開する場合は、PagesのRoot directoryに `career-diagnosis-lab` を指定します。
6. デプロイ後、発行されたURLを `config.js` の `siteUrl` と各HTMLの `og:url` / `og:image` に反映します。

## アフィリエイトリンクの差し替え方法

`config.js` の以下を変更します。

```js
window.SITE_CONFIG = {
  mainCareer: {
    name: "第二新卒エージェントneo",
    url: "ここにA8の広告リンク",
    buttonText: "第二新卒向けの無料相談を見てみる"
  },
  cta: {
    primaryText: "第二新卒向けの無料相談を見てみる",
    primaryUrl: "ここにA8の広告リンク",
    secondaryText: "未経験IT向けの選択肢を見てみる",
    secondaryUrl: "https://example.com/affiliate-it",
    note: "診断結果を整理する参考リンクです。必要な人だけ、内容や条件を確認してみてください。"
  }
};
```

- 全ツールの主要CTAは `mainCareer.buttonText` / `mainCareer.url` を優先して参照します。
- `mainCareer.url` にA8の広告リンクを入れると、主要CTAへ一括反映されます。
- `url` が `ここにA8の広告リンク` のままの場合、公開前の誤クリックを避けるため、画面上のリンク先は `#` になります。
- 互換用に `cta.primaryText` / `cta.primaryUrl` も残しています。
- IT適性診断のCTAは `secondaryText` / `secondaryUrl` を参照します。
- 注意書きは `note` で一括変更できます。

## Google Analytics / Search Console

各HTMLの `<head>` 内に以下のコメントを入れています。

```html
<!-- Google Analyticsタグは公開後にここへ追加 -->
<!-- Search Console確認タグは公開後にここへ追加 -->
```

公開後に、Google Analyticsの計測タグやSearch Consoleの確認用metaタグをこの位置へ貼り付けてください。

## 今後ツールを追加する方法

1. `tools/new-tool.html` を作成します。
2. 既存ツールページをコピーし、`title`、`description`、見出し、フォーム項目を変更します。
3. `assets/js/main.js` の `toolHandlers` に新しい診断ロジックを追加します。
4. フォームの `data-tool-form="newTool"` と、`toolHandlers.newTool` の名前を合わせます。
5. `index.html` のツールカードとヘッダーナビにリンクを追加します。

## Phase 1の方針

- サーバー、DB、AI APIは使っていません。
- 入力内容はブラウザ内で処理され、送信されません。
- スコアリングと文章生成は `assets/js/main.js` のテンプレートで行います。
- 収益化導線は `config.js` から一括管理できます。
