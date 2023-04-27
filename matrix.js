var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function Modulus(iN, iMod) {
    var iQ = (iN / iMod);
    return iN - (iQ * iMod);
}
function GetChar(iGenerator, cBase, iRange) {
    return String.fromCharCode(cBase + Modulus(iGenerator, iRange));
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var hConsole, caRow, j, k, l, m, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hConsole = process.stdout;
                    console.log('\x1b[32m');
                    caRow = new Array().fill('');
                    j = 7;
                    k = 2;
                    l = 5;
                    m = 1;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    i = 0;
                    // Output a random row of characters
                    while (i < 80) {
                        if (caRow[i] != ' ') {
                            caRow[i] = GetChar(j + i * i, 33, 30);
                            if (((i * i + k) % 71) == 0) {
                                console.log('\x1b[32m');
                            }
                            else {
                                console.log('\x1b[0m');
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
                    return [4 /*yield*/, new Promise(function (t) { return setTimeout(t, 10); })];
                case 2:
                    // Delay
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, 0];
            }
        });
    });
}
main();
