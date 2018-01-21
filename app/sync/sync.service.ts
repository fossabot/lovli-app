import {
	settingsService
} from "../services/settings.service";




const git = require('simple-git');
const gitP = require('simple-git/promise');
import {
	PullResult
} from 'simple-git/promise'

export const syncService = {
	status,
	commit,
	commitSync,
	pull,
	push,
	checkout,
	diffSummary,
	branchLocal,
	log,
	cherry,
	outgoing,
	incoming
};
async function status() {

	let statusSummary = null;
	try {
		statusSummary = await gitP(settingsService.get('drives.root')).status();
	} catch (e) {
		console.error(e);
	}

	return statusSummary;
}

function commitSync(msg: string) {
	git(settingsService.get('drives.root'))
		.add('./*')
		.commit(msg);
}


async function commit(msg: string) {
	const root = settingsService.get('drives.root');
	let res = null;
	try {
		res = await gitP(root).add('./*')
			.then(() => gitP(root).commit(msg));
	} catch (e) {
		console.error(e);
	}

	return res;
}

async function push(outHandler:any) {
	const root = settingsService.get('drives.root');
	const userBranch = settingsService.get('user').branch;

	let res = null;
	try {
		res = await gitP(root).outputHandler(outHandler).push('origin', userBranch);
	} catch (e) {
		console.error(e);
	}

	return res;
}


async function checkout(branch: string): Promise < any > {
	const root = settingsService.get('drives.root');

	let res = null;
	try {
		res = await gitP(root).checkout(branch);
	} catch (e) {
		console.error(e);
	}

	return res;
}
async function branchLocal(): Promise < any > {
	const root = settingsService.get('drives.root');

	let res = null;
	try {
		res = await gitP(root).branchLocal();
	} catch (e) {
		console.error(e);
	}

	return res;
}
async function pull(): Promise < PullResult > {
	const root = settingsService.get('drives.root');
	const userBranch = settingsService.get('user').branch;

	let pull = null;
	try {
		pull = await gitP(root).pull('origin', userBranch);
	} catch (e) {
		console.error(e);
	}

	return pull;
}

async function log() {
	const root = settingsService.get('drives.root');
	let log = null;
	try {
		log = await gitP(root).log();
	} catch (e) {
		console.error(e);
	}

	return log;
}


async function incoming() {
	const root = settingsService.get('drives.root');
	const userBranch = settingsService.get('user').branch;
	let statusSummary = null;
	try {
		statusSummary = await gitP(root)
			.fetch('origin', `${userBranch}`)
			.then(() =>
				gitP(root).log([`HEAD..origin/${userBranch}`]));
	} catch (e) {
		console.error(e);
	}

	return statusSummary;
}


async function outgoing() {
	const root = settingsService.get('drives.root');
	const userBranch = settingsService.get('user').branch;
	let statusSummary = null;
	try {
		statusSummary = await gitP(root)
			.fetch('origin', `${userBranch}`)
			.then(() =>
				gitP(root).log([`origin/${userBranch}..HEAD`]));
	} catch (e) {
		console.error(e);
	}

	return statusSummary;
}



async function cherry() {
	const root = settingsService.get('drives.root');
	const userBranch = settingsService.get('user').branch;
	let raw = null;
	try {
		raw = await gitP(root).raw(['cherry', '-v', `origin/${userBranch}`, 'HEAD']);
	} catch (e) {
		console.error(e);
	}
	const lines = raw.split('\n');
	const picks: any = [];
	if (lines.length > 1) {
		lines.splice(-1, 1);
		lines.forEach((line: string) => {
			const p = line.split(' ');
			picks.push({
				type: p[0],
				hash: p[1],
				message: line.substring((p[0].length + p[1].length + 2))
			});
		});
	}

	return picks;
}
async function diffSummary() {
	const root = settingsService.get('drives.root');
	const userBranch = settingsService.get('user').branch;
	let statusSummary = null;
	try {
		statusSummary = await gitP(root)
			.fetch('origin', `${userBranch}`)
			.then(() =>
				gitP(root).diffSummary([userBranch, `origin/${userBranch}`]));
	} catch (e) {
		console.error(e);
	}

	return statusSummary;
}
