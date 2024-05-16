// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const cp = require('child_process');
const path = require('path');

/**
 * @type {string | undefined}
 */
let lastDir;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "open-in-gitup" is now active!');

	const execGitup = async function (view='') {
		let dir;
		if (vscode.window.activeTextEditor) {
			// Use the current file's directory, if possible.
			dir = path.dirname(vscode.window.activeTextEditor.document.uri.fsPath);
		} else if (vscode.workspace.workspaceFolders?.length === 1) {
			// Otherwise, use the workspace root, if there is only one.
			dir = vscode.workspace.workspaceFolders[0].uri.fsPath;
		} else if (lastDir) {
			// If there are multiple workspaces, use the last-used one.
			dir = lastDir
		} else {
			// Otherwise, let the user pick which workspace root to use.
			const pickedDir = await vscode.window.showWorkspaceFolderPick();
			if (!pickedDir) return;

			dir = pickedDir.uri.fsPath;
		}

		lastDir = dir;

		console.log(`Opening GitUp in ${dir}…`);
		const cmd = `cd ${dir} && gitup ${view}`;
		cp.exec(cmd, function (error) {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
		});
	};

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const open = vscode.commands.registerCommand('extension.openInGitUp', function () {
		execGitup();
	});

	const map = vscode.commands.registerCommand('extension.openInGitUpMap', function () {
		execGitup('map');
	});

	const commit = vscode.commands.registerCommand('extension.openInGitUpCommit', function () {
		execGitup('commit');
	});

	const view = vscode.commands.registerCommand('extension.openInGitUpStash', function () {
		execGitup('stash');
	});

	context.subscriptions.push(open, map, commit, view);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
