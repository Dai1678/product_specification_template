# プロダクト機能仕様書 / Product Feature Specification

あなたのプロダクトの機能仕様書を管理・公開するためのリポジトリです。

This repository is for managing and publishing the feature specifications of your product.

---

## このリポジトリで管理するもの / Items Managed in This Repository
- [/product_specification](./product_specification): プロダクトの機能仕様書を管理するディレクトリ / Directory for managing product feature specifications

## セットアップ / Setup
### テンプレートリポジトリからリポジトリを作成 / Create a repository from the template repository
[テンプレートリポジトリ](https://github.com/Dai1678/product_specification_template)からリポジトリを作成してください。

Please create a repository from the [template repository](https://github.com/Dai1678/product_specification_template).

### 翻訳機能を使うためにOpenAIのAPIキーを取得 / Get an OpenAI API key to use the translation feature
翻訳機能を使うためには、OpenAIのAPIキーが必要です。  
[OpenAIのサイト](https://platform.openai.com/api-keys)からAPIキーを取得してください。

To use the translation feature, you need an OpenAI API key.  
Please obtain an API key from the [OpenAI website](https://platform.openai.com/api-keys).

## 機能仕様書の書き方 / How to Write a Feature Specification
### 機能ごとにディレクトリを作成する / Create a directory for each feature
シンプルな機能しかない画面では書くことがあまりないため、画面ごとに仕様書のファイルを作成するのではなく、  
機能ごとにディレクトリを作成してその中に仕様書のファイルを作成してください。

予めプロダクトの機能を確認して、どのようにディレクトリを分けるかを決めておくと良いでしょう。

For screens with only simple features, there may not be much to write.  
Therefore, instead of creating a specification file for each screen, create a directory for each feature and create the specification file within that directory.

It is recommended to review the product features in advance and decide how to divide the directories.

### 機能仕様書のテンプレートから作成する
原則、機能仕様書は[/product_specification/template/template.md](product_specification/template/template.md)をコピーして作成してください。  

In principle, create a feature specification by copying [/product_specification/template/template.md](product_specification/template/template.md).

### 翻訳が必要な場合 / If translation is required
翻訳が必要な場合は、翻訳元のファイルを `product_specification/ja/` に追加し、GitHub Actionsで自動翻訳のワークフロー (ai_translate.yml) を実行してください。

If translation is required, add the original file to `product_specification/en/` and run the automatic translation workflow with GitHub Actions (ai_translate.yml).
