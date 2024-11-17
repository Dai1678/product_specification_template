## 優先度 / Priority

<!--
  この pull request をいつまでにマージしたいか選択してください。
  
  Indicate by when this PR should be merged.
-->

- [ ] 緊急 (すぐにマージしたい) / Emergency (Must be merged ASAP)
- [ ] 24時間以内 / Within 24 hours
- [ ] 2〜3日以内 (急ぎではない) / Within 2~3 days (not urgent)
- [ ] その他 (マージしたい期日を追記してください) / Others (indicate when this should be merged)

## 仕様書の追加・変更の背景 / Background of the specification addition or change

<!--
  この変更が必要な理由を書きます。プロジェクト要件書やアプリケーションソースコードの変更PRなど、背景になる情報のURLを書いてください。  

  Indicate the reason why this change is necessary. Please provide the URL of the background information, such as the project requirements document or the application source code change PR.
-->

- [Link]()

### 要件一覧 / List of requirements

<!--
  この変更によって追加、変更、スコープアウトされた機能要件をリストアップしてください。   
  また、その要件が新規か改修か、実装プラットフォームを記載してください。  
  通常、期間の長いプロジェクト開発の場合に記載します。
  例:  
    - ユーザーがログインできる  
      - 新規  
      - iOS, Android  

  List the added, changed, and scoped-out functional requirements due to this change.
-->

| 開発要件 / Dev Requirement | 新規 or 改修 / New or Edit | 実装プラットフォーム / Where | Anchor Link |
| --- | --- | --- | --- |
| **MUST** |  |  |  | 
|  |  |  | ⁠[Link]() | 
| **Nice to have** |  |  |  |
|  |  |  | [Link]() |

| 開発要件 / Dev Requirement | タイプ / Type(WANT, NOT SUPPORT) | スコープアウトされた理由 / Reason for scoping out | Anchor Link |
| --- | --- | --- | --- |
| **Scope Out** |  |  |  |
|  |  |  | [Link]() |

## ワイヤーフレーム / Wire Frame

<!--
  開発プロジェクトにおいて、この機能のワイヤーフレームがある場合は、そのリンクを貼ってください。

  If there is a wireframe for this feature in the development project, please provide the link.
-->

- [Link]()

## この PR で対応したこと / What was implemented in this PR

<!--
  この pull request で何を変更したのかを書きます。
  
  Indicate what kind of change is included in this PR
-->

## レビューポイント / Review points

<!--
  reviewer にここを見て欲しいというところがあれば追記してください。
  
  Indicate what you want the reviewers to particularly check, or what they should be aware of.
-->

- 特になし / None

## 調査資料 / Feasibility research

<!--
  参考にした調査資料があればリンクを貼ってください。

  If there are any reference materials, please provide the link.
-->

- [Link]()

## 翻訳 / Translation

翻訳が必要な場合は、翻訳元のファイルを `docs/ja/` に追加してください。  
GitHub Actionsで[ai_translate](https://github.com/moneyforward/ca_mobile_document/actions/workflows/ai_translate.yml)を実行すると翻訳されたファイルがコミットされます。  
実行する際は、ワークフローの実行ブランチをPRのブランチに変更してください。  
APIのコスト削減のため、翻訳対象のファイル数と翻訳実行回数はできるだけ最小限に抑えてください。

If translation is required, add the source file to `docs/ja/`.  
When you run [ai_translate](https://github.com/moneyforward/ca_mobile_document/actions/workflows/ai_translate.yml) with GitHub Actions, the translated file will be committed.  
When running the workflow, change the branch to the PR branch.  
To save on API costs, minimize the number of files and translation runs.
