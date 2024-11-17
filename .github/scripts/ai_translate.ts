import "jsr:@std/dotenv/load";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: `${Deno.env.get("OPENAI_API_KEY")}` });
const gptModel = "gpt-4o";

const token = `${Deno.env.get("GITHUB_TOKEN")}`;
const repo = `${Deno.env.get("REPO")}`;
const pullNumber = Number(Deno.env.get("PULL_NUMBER"));
const translateLaunguage = `${Deno.env.get("TRANSLATE_LANGUAGE")}`;

/**
 * Fetches the list of files changed in a specific pull request.
 *
 * @param repo - The name of the repository.
 * @param pullNumber - The number of the pull request.
 * @returns A promise that resolves to an array of files changed in the pull request.
 * @throws Will throw an error if the request fails.
 */
async function fetchPullRequestFiles(
    repo: string,
    pullNumber: number,
) {
    const url =
        `https://api.github.com/repos/${repo}/pulls/${pullNumber}/files`;
    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch PR files: ${response.statusText}`);
    }

    const files = await response.json();
    return files;
}

/**
 * Fetches the content of a file from a given raw URL.
 *
 * @param contentsUrl - The path to the file to fetch.
 * @returns A promise that resolves to the content of the file as a string.
 * @throws Will throw an error if the fetch operation fails.
 */
async function fetchFileContent(contentsUrl: string) {
    const response = await fetch(contentsUrl, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github.v3.raw",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch file content: ${response.statusText}`);
    }

    const content = await response.text();
    return content;
}

/**
 * Translates the given text between Japanese and English.
 * If the input text is in Japanese, it will be translated to English.
 * If the input text is in English, it will be translated to Japanese.
 *
 * @param text - The text to be translated.
 * @returns A promise that resolves to the translated text.
 * @throws Will throw an error if the translation response content is null.
 */
async function _translateNewText(text: string): Promise<string> {
    const response = await client.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "Translate the following text from Japanese to English or from English to Japanese.",
            },
            {
                role: "user",
                content: text,
            },
        ],
        model: gptModel,
    });

    const content = response.choices[0].message.content;
    if (content === null) {
        throw new Error("Translation response content is null");
    }
    return content;
}

/**
 * Translates the given `translateTargetText` to match the style and language of the `existingTranslatedText`.
 *
 * @param translatedOriginalText - The original text that has already been translated.
 * @param newText - The new text that needs to be translated to match the original translated text.
 * @returns A promise that resolves to the translated text.
 * @throws Will throw an error if the translation response content is null.
 */
async function _translateExistingText(
    translatedOriginalText: string,
    newText: string,
): Promise<string> {
    const response = await client.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "Two sentences are given. The first is the translated original text, and the second is the new text. Translate the new text to match the translated original text.",
            },
            {
                role: "user",
                content:
                    `Translated original text:\n\`\`\`\n${translatedOriginalText}\n\`\`\`\n\nNew text:\n\`\`\`\n${newText}\n\`\`\``,
            },
        ],
        model: gptModel,
    });

    const content = response.choices[0].message.content;
    if (content === null) {
        throw new Error("Translation response content is null");
    }
    return content;
}

function _translateFilePath(filePath: string): string | null {
    const jaPattern = "/ja/";
    const enPattern = "/en/";

    if (filePath.includes(jaPattern) && translateLaunguage === "en") {
        return filePath.replace(jaPattern, enPattern);
    }
    if (filePath.includes(enPattern) && translateLaunguage === "ja") {
        return filePath.replace(enPattern, jaPattern);
    }
    return null;
}

/**
 * Checks if a file exists at the given file path.
 *
 * @param filePath - The path to the file to check.
 * @returns A promise that resolves to `true` if the file exists, or `false` if it does not.
 * @throws Will rethrow any errors other than `Deno.errors.NotFound`.
 */
async function fileExists(filePath: string): Promise<boolean> {
    try {
        await Deno.stat(filePath);
        return true;
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            return false;
        } else {
            throw error;
        }
    }
}

if (import.meta.main) {
    try {
        console.log(`Fetching files in PR #${pullNumber}...`);
        const files = await fetchPullRequestFiles(repo, pullNumber);

        for (const file of files) {
            const translateFilePath = _translateFilePath(file.filename);
            if (translateFilePath === null) {
                console.log(`Skipped translate: ${file.filename}`);
                continue;
            }
            console.log(`Translate file path: ${translateFilePath}`);

            console.log(`Fetching content from ${file.filename}...`);
            const originalText = await fetchFileContent(file.contents_url);

            const exists = await fileExists(translateFilePath);
            if (exists) {
                // If a translated file already exists, read the file and translate the new text
                const existingTranslatedText = await Deno.readTextFile(
                    translateFilePath,
                );
                console.log(
                    `Translate file already exists: ${translateFilePath}`,
                );

                console.log(`Updating translated content...`);
                const updatedTranslatedContent = await _translateExistingText(
                    existingTranslatedText,
                    originalText,
                );

                await Deno.writeTextFile(
                    translateFilePath,
                    updatedTranslatedContent,
                );
                console.log(
                    `Updated translated content for ${translateFilePath}`,
                );
            } else {
                // Create the directory of translatedFilePath if it does not exist
                const translatedDirPath = translateFilePath.split("/")
                    .slice(0, -1)
                    .join("/");
                await Deno.mkdir(translatedDirPath, { recursive: true });
                console.log(`Created directory: ${translatedDirPath}`);

                console.log(`Translating new content...`);
                const translatedContent = await _translateNewText(originalText);

                await Deno.writeTextFile(translateFilePath, translatedContent);
                console.log(`Created translated file: ${translateFilePath}`);
            }
        }
    } catch (error) {
        console.error(error);
    }
}