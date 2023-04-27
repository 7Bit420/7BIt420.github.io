
function Modulus(iN: number, iMod: number): number {
	let iQ: number = (iN / iMod);
	return iN - (iQ * iMod);
}

function GetChar(iGenerator: number, cBase: number, iRange: number) {
	return String.fromCharCode(cBase + Modulus(iGenerator, iRange));
}

async function main(): Promise<number> {
	// Color code
	const  hConsole: NodeJS.WriteStream = process.stdout;
	console.log('\x1b[32m')

	var caRow: string[] = new Array().fill('');
	let j: number = 7;
	let k: number = 2;
	let l: number = 5;
	let m: number = 1;
	while (true) {
		let i: number = 0;
		// Output a random row of characters
		while (i < 80) {
			if (caRow[i] != ' ') {
				caRow[i] = GetChar(j + i * i, 33, 30);
				if (((i * i + k) % 71) == 0) {
					console.log('\x1b[32m')
				} else {
					console.log('\x1b[0m')
				}
			}
			hConsole.write(caRow[i]);
			++i;
			console.log('\x1b[0m');
		}
		j = (j + 31);
		k = (k + 17);
		l = (l + 47);
		m = (m + 67);
		caRow[Modulus(j, 80)] = '-';
		caRow[Modulus(k, 80)] = ' ';
		caRow[Modulus(l, 80)] = '-';
		caRow[Modulus(m, 80)] = ' ';
		// Delay
		await new Promise(t=>setTimeout(t,10))
	}
	return 0;
}

main()