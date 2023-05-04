/**
 * Copyright (c) 2013-2023 Christoph Schnackenberg <mail@xtoff.games>, MIT LICENSE
 *
 * Some parts are from:
 *   https://github.com/vitejs/vite/blob/main/packages/create-vite/src/index.ts
 *   Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors
 */
import prompts from 'prompts';
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

let displayName = "";
const defaultTargetDir = "myGame";
const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

const config = [
    {
        type: 'text',
        name: 'name',
        message: `What's the name of your game?`,
        initial: defaultTargetDir,
        format: value => {
            displayName = value || defaultTargetDir;
            return projectNameAsDirectory(displayName);
        },
        validate: value => {
            const pickedName = projectNameAsDirectory(value);
            const exists = fs.existsSync(pickedName);
            if (exists) {
                return `Sorry the folder '${pickedName}' already exists. Please pick another name (or hit Ctrl/CMD + C to exit)`
            }
            return true;
        },
    },
    {
        type: 'select',
        name: 'template',
        message: 'Select starter pack',
        choices: [
            {
                title: 'Starter',
                value: 'starter',
                description: `Only the folders and a minimal example.`,
            },
            {
                title: 'Starter (+config)',
                value: 'starter-config',
                description: `Like Starter but with typesprite.config.mjs.`,
            },
            // {
            //     title: 'Starter with screen flow',
            //     value: 'starter-screen-flow',
            //     description: `Basic screen flow: Developer Logo -> Title Screen -> Run Game`,
            // },
            // {
            //     title: '[Advanced] NPM Components export ',
            //     value: 'exporter',
            //     description: `Starter to export components on NPM as a package`,
            // },
            // {
            //     title: '[Experimental] Custom GameRunner',
            //     value: 'customMain',
            //     description: `Use a custom main.ts and do all component imports and world setup yourself`,
            // },
            {
                title: '[Experimental] Vanilla JS',
                value: 'esm-only',
                description: `No Typescript, no bundler, no dev server, no asset-tools, ...`,
            },
        ],
    }
];


(async () => {
    console.log(`⭐ TypeSpriteJS Game Engine - Starter ⭐ `);
    const response = await prompts(config);
    if (Object.keys(response).length === 0)
        return;

    try {
        const {folderName} = await deployStarter(response);
        console.log(
`💡 Learn more:     https://typespritejs.dev
❤️ Meet the peeps: https://discord.gg/UaTNf2wWns

✅ Ready to use:
  cd ${folderName}`)

        switch (pkgManager) {
            case 'yarn':
                console.log('  yarn')
                console.log('  yarn dev')
                break
            default:
                console.log(`  ${pkgManager} install`)
                console.log(`  ${pkgManager} run dev`)
                break
        }
    }
    catch(err) {
        console.error("❌ Sorry, failed. Reason:", err);
    }
})();

function projectNameAsDirectory(projectName) {
    const folderName = projectName.replace(/[\\\s#+/:\*\?"<>\|]/g, '-');
    return folderName;
}

async function deployStarter({name, template}) {
    const templateDir = path.resolve(
        fileURLToPath(import.meta.url),
        '..',
        `templates/${template}`,
    )
    const renameFiles = {"_gitignore": ".gitignore"}

    console.log({templateDir, displayName, name, template});
    const cwd = process.cwd()
    // const targetDir = name;
    const root = path.join(cwd, name)

    fs.mkdirSync(root, { recursive: true })

    const write = (file, content) => {
        const targetPath = path.join(root, renameFiles[file] ?? file)
        if (content) {
            fs.writeFileSync(targetPath, content)
        } else {
            copy(path.join(templateDir, file), targetPath)
        }
    }

    const files = fs.readdirSync(templateDir)
    for (const file of files.filter((f) => f !== 'package.json')) {
        write(file)
    }

    const pkg = JSON.parse(
        fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
    )

    pkg.name = toValidPackageName(name);
    pkg.displayName = displayName;

    write('package.json', JSON.stringify(pkg, null, 2) + '\n')

    return {
        folderName: name,
    }
}

function pkgFromUserAgent(userAgent) {
    if (!userAgent) return undefined
    const pkgSpec = userAgent.split(' ')[0]
    const pkgSpecArr = pkgSpec.split('/')
    return {
        name: pkgSpecArr[0],
        version: pkgSpecArr[1],
    }
}

function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true })
    for (const file of fs.readdirSync(srcDir)) {
        if (file.indexOf(".DS_Store") > -1)
            continue;

        const srcFile = path.resolve(srcDir, file)
        const destFile = path.resolve(destDir, file)
        copy(srcFile, destFile)
    }
}

function copy(src, dest) {
    if (src.indexOf(".DS_Store") > -1)
        return;

    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
        copyDir(src, dest)
    } else {
        fs.copyFileSync(src, dest)
    }
}

function toValidPackageName(projectName) {
    return projectName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^[._]/, '')
        .replace(/[^a-z\d\-~]+/g, '-')
}