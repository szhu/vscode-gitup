// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const cp = require('child_process');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "open-in-gitup" is now active!');

	const execGitup = function (view='') {
		const fileDir = path.dirname(vscode.window.activeTextEditor.document.fileName);
		console.log(`Opening Gitup in ${fileDir}…`);

		const cmd = `cd ${fileDir} && gitup ${view}`;
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
	const open = vscode.commands.registerCommand('extension.openInGitup', function () {
		execGitup();
	});

	const map = vscode.commands.registerCommand('extension.openInGitupMap', function () {
		execGitup('map');
	});

	const commit = vscode.commands.registerCommand('extension.openInGitupCommit', function () {
		execGitup('commit');
	});

	const view = vscode.commands.registerCommand('extension.openInGitupStash', function () {
		execGitup('stash');
	});

	context.subscriptions.push(open, map, commit, view);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
