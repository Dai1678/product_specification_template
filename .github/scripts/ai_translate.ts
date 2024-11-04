import "jsr:@std/dotenv/load";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: `${Deno.env.get("OPENAI_API_KEY")}` });
const gptModel = "gpt-4o";

const token = `${Deno.env.get("GITHUB_TOKEN")}`;
const owner = `${Deno.env.get("OWNER")}`;
const repo = `${Deno.env.get("REPO")}`;
const pullNumber = Number(Deno.env.get("PULL_NUMBER"));

async function fetchPullRequestFiles(
    owner: string,
    repo: string,
    pullNumber: number,
) {
    const url =
        `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`;
    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch PR files: ${response.statusText}`);
    }

    const files = await response.json();
    return files;
}

async function fetchFileContent(rawUrl: string) {
    const response = await fetch(rawUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch file content: ${response.statusText}`);
    }

    const content = await response.text();
    return content;
}

async function _translate(text: string): Promise<string> {
    const response = await client.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "次に与えられる文章が日本語なら英語に、英語なら日本語に翻訳してください。",
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

function _translateFilePath(filePath: string): string {
    const jaPattern = "/ja/";
    const enPattern = "/en/";

    if (filePath.includes(jaPattern)) {
        return filePath.replace(jaPattern, enPattern);
    } else if (filePath.includes(enPattern)) {
        return filePath.replace(enPattern, jaPattern);
    } else {
        throw new Error(
            `Invalid file path: must contain either ${jaPattern} or ${enPattern}`,
        );
    }
}

if (import.meta.main) {
    try {
        const files = await fetchPullRequestFiles(owner, repo, pullNumber);
        for (const file of files) {
            const content = await fetchFileContent(file.raw_url);
            console.log(`File: ${file.filename}`);
            console.log(`Original content: ${content}`);
            const translatedContent = await _translate(content);
            console.log(`Translated content: ${translatedContent}`);
            const translatedFilePath = _translateFilePath(file.filename);
            console.log(`Translated file path: ${translatedFilePath}`);
            await Deno.writeTextFile(translatedFilePath, translatedContent);
        }
    } catch (error) {
        console.error(error);
    }
}
