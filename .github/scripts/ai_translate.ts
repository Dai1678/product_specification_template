import "jsr:@std/dotenv/load";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: `${Deno.env.get("OPENAI_API_KEY")}` });
const gptModel = "gpt-4o";

const token = `${Deno.env.get("GITHUB_TOKEN")}`;

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

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    try {
        const owner = "Dai1678";
        const repo = "AndroidArchitectureTemplate";
        const pullNumber = 17;
        const files = await fetchPullRequestFiles(owner, repo, pullNumber);
        for (const file of files) {
            const content = await fetchFileContent(file.raw_url);
            console.log(`File: ${file.filename}`);
            console.log(`Original content: ${content}`);
            const translatedContent = await _translate(content);
            console.log(`Translated content: ${translatedContent}`);
        }
    } catch (error) {
        console.error(error);
    }
}
