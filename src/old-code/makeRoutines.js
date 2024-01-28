let daysToLift = ["rest", "rest", "rest", "rest", "rest", "rest", "rest"];
let timeInputArr = [false, false, false, false, false, false, false];
let splitInputArr = [true, false, false, false];
let tempVar = 0;

function buttonClicked(id, index, arr){
  for (let i = 0; i < arr.length; i++){
    var button = document.getElementById(id+"-"+i);
    if (i !== index){
      button.style.backgroundColor = '#f0f0f0';
      arr[i] = false;
    } else {
      button.style.backgroundColor = '#ff5b4f';
      arr[i] = true;
    }
  }
}    

function daysButtonClicked(index){
  var button = document.getElementById("day-"+index);
  if (daysToLift[index] === "lift"){
    daysToLift[index] = "rest";
    button.style.backgroundColor = '#f0f0f0';
  } else {
    daysToLift[index] = "lift";
    button.style.backgroundColor = '#ff5b4f';
  }
}

let biasInputArr = [];
for (var i = 0; i < 10; i++) {
  biasInputArr[i] = [];

  for (var j = 0; j < 5; j++) {
    if (j !== 2){
      biasInputArr[i][j] = false;
    } else {
      biasInputArr[i][j] = true;
    }
  }
}

function biasButtonClicked(row, col){
  for (let i = 0; i < 5; i++){
    var button = document.getElementById("bias-"+row+"-"+i);
    if (i !== col){
      biasInputArr[row][i] = false;
      button.style.backgroundColor = '#f0f0f0';
    } else {
      biasInputArr[row][i] = true;
      button.style.backgroundColor = '#ff5b4f';
    }
  }
}

const WEEKDAYS = 7;
const N_MUSCLE_GROUPS = 10;
const muscleGroups = ["chest", "back", "legs", "fdelt", "bis", "tris", "sdelt", "rdelt", "traps", "calves"];
const weekdaysArray = ["Monday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let frequency = 0;
let experience = '';
let style = '';
let muscleBias = [];
let deadTime = 0;
let splitPreference = '';
let time = 0;
let subBias = [];
let baseSplits = [];
let liftTypeSequences = [];
let subMuscleSequences = [];
let liftDays = [];


const allMovements = [
  new Set(["barbell bench press", "dumbell bench press", "weighted dips", "smith machine bench press", "machine chest press", "standing cable fly", "seated pec-dec"]),
  new Set(["barbell row", "lat pull down", "tbar row", "dumbell row", "weighted pull-ups", "kneeling single arm row", "foot supported cable row", "chest supported machine row", "lat pull over"]),
  new Set(["barbell squat", "hack squat", "bulgarian split squat", "leg press", "smith machine squat", "leg extension", "smith machine reverse lunge", "barbell deadlift", "barbell romanian deadlift", "dumbell romanian deadlift", "smith machine bulgarian split squat", "seated leg curl", "lying leg curl"]),
  new Set(["standing mililtary press", "seated dumbell overhead press", "seated smith machine overhead press", "machine overhead press", "cable front raise", "dumbell front raise"]),
  new Set(["alternating dumbell curl", "incline dumbell curl", "preacher curl", "isometric dumbell preacher curl", "isometric concentration curl", "cable curl", "barbell curl"]),
  new Set(["skullcrusher", "tricep pushdown", "overhead cable tricep extension", "cross body tricep extension"]),
  new Set(["dumbell lateral raise", "egyptian lateral raise", "decline lateral raise", "machine lateral raise", "cable lateral raise", "egyptian cable lateral raise"]),
  new Set(["rope face pulls", "reverse pec dec", "dumbell rear delt fly", "cable rear delt fly"]),
  new Set(["barbell shrugs", "dumbell shrugs", "isometric cable shrugs", "smith machine shrugs"]),
  new Set(["smith machine calf raise", "machine calf raise, dumbell calf raise, barbell calf raise"])
];

const compoundMovements = [
  ["dumbell bench press", "barbell bench press", "smith machine bench press", "weighted dips", "machine chest press"],
  ["barbell row", "lat pull down", "kneeling single arm row", "tbar row", "chest supported machine row", "weighted pull-ups", "foot supported cable row", "dumbell row"],
  ["hack squat", "barbell squat", "leg press", "smith machine squat", "smith machine bulgarian split squat", "bulgarian split squat", "barbell deadlift", "barbell romanian deadlift", "dumbell romanian deadlift"],
  ["seated dumbell overhead press", "standing mililtary press", "seated smith machine overhead press", "machine overhead press"]
];

const isolationMovements = [
  ["standing cable fly", "seated pec-dec"],
  ["lat pull over"],
  ["leg extension", "seated leg curl", "lying leg curl"],
  ["cable front raise", "dumbell front raise"],
  ["alternating dumbell curl", "cable curl", "incline dumbell curl", "preacher curl", "barbell curl", "isometric dumbell preacher curl", "isometric concentration curl"],
  ["tricep pushdown", "skullcrusher", "cross body tricep extension", "overhead cable tricep extension"],
  ["cable lateral raise", "dumbell lateral raise", "machine lateral raise", "decline lateral raise", "egyptian lateral raise", "egyptian cable lateral raise"],
  ["cable rear delt fly", "reverse pec dec", "rope face pulls", "dumbell rear delt fly"],
  ["smith machine shrugs", "barbell shrugs", "dumbell shrugs", "isometric cable shrugs"],
  ["smith machine calf raise", "machine calf raise", "dumbell calf raise", "barbell calf raise"]
];

const movementsToLiftType = new Map([
  ["barbell bench press", 1], ["dumbell bench press", 2], ["weighted dips", 2],
  ["smith machine bench press", 3], ["machine chest press", 3], ["standing cable fly", 4], ["seated pec-dec", 4],
  ["barbell row", 1], ["weighted pull-ups", 2], ["lat pull down", 2], ["tbar row", 2],
  ["foot supported cable row", 3], ["chest supported machine row", 3], ["lat pull over", 4], ["kneeling single arm row", 3],
  ["dumbell row", 2], ["barbell squat", 1], ["hack squat", 1], ["bulgarian split squat", 2],
  ["leg press", 2], ["smith machine squat", 3], ["leg extension", 4], ["smith machine reverse lunge", 3],
  ["barbell deadlift", 1], ["barbell romanian deadlift", 2], ["dumbell romanian deadlift", 2],
  ["smith machine bulgarian split squat", 3], ["seated leg curl", 4], ["lying leg curl", 4],
  ["standing mililtary press", 1], ["seated dumbell overhead press", 2], ["seated smith machine overhead press", 3],
  ["machine overhead press", 3], ["cable front raise", 4], ["dumbell front raise", 4],
  ["alternating dumbell curl", 4], ["incline dumbell curl", 4], ["preacher curl", 4],
  ["isometric dumbell preacher curl", 4], ["isometric concentration curl", 4], ["cable curl", 4], ["barbell curl", 4],
  ["skullcrusher", 4], ["tricep pushdown", 4], ["overhead cable tricep extension", 4],
  ["cross body tricep extension", 4], ["dumbell lateral raise", 4], ["egyptian lateral raise", 5],
  ["decline lateral raise", 5], ["machine lateral raise", 5], ["cable lateral raise", 5],
  ["egyptian cable lateral raise", 5], ["rope face pulls", 4], ["reverse pec dec", 5],
  ["dumbell rear delt fly", 5], ["cable rear delt fly", 5], ["barbell shrugs", 5],
  ["dumbell shrugs", 5], ["isometric cable shrugs", 5], ["smith machine shrugs", 5],
  ["smith machine calf raise", 5], ["machine calf raise", 5], ["dumbell calf raise", 5], ["barbell calf raise", 5]
]);

const movementsToEquipment = new Map([
  ["barbell bench press", "bench barbell"], ["dumbell bench press", "bench dumbell"], ["weighted dips", ""],
  ["smith machine bench press", "bench smith"], ["machine chest press", "machine"], ["standing cable fly", "cable"],
  ["seated pec-dec", "machine"], ["barbell row", "barbell"], ["weighted pull-ups", ""], ["lat pull down", "machine"],
  ["tbar row", "barbell"], ["foot supported cable row", "machine"], ["chest supported machine row", "machine"],
  ["lat pull over", "cable"], ["kneeling single arm row", "cable"], ["dumbell row", "bench dumbell"],
  ["barbell squat", "barbell"], ["hack squat", "machine"], ["bulgarian split squat", "bench dumbell"],
  ["leg press", "machine"], ["smith machine squat", "smith"], ["leg extension", "machine"],
  ["smith machine reverse lunge", "smith"], ["barbell deadlift", "barbell"], ["barbell romanian deadlift", "barbell"],
  ["dumbell romanian deadlift", "dumbell"], ["smith machine bulgarian split squat", "smith"],
  ["seated leg curl", "machine"], ["lying leg curl", "machine"], ["standing mililtary press", "barbell"],
  ["seated dumbell overhead press", "bench dumbell"], ["seated smith machine overhead press", "bench smith"],
  ["machine overhead press", "machine"], ["cable front raise", "cable"], ["dumbell front raise", "dumbell"],
  ["alternating dumbell curl", "dumbell"], ["incline dumbell curl", "bench dumbell"], ["preacher curl", "machine"],
  ["isometric dumbell preacher curl", "machine dumbell"], ["isometric concentration curl", "bench dumbell"],
  ["cable curl", "cable"], ["barbell curl", "barbell"], ["skullcrusher", "bench dumbell"],
  ["tricep pushdown", "cable"], ["overhead cable tricep extension", "cable"], ["cross body tricep extension", "cable"],
  ["dumbell lateral raise", "dumbell"], ["egyptian lateral raise", "dumbell"], ["decline lateral raise", "bench dumbell"],
  ["machine lateral raise", "machine"], ["cable lateral raise", "cable"], ["egyptian cable lateral raise", "cable"],
  ["rope face pulls", "cable"], ["reverse pec dec", "machine"], ["dumbell rear delt fly", "dumbell"],
  ["cable rear delt fly", "cable"], ["barbell shrugs", "barbell"], ["dumbell shrugs", "dumbell"],
  ["isometric cable shrugs", "cable"], ["smith machine shrugs", "smith"], ["smith machine calf raise", "smith"],
  ["machine calf raise", "machine"], ["dumbell calf raise", "dumbell"], ["barbell calf raise", "barbell"]
]);

const movementsToMuscleGroup = new Map([
  ...["barbell bench press", "dumbell bench press", "weighted dips", "smith machine bench press", "machine chest press", "standing cable fly", "seated pec-dec"].map(w => [w, "chest"]),
  ...["barbell row", "weighted pull-ups", "lat pull down", "tbar row", "foot supported cable row", "chest supported machine row", "lat pull over", "kneeling single arm row", "dumbell row"].map(w => [w, "back"]),
  ...["barbell squat", "hack squat", "bulgarian split squat", "leg press", "smith machine squat", "leg extension", "smith machine reverse lunge", "barbell deadlift", "barbell romanian deadlift", "dumbell romanian deadlift", "smith machine bulgarian split squat", "seated leg curl", "lying leg curl"].map(w => [w, "legs"]),
  ...["standing mililtary press", "seated dumbell overhead press", "seated smith machine overhead press", "machine overhead press", "cable front raise", "dumbell front raise"].map(w => [w, "fdelt"]),
  ...["alternating dumbell curl", "incline dumbell curl", "preacher curl", "isometric dumbell preacher curl", "isometric concentration curl", "cable curl", "barbell curl"].map(w => [w, "bis"]),
  ...["skullcrusher", "tricep pushdown", "overhead cable tricep extension", "cross body tricep extension"].map(w => [w, "tris"]),
  ...["dumbell lateral raise", "egyptian lateral raise", "decline lateral raise", "machine lateral raise", "cable lateral raise", "egyptian cable lateral raise"].map(w => [w, "sdelt"]),
  ...["rope face pulls", "reverse pec dec", "dumbell rear delt fly", "cable rear delt fly"].map(w => [w, "rdelt"]),
  ...["barbell shrugs", "dumbell shrugs", "isometric cable shrugs", "smith machine shrugs"].map(w => [w, "traps"]),
  ...["smith machine calf raise", "machine calf raise", "dumbell calf raise", "barbell calf raise"].map(w => [w, "calves"])
]);

const movementsToBias = new Map([
  ["barbell bench pressn", ""],
  ["barbell bench pressu", "incline"],
  ["barbell bench pressl", "decline"],
  ["dumbell bench pressn", ""],
  ["dumbell bench pressu", "incline"],
  ["dumbell bench pressl", "decline"],
  ["smith machine bench pressn", ""],
  ["smith machine bench pressu", "incline"],
  ["smith machine bench pressl", "decline"],
  ["weighted dipsl", ""],
  ["machine chest pressn", ""],
  ["machine chest pressu", "incline"],
  ["machine chest pressl", "decline"],
  ["standing cable flyn", ""],
  ["standing cable flyu", "low to high"],
  ["standing cable flyl", "high to low"],
  ["seated pec-decn", ""],
  ["barbell rown", "neutral grip, elbows 45 degrees"],
  ["barbell rowu", "wide grip, elbows 75 degrees degrees"],
  ["barbell rowl", "underhand close grip, elbows 15 degrees"],
  ["lat pull downn", "neutral grip"],
  ["lat pull downu", "wide grip"],
  ["lat pull downl", "underhand close grip"],
  ["tbar rown", "neutral grip, elbows 45 degrees"],
  ["tbar rowu", "wide grip, elbows 75 degrees degrees"],
  ["tbar rowl", "underhand close grip, elbows 15 degrees"],
  ["foot supported cable rown", "neutral grip attachement"],
  ["foot supported cable rowu", "wide mag grip attachement"],
  ["foot supported cable rowl", "triangle grip attacement"],
  ["weighted pull-upsn", "neutral grip"],
  ["weighted pull-upsu", "wide grip"],
  ["chest supported machine rown", "neutral grip, elbows 45 degrees"],
  ["chest supported machine rowu", "wide grip, elbows 75 degrees degrees"],
  ["chest supported machine rowl", "underhand close grip, elbows 15 degrees"],
  ["lat pull overl", "rope attachement, elbows in"],
  ["kneeling single arm rowl", "keep arm at side and pull elbow to the hip"],
  ["dumbell rown", "elbows 45 degrees"],
  ["dumbell rowl", "elbows 15 degrees"],
  ["dumbell rowu", "elbows 75 degrees"],
  ["barbell squatq", "high bar"],
  ["barbell squatn", "neutral bar"],
  ["barbell squath", "low bar"],
  ["hack squatq", ""],
  ["bulgarian split squatq", "close stance"],
  ["bulgarian split squatn", "neutral stance"],
  ["bulgarian split squath", "far stance"],
  ["leg pressq", "feet low and close"],
  ["leg pressn", "feet neutral"],
  ["leg pressh", "feet high and wide"],
  ["smith machine squatq", "heel elevated"],
  ["smith machine squatn", "neutral"],
  ["smith machine squath", "no elevation"],
  ["leg extensionq", ""],
  ["smith machine reverse lungeq", "close stance"],
  ["smith machine reverse lungen", "neutral"],
  ["smith machine reverse lungeh", "far stance"],
  ["smith machine bulgarian split squatq", "close stance"],
  ["smith machine bulgarian split squatn", "neutral"],
  ["smith machine bulgarian split squath", "far stance"],
  ["barbell deadlifth", ""],
  ["barbell romanian deadlifth", ""],
  ["dumbell romanian deadlifth", ""],
  ["seated leg curlh", ""],
  ["lying leg curlh", ""],
  ["standing mililtary pressn", ""],
  ["seated dumbell overhead pressn", ""],
  ["seated smith machine overhead pressn", ""],
  ["machine overhead pressn", ""],
  ["cable front raisen", ""],
  ["dumbell front raisen", ""],
  ["alternating dumbell curln", "standard curl"],
  ["alternating dumbell curlb", "hammer curl, arm path cross body"],
  ["incline dumbell curll", "elbows perpendicular to ground"],
  ["preacher curls", ""],
  ["isometric dumbell preacher curls", ""],
  ["isometric concentration curls", "elbow pinned to inner thigh"],
  ["cable curln", "straight bar attachement, elbows at side"],
  ["cable curlb", "rope attachement"],
  ["cable curls", "straight bar attachement, elbows in front"],
  ["cable curll", "straight bar attachement, elbows behind"],
  ["barbell curln", "elbows at side"],
  ["barbell curls", "elbows in front"],
  ["barbell curll", "elbows behind"],
  ["skullcrushern", "elbows perpendicular, no incline"],
  ["skullcrusherla", "elbows slanted back, incline"],
  ["skullcrusherl", "elbows slanted back, no incline"],
  ["tricep pushdownn", "straight bar attachement"],
  ["tricep pushdownla", "straight bar attachement, elbows in"],
  ["tricep pushdownl", "straight bar attachement, elbows at side"],
  ["tricep pushdownm", "rope attachement, rotate wrists at bottom"],
  ["overhead cable tricep extensionl", ""],
  ["cross body tricep extensionm", "elbows flared"],
  ["cross body tricep extensionla", "elbows at side"],
  ["dumbell lateral raisen", ""],
  ["egyptian lateral raisen", ""],
  ["decline lateral raisen", ""],
  ["machine lateral raisen", ""],
  ["cable lateral raisen", ""],
  ["egyptian cable lateral raisen", ""],
  ["rope face pullsn", ""],
  ["reverse pec decn", ""],
  ["dumbell rear delt flyn", ""],
  ["cable rear delt flyn", ""],
  ["barbell shrugsn", "lean forward at bottom, stand upright at top"],
  ["barbell shrugsu", "stand upright"],
  ["barbell shrugsl", "lean forward"],
  ["dumbell shrugsn", "lean forward at bottom, stand upright at top"],
  ["dumbell shrugsu", "stand upright"],
  ["dumbell shrugsl", "lean forward"],
  ["isometric cable shrugsu", ""],
  ["smith machine shrugsn", "lean forward at bottom, stand upright at top"],
  ["smith machine shrugsu", "stand upright"],
  ["smith machine shrugsl", "lean forward"],
  ["smith machine calf raisen", "toes neutral"],
  ["smith machine calf raiseo", "toes inward"],
  ["smith machine calf raisei", "toes outward"],
  ["machine calf raisen", "toes neutral"],
  ["machine calf raiseo", "toes inward"],
  ["machine calf raisei", "toes outward"], 
  ["dumbell calf raisen", "toes neutral"], 
  ["barbell calf raisen", "toes neutral"]
]);

const restTimes = [
  [2.50, 3.00, 3.50, 4.00, 4.50],
  [2.25, 2.75, 3.25, 3.75, 4.25],
  [2.00, 2.50, 3.00, 3.50, 4.00],
  [1.50, 2.00, 2.50, 3.00, 3.50],
  [1.00, 1.50, 2.00, 2.50, 3.00]
];

const repRange = [
  [2, 6],
  [4, 8],
  [6, 10],
  [8, 12],
  [10, 14]
];

const subBiasIcons = [["n", "u", "l"], ["n", "u", "l"], ["n", "q", "h"], ["n"], ["n", "b", "l", "s"], ["n", "l", "m", "la"], ["n"], ["n"], ["n", "u", "l"], ["n", "o", "i"]];

function makeRoutine(){
// initialize needed variables
experience = getSliderMapping('experience-slider', ['b', 'i', 'a']);
style = getSliderMapping('style-slider', ['b+', 'b', '', 'p', 'p+']);

frequency = daysToLift.filter(function(value) {
  return value === "lift";
}).length;

const biasMappings = ["--", "-", "", "+", "++"];
for (let i = 0; i < biasInputArr.length; i++) {
  muscleBias[i] = getButtonMapping(biasInputArr[i], biasMappings);
} 
muscleBias.splice(3, 0, muscleBias.splice(5, 1)[0]);

splitPreference = getButtonMapping(splitInputArr, ["n", "p", "a", "b"]);

time = getButtonMapping(timeInputArr, [30, 45, 60, 75, 90, 105, 120]) - deadTime;

const chestSubBias = getSliderMapping('chest-slider', ['u+', 'u', 'n', 'l', 'l+']);
const backSubBias = getSliderMapping('back-slider', ['u+', 'u', 'n', 'l', 'l+']);
const legSubBias = getSliderMapping('legs-slider', ['q+', 'q', 'n', 'h', 'h+']);
subBias = [chestSubBias, backSubBias, legSubBias,'n','n','n','n','n','n','n',]; 

baseSplits = getBaseSplits();
liftTypeSequences = getLiftTypeSequences();
subMuscleSequences = getSubMuscleSequences();
liftDays = getLiftDays();

// generate splits  
let emptySplits = [];
let splitsToPresets = [];

generateSplits(emptySplits, daysToLift, splitsToPresets, "");

console.log(emptySplits);

// determine number of sets for each muscle group
let idealMuscleFreq = getIdealSetNums();

let setNums = [];
getSetNums(setNums, idealMuscleFreq, emptySplits);

let compoundNums = []; let isolationNums = [];
getCompoundsAndIsolations(setNums, compoundNums, isolationNums);

let compoundsSorted = sortCompounds(compoundMovements);
let isolationsSorted = sortIsolations(isolationMovements);

// set workouts 
let liftsToSets = [];
let splitsWithSets = setWorkouts(liftsToSets, compoundNums, isolationNums, compoundsSorted, isolationsSorted, emptySplits, setNums);

console.log(splitsWithSets);

// FIXME: fix function 
// let splitsWithSetsOrganized = organizeSets(splitsWithSets);

let ssMaps = []; ssIndexMaps = [];
addSupersets(splitsWithSets, liftsToSets, ssMaps, ssIndexMaps);

let allSets = getAllSets(splitsWithSets, liftsToSets);

let RPE = []; let rest = [];
fitTimeFrame(splitsWithSets, allSets, RPE, rest, ssMaps, subBias);

let trueMuscleFreq = getTrueMuscleFreq(allSets, RPE, ssMaps);

let splitScores = getFinalScores(splitsWithSets, liftsToSets, allSets, RPE, rest, idealMuscleFreq, trueMuscleFreq, ssMaps, emptySplits);

let indeciesSorted = finalSort(splitScores, splitsToPresets);

showResultText(splitsWithSets, liftsToSets, allSets, RPE, rest, ssMaps, indeciesSorted);

displayOutput(splitsWithSets, liftsToSets, allSets, RPE, rest, ssMaps, indeciesSorted, emptySplits, splitsToPresets);
}

function rotateArray(arr, positions) {
let n = arr.length;
positions = positions % n; 

return arr.slice(-positions).concat(arr.slice(0, n - positions));
}

function getSliderMapping(id, mappings){
const value = document.getElementById(id).value;
let result = mappings[0];
const stepSize = 100/mappings.length;
let threshold = 0;

for (let i = 1; i < mappings.length; i++){
  threshold = i * stepSize;
  if (value > threshold) {
    result = mappings[i];
  }
}

return result;
}

function getButtonMapping(buttonsArr, mappings){
let trueIndex = buttonsArr.indexOf(true);
result = mappings[trueIndex];

return result;
}

function getLiftTypeSequences(){
const sequences = [];
const seq1 = [];
const seq2 = [];
const seq3 = [];
const seq4 = [];

if (style.includes("b") && style.includes("+")) {
  seq1.push(2, 3, 3, 3);
  seq2.push(2, 2, 3, 3);
  seq3.push(2, 2, 2, 3);
  seq4.push(1, 2, 3, 3);
} else if (style.includes("b")) {
  seq1.push(2, 2, 3, 3);
  seq2.push(2, 2, 2, 3);
  seq3.push(1, 2, 2, 3);
  seq4.push(1, 2, 3, 3);
} else if (style.includes("p") && style.includes("+")) {
  seq1.push(1, 1, 2, 2);
  seq2.push(1, 1, 2, 3);
  seq3.push(1, 1, 3, 3);
  seq4.push(1, 2, 2, 2);
} else if (style.includes("p")) {
  seq1.push(1, 1, 2, 3);
  seq2.push(1, 2, 2, 3);
  seq3.push(1, 1, 2, 2);
  seq4.push(1, 2, 2, 2);
} else {
  seq1.push(1, 2, 3, 3);
  seq2.push(1, 2, 2, 3);
  seq3.push(2, 2, 2, 3);
  seq4.push(1, 2, 3, 3);
}

sequences.push(seq1, seq2, seq3, seq4);
return sequences;
}

function getSubMuscleSequences(){
sequences = [];

for (let i = 0; i < subBias.length; i++){
  currSequences = [];
  seq1 = [];
  seq2 = [];
  seq3 = [];

  icon = subBias[i].replace(/\+/g, '');
  weakIcon = 'n';
  iconsList = subBiasIcons[i];
  if (iconsList.length === 3){
    if (icon === 'n'){
      icon = iconsList[1];
      weakIcon = iconsList[2];
    } else if (iconsList[1] === icon){
      weakIcon = iconsList[2];
    } else if (iconsList[2] === icon){
      weakIcon = iconsList[1];
    }
  }

  if (i == 2) {
    seq1.push(icon, weakIcon, icon, weakIcon);
    seq2.push(icon, weakIcon, "n", "n");
    seq3.push(icon, icon, "n", weakIcon);
  } else if (subBias[i].includes("+")) {
    seq1.push(icon, icon, "n", "n");
    seq2.push(icon, icon, "n", weakIcon);
    seq3.push(icon, "n", icon, "n");
  } else if (!subBias[i].includes("n")) {
    seq1.push(icon, "n", icon, weakIcon);
    seq2.push(icon, "n", "n", "n");
    seq3.push(icon, "n", icon, "n");
  } else if (i == 0 || i == 1) {
    seq1.push("n", icon, weakIcon, "n");
    seq2.push("n", weakIcon, icon, "n");
    seq3.push("n", "n", icon, weakIcon);
  } else {
    seq1.push("n", "n", "n", "n");
    seq2.push("n", "n", "n", "n");
    seq3.push("n", "n", "n", "n");
  }
  currSequences.push(seq1, seq2, seq3);
  sequences.push(currSequences);
}

return sequences;
}

function getBaseSplits(){
let baseSplits = [];
let threeDay = []
let fourDay = [];

// three days bases 
let PPL = [["chest fdelt sdelt tris", "back bis rdelt traps", "legs calves"], "p"];
let PPL2 = [["chest tris", "back bis rdelt traps", "legs calves fdelt sdelt"], "p"];
let PPL3 = [["back bis rdelt traps", "chest fdelt sdelt tris", "legs calves"], "p"];
let PPL4 = [["back bis rdelt traps", "chest tris", "legs calves fdelt sdelt"], "p"]
let Arnold = [["chest back rdelt traps", "fdelt sdelt bis tris", "legs calves"], "a"];
let Arnold2 = [["fdelt sdelt bis tris", "chest back rdelt traps", "legs calves"], "a"];

// four day bases
let PPLS = [["chest tris", "back bis", "legs calves", "fdelt sdelt rdelt traps"], "p"];
let PPLS2 = [["back bis", "chest tris", "legs calves", "fdelt sdelt rdelt traps"], "p"];
let PPLS3 = [["back bis", "chest tris", "fdelt sdelt rdelt traps", "legs calves"], "p"];
let back4Day = [["chest tris", "back rdelt traps", "legs calves", "fdelt sdelt bis"], "b"];
let back4Day2 = [["legs calves", "back rdelt traps", "chest tris", "fdelt sdelt bis"], "b"];
let chest4Day = [["back rdelt traps bis", "chest", "legs calves", "fdelt sdelt tris"], "b"];
let chest4Day2 = [["legs calves", "chest", "back rdelt traps bis", "fdelt sdelt tris"], "b"];
let bro4Day = [["chest sdelt", "back rdelt traps", "fdelt sdelt bis tris", "legs calves"], "b"];
let bro4Day2 = [["chest sdelt", "back rdelt traps", "legs calves", "fdelt sdelt bis tris"], "b"];
let bro4Day3 = [["back rdelt traps", "chest sdelt", "legs calves", "fdelt sdelt bis tris"], "b"];
let aest4Day = [["chest sdelt", "back rdelt traps", "fdelt sdelt bis tris", "legs calves rdelt"], "a"];
let aest4Day2 = [["chest sdelt", "back rdelt traps", "legs calves rdelt", "fdelt sdelt bis tris"], "a"];
let aest4Day3 = [["back rdelt traps", "chest sdelt", "legs calves rdelt", "fdelt sdelt bis tris"], "a"];

if (splitPreference === "p"){
  threeDay.push(PPL, PPL3, PPL2, PPL4, Arnold, Arnold2);
  fourDay.push(PPLS, PPLS2, PPLS3, bro4Day, aest4Day, back4Day, chest4Day, bro4Day2, aest4Day2, back4Day2, chest4Day2, bro4Day3, aest4Day3);
} else if (splitPreference === "b"){
  threeDay.push(PPL, Arnold, PPL3, Arnold2, PPL2, PPL4);
  fourDay.push(bro4Day, bro4Day2, bro4Day3, PPLS, aest4Day, back4Day, chest4Day, PPLS2, aest4Day2, back4Day2, chest4Day2, PPLS3, aest4Day3);
} else if (splitPreference === "a"){
  threeDay.push(Arnold, Arnold2, PPL, PPL3, PPL2, PPL4);
  fourDay.push(aest4Day, aest4Day2, aest4Day3, bro4Day, bro4Day2, bro4Day3, chest4Day, back4Day, chest4Day2, back4Day2, PPLS, PPLS2, PPLS3);
} else {
  threeDay.push(PPL, Arnold, PPL3, Arnold2, PPL2, PPL4);
  fourDay.push(bro4Day, PPLS, aest4Day, back4Day, chest4Day, bro4Day2, PPLS2, aest4Day2, back4Day2, chest4Day2, bro4Day3, PPLS3, aest4Day3);
}

baseSplits.push(threeDay, fourDay);

return baseSplits;
}

function getLiftDays(){
const daysUnsorted = [
  "chest fdelt sdelt tris", "back bis rdelt traps", "legs calves", "legs calves fdelt sdelt", "chest back rdelt traps", "fdelt sdelt bis tris", "back rdelt traps fdelt sdelt", "back fdelt sdelt", "fdelt sdelt rdelt traps", "chest back fdelt bis tris", "chest fdelt sdelt", "back rdelt traps"
];

daysSorted = []; 
for (let i = 0; i < 3; i++){
  for (let j = 0; j < daysUnsorted.length; j++){
    hasPlusGroup = false;
    hasMinusGroup = false;
    day = daysUnsorted[j];

    for (let k = 0; k < 4; k++){
      if (muscleBias[k].includes('+') && day.includes(muscleGroups[k])){
        hasPlusGroup = true;
      }
      if (muscleBias[k].includes('-') && day.includes(muscleGroups[k])){
        hasMinusGroup = true;
      }
    }

    if (i == 0 && hasPlusGroup && !hasMinusGroup){
      daysSorted.push(day);
    } else if (i == 1 && hasPlusGroup &&  hasMinusGroup || i == 1 && !hasPlusGroup && !hasMinusGroup){
      daysSorted.push(day);
    } else if (i == 2 && !hasPlusGroup && hasMinusGroup) {
      daysSorted.push(day);
    }
  }
} 
return daysSorted;
}

function getMuscleFreq(schedule, muscleGroup){
let counter = 0;

for (let i = 0; i < WEEKDAYS; i++){
  if (schedule[i].includes(muscleGroup)){
    counter++;
  }
}

return counter;
}

function generateSplits(emptySplits, schedule, splitsToPresets, presetIcon){
// find the starting index of the most consecutive lifting days 
let valueHolder = getMaxConsecLiftDays(schedule);
let maxConsecDays = valueHolder[0];
let bestIndex = valueHolder[1];

// place all possible base splits 
for (let i = 0; i < baseSplits.length; i++){
  if (maxConsecDays === 3 && (i === 0) || maxConsecDays > 3){
    currBaseSplits = baseSplits[i];
    for (let j = 0; j < currBaseSplits.length; j++){
      let base = currBaseSplits[j][0];
      let presetIcon2 = presetIcon;
      presetIcon2 += currBaseSplits[j][1];
      for (let k = 0; k < base.length; k++){

// copy schedule frame 
        let scheduleCopy = schedule.slice(0, WEEKDAYS);

// place each day of the base 
        for (let l = 0; l < base.length; l++){
          if (scheduleCopy[(bestIndex + l) % 7] !== "rest"){
            scheduleCopy[(bestIndex + l) % 7] = base[l];
          }
        }

// if there is space for another base, recall method  
        if (getMaxConsecLiftDays(scheduleCopy)[0] > 2){
          generateSplits(emptySplits, scheduleCopy, splitsToPresets, presetIcon2);
        } else {
          const nextIndex = (bestIndex + base.length) % 7;
          backtrackPlacement(scheduleCopy, nextIndex, false);
          if (style.includes("b")){
            addAccesories(scheduleCopy);
          }
          if (isValidSchedule(scheduleCopy, emptySplits)){
            emptySplits.push(scheduleCopy);
            splitsToPresets.push(presetIcon2);
          }
        }
      }
    }
  }
}

// place individual days once recursion fails 
let firstLiftIndex = daysToLift.indexOf("lift");

for (let i = 0; i < liftDays.length; i++){
  scheduleCopy = [];
  for (let j = 0; j < WEEKDAYS; j++){
    scheduleCopy[j] = daysToLift[j];
  }

  scheduleCopy[firstLiftIndex] = liftDays[i];

  placeDaysRecursion(scheduleCopy, firstLiftIndex + 1, emptySplits, presetIcon, splitsToPresets);
}
}

function getMaxConsecLiftDays(schedule){
let bestIndex = 0;
let maxConsecDays = 0;
for (let i = 0; i < WEEKDAYS; i++){
  let counter = 0; 
  let consecDays = 0;
  while (counter < 7 && (schedule[(i + consecDays) % 7] === "lift" || schedule[(i + consecDays) % 7] === "rest")){
    if (schedule[(i + consecDays) % 7] === "lift"){
      consecDays++;
    }
    counter++; 
  }
  if (consecDays > maxConsecDays){
    bestIndex = i;
    maxConsecDays = consecDays;
  }
}

return [maxConsecDays, bestIndex];
}

function placeDaysRecursion(schedule, index, emptySplits, presetIcon, splitsToPresets){
while (index < 3 && schedule[index] === "rest"){
  index++;
}

// only perfroms recursion for the first three days  
if (index < 3){
  for (let i = 0; i < liftDays.length; i++){
    let scheduleCopy = schedule.slice(0, WEEKDAYS);

// place day if it fits criteria and call recursive method 
    if (checkDayPlacement(scheduleCopy, liftDays[i], index, 2)){
      scheduleCopy[index] = liftDays[j];
      placeDaysRecursion(scheduleCopy, index + 1, emptySplits, presetIcon, splitsToPresets);
    }
  }
} else {
// if 3 days have been placed with recursion, fill the rest of the schedule
  backtrackPlacement(scheduleCopy, index + 1, false);
  if (style.includes("b")){
    addAccesories(scheduleCopy);
  }
  if (isValidSchedule(scheduleCopy, emptySplits)){
    emptySplits.push(scheduleCopy);
    splitsToPresets.push(presetIcon);
  }
}
}

function checkDayPlacement(schedule, checkedDay, index, checkNumber){
let pass = true;
let restNeeded = [];

// set requirments for rest depending on the check number 
if (checkNumber === 1){
  restNeeded = [3, 2, 1];
} else if (checkNumber === 2){
  restNeeded = [2, 2, 1];
} else {
  restNeeded = [2, 1, 1];
}

if (!schedule[index] === "lift"){
  pass = false;
}

// check if each muscle group violates rest requirments 
let decreasedBigRest = false;
for (let i = 0; pass && i < N_MUSCLE_GROUPS; i++){
  const muscleGroup = muscleGroups[i];

// big muscle groups 
  if (i < 4){
    let underbias = false;
    if (muscleBias[i] === "--"){
      for (let j = 0; j < WEEKDAYS; j++){
        if (schedule[j].includes(muscleGroups[i])){
          underbias = true;

          if (!decreasedBigRest){
            restNeeded[0]--;
            decreasedBigRest = true;
          }
        }
      }
    }

// change rest requirment depending on if the muscle group is underbiased 
    if (checkedDay.includes(muscleGroup)){
      if (underbias){
        restNeeded[0]++;
        pass = daySpacingCheck(schedule, restNeeded[0], index, muscleGroup);
        restNeeded--;
      } else {
        pass = daySpacingCheck(schedule, restNeeded[0], index, muscleGroup);           
      }
    }

// medium and small muscle groups 
  } else if (i < 7 && (checkedDay.includes(muscleGroup))){
    pass = daySpacingCheck(schedule, restNeeded[1], index, muscleGroup);
  } else if (checkedDay.includes(muscleGroup)){
    pass = daySpacingCheck(schedule, restNeeded[2], index, muscleGroup);
  }
}

return pass;
}

function daySpacingCheck(schedule, restNeeded, index, muscleGroup){
let pass = true;
for (let i = 1; i < WEEKDAYS; i++){
  let checkIndex = (index + i) % 7;
  if (((i <= restNeeded) || (7 - i) <= restNeeded) && schedule[checkIndex].includes(muscleGroup)) {
    pass = false;
  }
}

return pass;
}

function backtrackPlacement(schedule, index, solutionFound){

if (index >= 7){
  solutionFound = true;
} else {
// iterate three times to try each check number 
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < liftDays.length; j++){

// skip rest days and update the index 
      while (!solutionFound && schedule[index] === "rest"){
        index++;
        if (index === 7){
          solutionFound = true;
        }
      } 

// recursive call
      if (index < 7 && !solutionFound && checkDayPlacement(schedule, liftDays[j], index, i + 1)){
        schedule[index] = liftDays[j];
        solutionFound = backtrackPlacement(schedule, index + 1, solutionFound);
        if (!solutionFound && index < 7){
          schedule[index] = "lift";
        }
      }
    }
  }
}

return solutionFound;
}
// FIXME: try to remove method and check runtime or make more specific 
function isValidSchedule(schedule, emptySplits){
let isValid = true;

// check to make sure the schedule is full with no duplicates 
let isFull = !schedule.some(entry => entry.includes("lift"));

isDuplicate = emptySplits.some(existingArray =>
  existingArray.every((value, index) => value === schedule[index])
);

if (isDuplicate || !isFull){
  isValid = false;
}

if (isValid){
// count the number of times each muscle group is hit per week
  let muscleFreq = [];
  for (let i = 0; i < N_MUSCLE_GROUPS; i++){
    let muscleGroup = muscleGroups[i];
    muscleFreq[i] = getMuscleFreq(schedule, muscleGroup);
  }

// choose the required frequency depending on the number of lifts per week 
  let minFreq = 0;
  if (frequency > 5){
    minFreq = 2;
  } else {
    minFreq = 1;
  }

// check if each muscle group hits frequency requirments 
  const minFreqHolder = minFreq;
  for (let i = 0; i < N_MUSCLE_GROUPS && isValid; i++){ 
    let minFreqDecreased = false;

    if (muscleBias[i].includes("-")){
      minFreq = 1;
      minFreqDecreased = true;
    }

    if (muscleFreq[i] < minFreq){
      isValid = false;
    }

    if (minFreqDecreased){
      minFreq++;
    }
  }
}

return isValid;
}

function addAccesories(schedule){
for (let i = 0; i < WEEKDAYS; i++){
  const currDay = schedule[i];
  for (let j = 4; j < N_MUSCLE_GROUPS; j++){
    const muscleGroup = muscleGroups[j];

// check if the day has complimenting muscles 
    let complimentsDay = false;
    if (j === 3 && (currDay.includes("chest") || currDay.includes("bis") || currDay.includes("tris"))){
      complimentsDay = true;
    }
    if (j === 4 && (currDay.includes("back") || currDay.includes("tris") || currDay.includes("fdelt"))){
      complimentsDay = true;
    }
    if (j === 5 && (currDay.includes("chest") || currDay.includes("bis") || currDay.includes("fdelt"))){
      complimentsDay = true;
    }

// check if there is enough space to be placed 
    let enoughSpace = false;
    if (muscleBias[j].includes("+") && currDay !== "rest" && !currDay.includes(muscleGroup) && !schedule[(i + 1) % 7].includes(muscleGroup) && !schedule[(i + 6) % 7].includes(muscleGroup) && getMuscleFreq(schedule, muscleGroup) < 3){
      enoughSpace = true;
    }

// only check if the group compliments the day for medium groups
    if (enoughSpace && muscleBias[j].includes("+") && (j < 6 && complimentsDay || j >= 6)){
      schedule[i] = currDay + " " + muscleGroup;
    }
  }
}
}

function getIdealSetNums(){
let idealSets = [];

// determine ideal sets per muscle group
if (experience === "b"){
  idealSets = [12, 12, 18, 3, 6, 6, 3, 3, 3, 6];
} else if (experience === "i"){
  idealSets = [15, 15, 21, 6, 9, 9, 6, 6, 6, 9];
} else {
  idealSets = [18, 18, 24, 9, 12, 12, 9, 9, 9, 12];
}

// adjust ideal sets depending on the muscle bias 
for (let i = 0; i < muscleBias.length; i++){
  let factor = 2;
  if (i < 3){
    factor = 3;
  }

  let biasIcon = muscleBias[i];
  if (biasIcon === "++"){
    idealSets[i] = idealSets[i] + 2 * factor;
  } else if (biasIcon === "+"){
    idealSets[i] = idealSets[i] + factor;
  } else if (biasIcon === "-" && (i < 6 || i === 9)){
    idealSets[i] = idealSets[i] - factor;
  } else if (biasIcon === "++" && (i < 6 || i === 9)){
    idealSets[i] = idealSets[i] - 2 * factor;
  }
}

return idealSets;
}

function getSetNums(setNums, idealSets, emptySplits){
let schedule = [];
let daysToRest = [];
let workingDaysIndex = [];

for (let i = 0; i < emptySplits.length; i++){  
// initilize a day x muscle array to represent number of sets
  console.log(i);
  console.log(emptySplits[i]);
  let setsArray = [];
  for (let j = 0; j < 7; j++) {
    let row = [];
    for (let k = 0; k < 10; k++) {
      row.push(0);
    }
    setsArray.push(row);
  }

  for (let j = 0; j < N_MUSCLE_GROUPS; j++){
    let muscleGroup = muscleGroups[j];
    let setsPerWorkingDay = [];
    let weeklySets = idealSets[j];
    daysToRest = [];
    workingDaysIndex = [];

    findWorkingDays(emptySplits[i], 0, muscleGroup);

// change weekly sets if the muscle group is only hit once
    let weeklyFreq = workingDaysIndex.length;
    if (weeklyFreq === 1){
      if (j < 6) {
        weeklySets = weeklySets * 2 / 3;
      } else {
        weeklySets = weeklySets / 2;
      }
    }

// add number of sets proportional to the following rest days
    for (let k = 0; k < workingDaysIndex.length; k++){
      setsPerWorkingDay.push(weeklySets * daysToRest[k] / 7.0);

      if (setsPerWorkingDay[k] < 3.0){
        setsPerWorkingDay[k] = 3.0;
      }

      setsArray[workingDaysIndex[k]][j] = Math.round(setsPerWorkingDay[k]);
    }
  }
  setNums.push(setsArray);
}


function findWorkingDays(schedule, startingIndex, muscleGroup){
  let nextDayFound = false;
  let counter = 1;
  
  while (!nextDayFound){
    let currDayIndex = (startingIndex + counter) % 7;
    if (schedule[currDayIndex].includes(muscleGroup)){
        nextDayFound = true;

// find next working day if the index hasn't been found already
        if (!workingDaysIndex.some(entry => entry === currDayIndex)){
          workingDaysIndex.push(currDayIndex);
          daysToRest.push(counter);
          findWorkingDays(schedule, currDayIndex, muscleGroup);
        } else {
          workingDaysIndex = rotateArray(workingDaysIndex, 1);
        }
      }
    counter++;
  }
} 
}

function getCompoundsAndIsolations(setNums, compounds, isolations){

// FIXME: make proportional to the slider
// determine the percentage of sets that will be compounds
let compoundMults = [];
if (style === "b+"){
  compoundMults = [.33, .66, .5, .5];
} else if (style === "b"){
  compoundMults = [.5, .75, .5, .5];
} else if (style === "p"){
  compoundMults = [.75, 1.0, .66, 1.0];
} else if (style === "p+"){
  compoundMults = [.75, 1.0, .75, 1.0];
} else {
  compoundMults = [.66, 1.0, .75, .5];
}

for (let i = 0; i < setNums.length; i++){
  let splitSets = setNums[i];
  let splitCompounds = [[], [], [], [], [], [], []];
  let splitIsolations = [[], [], [], [], [], [], []];

  for (let j = 0; j < WEEKDAYS; j++){
    for (let k = 0; k < splitSets[j].length; k++){
      let entry = splitSets[j][k];
      let entryCompounds = 0.0;
      splitCompounds[j][k] = 0;

// set compound numbers 
      if (entry > 4){
        if (k < 4){
          entryCompounds = compoundMults[k] * entry;
        } else {
          entryCompounds = 0.0;
        }
      }
// adjust for a low amount of sets 
      else if (style.includes("b") || k > 3){
        entryCompounds = 0.0;
      } else {
        entryCompounds = entry;
      }

// remaining sets are isolations
      let entryCompoundsRound = Math.round(entryCompounds / 3) * 3;
      splitCompounds[j][k] = entryCompoundsRound;
      splitIsolations[j][k] = Math.round((entry - entryCompoundsRound) / 3) * 3;

    }
  }
  compounds.push(splitCompounds);
  isolations.push(splitIsolations);
}
}

function sortCompounds(compounds){
let compoundsSorted = [];
let addedWorkouts = new Set();

// iterate through each compound muscle group  
for (let i = 0; i < 4; i++) {
  let muscleCompoundsSorted = [];
  let muscleCompounds = compounds[i];
  let muscleBiasSequence = subMuscleSequences[i];
  let sequenceFound  = false;

// loops makes progressivly easier checks while a sequence is not found 
  for (let j = 1; !sequenceFound && j < 5; j++){
    for (let k = 0; !sequenceFound && k< liftTypeSequences.length; k++){
      let typeSequence = liftTypeSequences[k];
      for (let h = 0; h < muscleBiasSequence.length; h++){
        sequenceFound = false;
        let biasSequence = muscleBiasSequence[h];

        sequenceFound = sortCheck(1, 1, j, muscleCompounds, muscleCompoundsSorted, typeSequence, biasSequence, addedWorkouts, subBiasIcons[i]);

// reset seqeuence for the next check
        addedWorkouts.clear();
        if (!sequenceFound){
          muscleCompoundsSorted = [];
        }
      }
    }
  }

  if (sequenceFound){
    compoundsSorted.push(muscleCompoundsSorted);
  }
}

// add empty arrays for small muscle groups
for (let i = 0; i < 6; i++){
  compoundsSorted.push([]);
}

return compoundsSorted;
}

function sortIsolations(isolations){
let isolationsSorted = [];
let addedWorkouts = new Set();

for (let i = 0; i < N_MUSCLE_GROUPS; i++){
  let muscleIsolationsSorted = [];
  let muscleBiasSequences = subMuscleSequences[i];
  let muscleIsolations = isolations[i];
  let sequenceFound = false;

// loops makes progressivly easier checks while a sequence is not found
  for (let j = 1; !sequenceFound && j < 3; j++){
    for (let k = 0; k < muscleBiasSequences.length; k++){
      let biasSeq = muscleBiasSequences[k];
      sequenceFound = true;

      sequenceFound = sortCheck(2, 1, j, muscleIsolations, muscleIsolationsSorted, [], biasSeq, addedWorkouts, subBiasIcons[i]);

// reset sequence for the next check 
      addedWorkouts.clear();
      if (!sequenceFound){
        muscleIsolationsSorted = [];
      }
    }

    if (sequenceFound){
      isolationsSorted.push(muscleIsolationsSorted);
    }
  }
}

return isolationsSorted;
}

function sortCheck(sortType, checkNumber, maxCheckNumber, workoutNames, workoutsSorted, typeSeq, biasSeq, addedWorkouts, subBiasIcons){
let sequenceFound = false;

// try to place each workouts of the sequence 
for (let i = workoutsSorted.length; i < 4; i++){
  let workoutFound = false;
  
  for (let j = 0; !workoutFound && j < workoutNames.length; j++){
    let workout = workoutNames[j];

// compounds added in order: matches lift type and bias, matches just lift type, matches just bias, any compound           
    if (sortType === 1 && !addedWorkouts.has(workout)){
      if ((checkNumber === 1 && movementsToLiftType.get(workout) === typeSeq[i] && movementsToBias.has(workout + biasSeq[i])) 
      || (checkNumber === 2 && movementsToLiftType.get(workout) === typeSeq[i]) 
      || (checkNumber === 3 && movementsToBias.has(workout + biasSeq[i])) 
      || checkNumber === 4){
        workoutFound = true;
      }
// isolations added in order: matches bias, any isolation 
    } else if (sortType === 2 && !addedWorkouts.has(workout)){
        if ((checkNumber === 1 && movementsToBias.has(workout + biasSeq[i])) || checkNumber  === 2){
        workoutFound = true;
      }
    }

// place workout with best possible sub bias icon 
    if (workoutFound){
      addedWorkouts.add(workout);
      if (movementsToBias.has(workout + biasSeq[i])){
        workoutsSorted.push(workout + biasSeq[i]);
      } else if (movementsToBias.has(workout + "n")){
        workoutsSorted.push(workout + "n");
      } else {
        let iconFound = false;
        for (let k = 0; !iconFound && k < subBiasIcons.length; k++){
          if (movementsToBias.has(workout + subBiasIcons[k])){
            workoutsSorted.push(workout + subBiasIcons[k]);
            iconFound = true;
          }
        }
      }
    }   
  }

  if (!workoutFound){
    sequenceFound = false;
  }
}

if (workoutsSorted.length === 4 || workoutsSorted.length === workoutNames.length){
  sequenceFound = true;
}

// increment the check number and make recursive call 
checkNumber++;
if (!sequenceFound && checkNumber <=  maxCheckNumber){
  sequenceFound = sortCheck(sortType, checkNumber, maxCheckNumber, workoutNames, workoutsSorted, typeSeq, biasSeq, addedWorkouts, subBiasIcons);
}

return sequenceFound;

}

function setWorkouts(workoutsToSets, compounds, isolations, compoundSeq, isolationSeq, splits, setNums){
let splitsWithSets = [];

for (let i = 0; i < splits.length; i++){
  let daysToWorkouts = [[], [], [], [], [], [], []];
  let daysToSets = [[], [], [], [], [], [], []];
  
  for (let a = 0; a < 2; a++){
// declare varaibles depending on the iteration number 
    let workouts = compoundSeq;
    let setsArray = compounds[i];

    if (a === 1){
      workouts = isolationSeq;
      setsArray = isolations[i];
    }

// find the total number of compounds and isolations and working days
    let setsToPlace = 0;
    for (let j = 0; j < N_MUSCLE_GROUPS; j++){
      let workingDays = [];
      for (let k = 0; k < WEEKDAYS; k++){
        if (setsArray[k][j] > 0){
          workingDays.push(k);
          setsToPlace += setsArray[k][j];
        }
      }
  
      let counter = 0;
      let placedCounters = new Map();
      workingDays.every(entry => placedCounters.set(entry, 0));
      let placedWorkoutsIndex = [];
      let workout = workouts[j][0];
// place sets in groups of 3 until there are none left 
      while (setsToPlace >= 3){

        let index = workingDays[counter % workingDays.length];
                      
        if (setsArray[index][j] >= 3 || setsToPlace === 3){
          workout = workouts[j][placedCounters.get(index) % workouts[j].length];
          daysToWorkouts[index].push(workout);
          daysToSets[index].push(3);

          placedWorkoutsIndex.push([index, daysToWorkouts[index].length - 1]);
          placedCounters.set(index, placedCounters.get(index) + 1);

          setsToPlace -= 3;
          setsArray[index][j] -= 3;
        } 
        counter++;
      }

// add remaining sets to existing workouts by incrementing  
      while (setsToPlace > 0 && placedWorkoutsIndex.length > 0){
        let placedInfo = placedWorkoutsIndex[counter % placedWorkoutsIndex.length];
        let dayIndex = placedInfo[0];
        let posIndex = placedInfo[1];
        
        daysToSets[dayIndex][posIndex]++;
        setsToPlace -= 1;
        counter++;
      }
    }
  }
  workoutsToSets.push(daysToSets);
  splitsWithSets.push(daysToWorkouts);
}
return splitsWithSets;
}

function organizeSets(splits){
let allSplitsOrganized = [];

for (let i = 0; i < splits.length; i++) {
  let splitOrganized = [];

  for (let j = 0; j < splits[i].length; j++) {
    let dayOrganized = [];
    let dayUnorganized = splits[i][j];

// iterate twice for compounds then isolations 
    for (let a = 0; a < 2; a++) {
      let addedCounter = 0;
      for (let k = 0; k < dayUnorganized.length; k++) {
        let workout = dayUnorganized[k];
        let baseWorkout = workout.substring(0, workout.length - 1);

// add compounds first, then isolations 
        if (a === 0 && movementsToLiftType.get(baseWorkout) < 4 || a === 1&& movementsToLiftType.get(baseWorkout) >= 4) {
          if (addedCounter === 0) {
            dayOrganized.push(workout);
          } else {
            let added = false;

// get other workouts of the movements muscle group
            let muscleGroupWorkouts = new Set();
            for (let h = 0; h < allMovements.length; h++) {
              if (allMovements[h].includes(workout)) {
                muscleGroupWorkouts = new Set(allMovements[h]);
              }
            }

// check each isolation to see if different muscle groups can go adjacent
            for (let h = 0; h < dayOrganized.length; h++) {
              let checkedWorkout = dayOrganized[h];

              if (!muscleGroupWorkouts.has(checkedWorkout)) {
                dayOrganized.splice(h + 1, 0, workout);
                added = true;
                addedCounter++;
              }
            }

// if there are no pairs, add the workout at the end
            if (!added) {
              dayOrganized.push(workout);
            }
          }
        }
      }
    }
    splitOrganized.push(dayOrganized);
  }
  allSplitsOrganized.push(splitOrganized);
} 
return workoutsOrganized;
}

function addSupersets(splits, liftsToSets, ssMaps, ssIndexMaps){
for (let i = 0; i < splits.length; i++){
  let split = splits[i];
  let sets = liftsToSets[i];
  let splitSSNames = [];
  let splitSSIndex = [];

  for (let j = 0; j < split.length; j++){
    let currDay = split[j];
    let currSets = sets[j];
    let ssCandidates = getSSCandidates(currDay);
    let ssNames = new Map();
    let ssIndex = new Map();

// create an array of the best possible supersets
    ssCandidates.sort((a, b) => b[2] - a[2]);
    let ssCandidates2 = ssCandidates.filter(entry1 => {
      let index1 = ssCandidates.indexOf(entry1);
  
// add if there are no elements with a lower index and matching workouts 
      return !ssCandidates.some(entry2 =>{
        let index2 = ssCandidates.indexOf(entry2);

        return (index2 < index1 && (entry2[0] === entry1[0] || entry2[1] === entry1[1] || entry2[0] === entry1[1] || entry2[1] === entry1[0]));
      });
    });

// place the remaining candidates into their maps and remove the second lift from the main array 
    ssCandidates2.forEach(ss => {
      ssIndex.set(ss[0], ss[1]);
      ssNames.set(currDay[ss[0]], currDay[ss[1]]); 
      currDay.splice(ss[1], 1);
      currSets.splice(ss[1], 1);
    });

    splitSSNames.push(ssNames);
    splitSSIndex.push(ssIndex);
  }
  ssMaps.push(splitSSNames);
  ssIndexMaps.push(splitSSIndex);
}

function getSSCandidates(day){
  let ssCandidates = [];

  for (let k = 0; k < day.length; k++){
    let lift1 = day[k].substring(0, day[k].length - 1);
    let type1 = movementsToLiftType.get(lift1);
    let group1 = movementsToMuscleGroup.get(lift1);
    let equip1 = movementsToEquipment.get(lift1);
    
    for (let h = 0; type1 > 2 && h < day.length; h++){
      let lift2 = day[h].substring(0, day[h].length - 1);
      let type2 = movementsToLiftType.get(lift2);
      let group2 = movementsToMuscleGroup.get(lift2);
      let equip2 = movementsToEquipment.get(lift2);

      if (type2 > 2 && group1 !== group2){
        let pass = true;

        for (let n = 0; n < 2; n++){
          if (n === 1){
            let tmp = equip1;
            equip1 = equip2;
            equip2 = tmp;
          }

          if ((equip1 === ("barbell") || equip1 === ("machine")) && equip2 !== ("dumbell")) {
            pass = false;
          }
          if (equip1 === ("smith") && equip2 !== ("dumbell") && equip2 !== equip1) {
            pass = false;
          }
          if (equip1.includes("bench") && equip2 !== "dumbell" && equip2 !== "bench dumbell" && equip2 !== equip1) {
            pass = false;
          }
          if (equip1.includes("cable") && equip2 !== "dumbell" && !equip2.includes("cable")) {
            pass = false;
          }
// FIXME: remove this check and find the error 
          if (lift1 === "smith machine shrugs" && lift2 === "cable rear delt fly"){
            pass = false;
          }
          if (lift2 === "smith machine shrugs" && lift1 === "cable rear delt fly"){
            pass = false;
          }
        }

        if (pass){
// add an array of both lifts and their combined lift type for sorting purposes
          let candidate = [k, h, type1 + type2];

          if (!ssCandidates.some(array => array[0] === candidate[0] && array[1] === candidate[1])){
            ssCandidates.push(candidate);
          }
        }
      }
    }
  }
  return ssCandidates;
}
}

function getAllSets(splits, liftsToSets){
let allSets = [];
let i = 0;
splits.forEach(split => {
  let splitAllSets = [];
  let sets = liftsToSets[i];
  let j = 0;

  split.forEach(day => {
    daySets = sets[j];
    dayAllSets = [];
    let k = 0;

    day.forEach(workout =>{
      for (let h = 0; h < daySets[k]; h++){
        dayAllSets.push(workout);
      }

      k++
    })

    splitAllSets.push(dayAllSets);
    j++;
  });

  allSets.push(splitAllSets);
  i++;
});

return allSets;
}

function fitTimeFrame(splits, allSets, RPE, rest, ssMaps, subBias){

for (let i = 0; i < splits.length; i++){
  let split = splits[i];
  let sets = allSets[i];
  let splitRPE = [];
  let splitRest = [];

  for (let j = 0; j < split.length; j++){
    let day = split[j];
    let daySets = sets[j];
    let totalTime = 0; 
    
    let sortedWorkouts = sortDayWorkouts(day, subBias);
    let sortedIndecies = sortDayIndecies(sortedWorkouts, daySets);
    
    let dayRPE = []; let dayRest = [];
    if (sets.length > 0){
      let initRPE; let initRPEIndex;
      switch (experience){
        case 'b': 
          initRPE = 9; initRPEIndex = 2;
          break;
        case 'i': 
          initRPE = 10; initRPEIndex = 3;
          break;
        case 'a': 
          initRPE = 11; initRPEIndex = 4;
          break;
      }

// initialize arrays and estimated time of the lift
      for (let k = 0; k < daySets.length; k++){
        const baseWorkout = daySets[k].substring(0, daySets[k].length - 1);

        const initRest = restTimes[movementsToLiftType.get(baseWorkout) - 1][initRPEIndex];
        dayRPE.push(initRPE);
        dayRest.push(initRest);

// make rest time 30s for final sets if different workout if diff muscle 
        if (k < daySets.length - 1){
          const nextSet = daySets[k + 1].substring(0, daySets[k + 1].length - 1); 

          if (movementsToMuscleGroup.get(baseWorkout) !== movementsToMuscleGroup.get(nextSet)){
            dayRest[k] = .5; 
          }
        }
        
        totalTime += dayRest[k];
        totalTime += (movementsToLiftType.get(baseWorkout) * 10 + 5)/ 60;
      }

      restArrayHolder = Array.from(dayRest);
      RPEArrayHolder = Array.from(dayRPE);
      let setsRemoved = 0;
// reduce RPE and remove sets until the time requirment is met 
      while (totalTime > time && totalTime !== 0){
        dayRPE = Array.from(RPEArrayHolder);
        dayRest = Array.from(restArrayHolder);

        for (let k = 0; k < initRPEIndex && totalTime > time; k++){
          for (let h = 0; h < sortedIndecies.length && totalTime > time; h++){
            const changeIndex = sortedIndecies[h];
            const baseWorkout = daySets[changeIndex].substring(0, daySets[changeIndex].length - 1);

            if (dayRPE[changeIndex] !== 0){
              const totalTimeHolder = totalTime - dayRest[changeIndex];

              dayRPE[changeIndex]--;

// each iteration of outer loop reduces RPE more each time 
              if (dayRest[changeIndex] >= 1){
                  const newRest = restTimes[movementsToLiftType.get(baseWorkout) - 1][initRPEIndex - k];
                  dayRest[changeIndex] = newRest;
              }

              totalTime = totalTimeHolder + dayRest[changeIndex];
            }
          }
        }

// if time is not met, remove a set and restart process 
        if (totalTime > time){
          const removeIndex = sortedIndecies[setsRemoved];
          totalTime -= dayRest[removeIndex];
          dayRPE[removeIndex] = 0;
          dayRest[removeIndex] = 0;
          RPEArrayHolder[removeIndex] = 0; 
          restArrayHolder[removeIndex] = 0;

          setsRemoved++;
        }
      }
    }
    splitRPE.push(dayRPE);
    splitRest.push(dayRest);
  }
  RPE.push(splitRPE);
  rest.push(splitRest);
}

function sortDayWorkouts(dayWorkouts, subBias) {
  let workoutsSorted = [];
  let muscleIndex; let baseWorkout;
  let biasMappings = ["--", "-", "", "+", "++"];

  for (let a = 0; a < 5; a++) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < dayWorkouts.length; j++) {
        const workout = dayWorkouts[j];
        const baseWorkout = workout.substring(0, workout.length - 1);
        const muscleIndex = allMovements.findIndex(set => set.has(baseWorkout));
        const currSubBias = subBias[muscleIndex];

        if (muscleBias[muscleIndex] === biasMappings[a] && shouldAddWorkout(workout, i, currSubBias)) {
          workoutsSorted.push(workout);
        }
      }
    }
  }

  function shouldAddWorkout(workout, i, subBias) {
    const baseWorkout = workout.substring(0, workout.length - 1);
    const biasIndicator = workout.charAt(workout.length - 1);

    let fitsStyle = (style.includes("p") && movementsToLiftType.get(baseWorkout) <= 2 
    || style.includes("b") && movementsToLiftType.get(baseWorkout) >= 4 
    || style === "" && movementsToLiftType.get(baseWorkout) === 3);
    let fitsBias = biasIndicator === subBias.charAt(0);

    switch (i) {
      case 3:
        return fitsBias && fitsStyle;
      case 2:
        return fitsBias && !fitsStyle;
      case 1:
        return !fitsBias && fitsStyle;
      case 0:
        return !fitsBias && !fitsStyle;
      default:
          return false;
    }
  }

  return workoutsSorted;
}

function sortDayIndecies(sortedWorkouts, sets){
  let sortedIndecies = [];
  let addedIndecies = new Set();
  let allChecked = false;

// add the first sets of a workout 
  while (!allChecked){
    const initSize = sortedIndecies.length;

    for (let i = 0; i < sortedWorkouts.length; i++){
      let setFound = false;

      for (let j = 0; !setFound && j < sets.length; j++){
        const currSet = sets[j];
        let nextSet = "";
        if (j + 1 < sets.length){
          nextSet = sets[j + 1];
        }

// add the next set of the workout that hasn't already been added 
        if (!addedIndecies.has(j) && currSet === sortedWorkouts[i] && currSet === nextSet){
          sortedIndecies.push(j);
          addedIndecies.add(j);
          rotateArray(sortedWorkouts, 1);
          setFound = true;
        }
      }
    }

// if the list has not changed, break the loop 
    if (initSize === sortedIndecies.length){
      allChecked = true;
    }
  }

// add the last sets of each workout 
  for (let i = 0; i < sortedWorkouts.length; i++){
    let setFound = false;

    for (let j = 0; !setFound && j < sets.length; j++){
      let currSet = sets[j];

      if (!addedIndecies.has(j) && currSet === sortedWorkouts[i]){
        sortedIndecies.push(j);
        addedIndecies.add(j);
        rotateArray(sortedWorkouts, 1);
        setFound = true;
      }
    }
  }

  return sortedIndecies;
}
}

function getTrueMuscleFreq(allSets, RPE, ssMaps){
let trueSetsPerMuscle = [];
for (let i = 0; i < allSets.length; i++){
  const splitSets = allSets[i];
  const splitRPE = RPE[i];
  const splitSS = ssMaps[i];
  let muscleSetCounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let j = 0; j < splitSets.length; j++){
    const daySets = splitSets[j];
    const dayRPE = splitRPE[j];
    const daySS = splitSS[j];

    for (let h = 0; h < daySets.length; h++){
      if (dayRPE[h] > 0){
        incrementCounter (muscleSetCounter, daySets[h])

        if (daySS.has(daySets[h].substring(0, daySets[h].length - 1))){
          incrementCounter(muscleSetCounter, daySS.value(baseWorkout));
        }
      }
    }
  }   
  trueSetsPerMuscle.push(muscleSetCounter);
}

return trueSetsPerMuscle;

function incrementCounter(muscleCounter, workout){
  const baseWorkout = workout.substring(0, workout.length - 1);

  const muscleIndex = allMovements.findIndex(set => set.has(baseWorkout));

  muscleCounter[muscleIndex]++;
}
}

function getFinalScores(splits, liftsToSets, allSets, RPE, rest, idealMuscleFreq, trueMuscleFreq, allSS, emptySplits){
let splitIndexToScore = new Map();
const idealSetsPerMin = getIdealSetsPerMin();

for (let i = 0; i < splits.length; i++){
  const split = splits[i];
  const setNums = liftsToSets[i];
  const sets = allSets[i];
  const ss = allSS[i];
  const setsPerMuscle = trueMuscleFreq[i]; 
  
  let avgSetsPerMin = 0;
  let setsPerMinDaily = [];
  let idealMusclesPerDay = 5;
  let musclesPerDay = [];
  let musclesPerMinDaily = [];
  
  for (let j = 0; j < split.length; j++){
    const day = split[j];
    const daySetNums = setNums[j];
    const daySets = sets[j];
    const daySS = ss[j];

// record sets per minute daily
    let setsPerMin = daySets.length / time;
    if (daysToLift[j] === "rest"){
      setsPerMin = 0;
    }
    avgSetsPerMin += setsPerMin; 
    setsPerMinDaily.push(setsPerMin);

// record muscles per day 
    let musclesInDay = 0;
    let addedGroups = new Set();
    for (let k = 0; k < day.length; k++){
      const baseWorkout = day[k].substring(0, day[k].length - 1);
      const muscleGroup = movementsToMuscleGroup.get(baseWorkout);

      if (!addedGroups.has(muscleGroup)){
        addedGroups.add(muscleGroup);
        const muscleIndex = muscleGroups.indexOf(muscleGroup);

// big muscle groups are weighted more heavily 
        if (muscleIndex < 3){
          musclesInDay += 2.0;
        } else {
          musclesInDay += 1.0;
        }
      }
    }
    musclesPerDay.push(musclesInDay);
    musclesPerMinDaily.push(musclesInDay / time);
  }
  // FIXME: frequency is 0
  avgSetsPerMin /= frequency;

// calculate average deviations 
  let deviations = [0, 0, 0, 0, 0];
  let deviationWeight = [100, 80, 6, 2, 6];
  for (let j = 0; j < setsPerMinDaily.length; j++){
    deviations[0] += Math.abs(avgSetsPerMin - setsPerMinDaily[j]);
    deviations[1] += Math.abs(idealSetsPerMin - setsPerMinDaily[j]);
    deviations[2] += Math.abs(idealMusclesPerDay - musclesPerDay[j]);
  }
  for (let j = 0; j < N_MUSCLE_GROUPS; j++){
    deviations[3] += Math.abs(setsPerMuscle[j] - idealMuscleFreq[j])
  }
  deviations.forEach(entry => {
    entry /= frequency;
  }); 

  deviations[4] = lowSpacingCounter(emptySplits[i]);

// calculate final score with more weight on diff variables 
  let score = 0;
  for (let j = 0; j < deviations.length; j++){
    score += deviations[j] * deviationWeight[j];
  }

  splitIndexToScore.set(i, score);
}

return splitIndexToScore;

function getIdealSetsPerMin(){
  let RPEIndex = 0;
  let RepRangeIndex = 0;

  if (style.includes("b")) {
      RepRangeIndex = 3;
  } else if (style.includes("p")) {
      RepRangeIndex = 1;
  } else {
      RepRangeIndex = 2;
  }

  if (experience === "a") {
      RPEIndex = 4;
  } else if (experience === "i") {
      RPEIndex = 3;
  } else {
      RPEIndex = 2;
  }

  let restTime = restTimes[RepRangeIndex][RPEIndex];
  let avgReps = (repRange[RepRangeIndex][0] + repRange[RepRangeIndex][1]) / 2;
  let idealSetsPerMin = 3 / (2 * restTime + 0.15 * avgReps + 0.5);

  return idealSetsPerMin;
}

function lowSpacingCounter(schedule){
  let counter = 0;

  for (let i = 0; i < muscleBias.length; i++) {
    let muscleGroup = muscleGroups[i];

    //if (!onlyBiasedGroups || muscleBias[i].includes("+")) {
    let minSpacing = 0;

    if (i < 3) {
        minSpacing = 3;
    } else if (i < 6) {
        minSpacing = 2;
    } else {
        minSpacing = 1;
    }

    for (let j = 0; j < schedule.length; j++) {
      let day = schedule[j];

// increment counter any time a muscle group occurs within the minimum spacing 
      if (day.includes(muscleGroup)) {
        for (let k = 1; k < minSpacing + 1; k++) {
          if ( schedule[(j + k) % 7].includes(muscleGroup) 
          || schedule[(j + 7 - k) % 7].includes(muscleGroup)) {
              counter++;
          }
        }

// increment counter if the previous day may interfere with the current day
        const previousDay = schedule[(j + 6) % 7];
        if (muscleGroup === "back" && (previousDay.includes("rdelt") || previousDay.includes("traps") || previousDay.includes("bis"))){
          counter++;
        } 
        if (muscleGroup === "chest" && (previousDay.includes("fdelt") || previousDay.includes("tris"))){
          counter++
        }
        if (muscleGroup === "legs" && (previousDay.includes("calves"))){
          counter++
        }

      }
    }
  }

return counter;
}
}

function finalSort(splitScores, splitsToPresets){
// sort the values of the map into an array      
let indeciesSorted = [];

for (let i = 0; i < splitScores.size; i++){
  indeciesSorted.push(i);
}

indeciesSorted.sort((index1, index2) => {
  const value1 = splitScores.get(index1);
  const value2 = splitScores.get(index2);

  return value1 - value2;
});

// place 3 of the prefered presets at the front 
if (splitPreference !== "n"){
  let placedCounter = 0;
  let movedIndecies = []; 
  for (let i = 0; placedCounter < 3 && i < indeciesSorted.length; i++){
    console.log(splitsToPresets[indeciesSorted[i]]);
    console.log(splitPreference);
    if (splitsToPresets[indeciesSorted[i]].includes(splitPreference)){
      movedIndecies.push(i);
      placedCounter++;
    }
  }

  for (let i = movedIndecies.length - 1; i >= 0; i--){
    indeciesSorted.unshift(indeciesSorted.splice(movedIndecies[i], 1)[0]);
  }
} 

return indeciesSorted;
}

function showResultText(splits, setNums, allSets, RPE, rest, ss, indeciesSorted){
for (let i = indeciesSorted.length - 1; i >= 0 ; i--){
  const index = indeciesSorted[i];
  const split = splits[index];
  const splitSetNums = setNums[index];
  const splitAllSets = allSets[index];
  const splitRPE = RPE[index];
  const splitRest = rest[index];
  const splitSS = ss[index];

  console.log("<<<<<<<<<<<<<< NEW SPLIT >>>>>>>>>>>>>>>>");
  console.log(split);
  console.log();

  for (let j = 0; j < WEEKDAYS; j++){
    const day = split[j];
    const daySetNums = splitSetNums[j];
    const dayAllSets = splitAllSets[j];
    const dayRPE = splitRPE[j];
    const dayRest = splitRest[j];
    const daySS = splitSS[j];

    let totIndex = 0; 
    console.log("   DAY " + (j + 1));
    for (let k = 0; k < day.length; k++){
      const baseWorkout = day[k].substring(0, day[k].length - 1);
      const liftType = movementsToLiftType.get(baseWorkout);
      console.log(k + ") " + baseWorkout);
      console.log("  reps: " + repRange[liftType - 1]);
      for (let h = 0; h < daySetNums[k]; h++){
        console.log("Set " + (h + 1) + " | RPE: " + dayRPE[totIndex] + " | rest: " + dayRest[totIndex]);
        totIndex++;
      }
      if (daySS.has(baseWorkout)){
        console.log("superset: " + daySS.get(baseWorkout));
      }
    }
    console.log("----------------");
  }
}
}

function displayOutput(splits, setNums, allSets, RPE, rest, ss, indeciesSorted, emptySplits, splitsToPresets){
const movementsToImage =  new Map([
  ["barbell bench press", "bench-press.jpg"], ["dumbell bench press", "dumbell-press.png"], ["weighted dips", "dips.png"],
  ["smith machine bench press", "bench-press.jpg"], ["machine chest press", "machine-chest-press.png"], ["standing cable fly", "cable.png"], ["seated pec-dec", "pec-dec.png"],
  ["barbell row", "barbell-deadlift.png"], ["weighted pull-ups", "pull-ups.png"], ["lat pull down", "lat-pulldown.png"], ["tbar row", "tbar-row.png"],
  ["foot supported cable row", "seated-row.png"], ["chest supported machine row", "seated-row.png"], ["lat pull over", "lat-pullover.png"], ["kneeling single arm row", "cable.png"],
  ["dumbell row", "dumbell-row.png"], ["barbell squat", "barbell-squat.png"], ["hack squat", "hack-squat.jpg"], ["bulgarian split squat", "bulgarian-split-squat.jpg"],
  ["leg press", "leg-press.png"], ["smith machine squat", "barbell-squat.png"], ["leg extension", "leg-extension.png"], ["smith machine reverse lunge", "calf-raise.png"],
  ["barbell deadlift", "barbell-deadlift.png"], ["barbell romanian deadlift", "barbell-deadlift.png"], ["dumbell romanian deadlift", "barbell-deadlift.png"],
  ["smith machine bulgarian split squat", "bulgarian-split-squat.jpg"], ["seated leg curl", "leg-extension.png"], ["lying leg curl", "lying-leg-curl.png"],
  ["standing mililtary press", "military-press.png"], ["seated dumbell overhead press", "dumbell-overhead-press.png"], ["seated smith machine overhead press", "military-press.png"],
  ["machine overhead press", "machine-shoulder-press.png"], ["cable front raise", "cable.png"], ["dumbell front raise", "dumbell-curl.png"],
  ["alternating dumbell curl", "dumbell-curl.png"], ["incline dumbell curl", "incline-curl.png"], ["preacher curl", "preacher-curl.png"],
  ["isometric dumbell preacher curl", "preacher-curl.png"], ["isometric concentration curl", "concentration-curl.png"], ["cable curl", "barbell-curl.png"], ["barbell curl", "barbell-curl.png"],
  ["skullcrusher", "dumbell-press.png"], ["tricep pushdown", "lat-pullover.png"], ["overhead cable tricep extension", "cable.png"],
  ["cross body tricep extension", "cable.png"], ["dumbell lateral raise", "lateral-raise.png"], ["egyptian lateral raise", "lateral-raise"],
  ["decline lateral raise", "lateral-raise.png"], ["machine lateral raise", "lateral-raise.png"], ["cable lateral raise", "lateral-raise.png"],
  ["egyptian cable lateral raise", "lateral-raise.png"], ["rope face pulls", "cable.png"], ["reverse pec dec", "pec-dec.png"],
  ["dumbell rear delt fly", "dumbell-row.png"], ["cable rear delt fly", "cable-rear-delt-fly.png"], ["barbell shrugs", "shrugs.jpg"],
  ["dumbell shrugs", "shrugs.jpg"], ["isometric cable shrugs", "shrugs.jpg"], ["smith machine shrugs", "shrugs.jpg"],
  ["smith machine calf raise", "calf-raise.png"], ["machine calf raise", "seated-calf-raise.png"], ["dumbell calf raise", "calf-raise.png"], ["barbell calf raise", "calf-raise.png"]
]);

let titles = getTitles(splitsToPresets, indeciesSorted);

let htmlText = '<html><head><Title>Outputs</Title><link rel="stylesheet" href="styles/inputs.css"><link rel="stylesheet" href="styles/outputs.css"></head><body>';

for (let i = 0; i < 6 && i < indeciesSorted.length; i++){
  const index = indeciesSorted[i];
  const split = splits[index];
  const splitSetNums = setNums[index];
  const splitAllSets = allSets[index];
  const splitRPE = RPE[index];
  const splitRest = rest[index];
  const splitSS = ss[index];

  htmlText += '<div class = "split-container">';
  htmlText += '<div class="split-title">';
  htmlText += titles[i];
  htmlText += '</div>';
  for (let j = 0; j < WEEKDAYS; j++){
    const day = split[j];
    const daySetNums = splitSetNums[j];
    const dayAllSets = splitAllSets[j];
    const dayRPE = splitRPE[j];
    const dayRest = splitRest[j];
    const daySS = splitSS[j];

    htmlText += '<div class="weekday-container">';
    htmlText += (weekdaysArray[j] + ": " + emptySplits[index][j]); 

    let totIndex = 0; 
    for (let k = 0; k < day.length; k++){
      const baseWorkout = day[k].substring(0, day[k].length - 1);
      const liftType = movementsToLiftType.get(baseWorkout);

      htmlText += '<div class="workouts-container">';
      htmlText += '<div class="movement-container">';
      htmlText += baseWorkout; 
      htmlText += ("  |  " + repRange[liftType - 1][0] + "-" + repRange[liftType - 1][1] + " reps");
      htmlText += '<div class="sets-grid">';
      htmlText += '<div class="sets-grid-header">Set</div>';
      htmlText += '<div class="sets-grid-header">RPE</div>';
      htmlText += '<div class="sets-grid-header">rest</div>';

      for (let h = 0; h < daySetNums[k]; h++){
        htmlText += '<div class="sets-grid-element">';
        htmlText += (h + 1);
        htmlText += '</div>';

        htmlText += '<div class="sets-grid-element">';
        htmlText += dayRPE[totIndex];
        htmlText += '</div>';
        
        htmlText += '<div class="sets-grid-element">';
        htmlText += dayRest[totIndex];
        htmlText += '</div>';
        totIndex++;
      }
      htmlText += '</div>';
      htmlText += '</div>';

      htmlText += '<div class="image-container">';
      
      htmlText += '<img class="image" src="styles\\images\\lift-images\\'
      htmlText += movementsToImage.get(baseWorkout);
      htmlText += '">';

      htmlText += '</div>';
      htmlText += '</div>';
    }

    htmlText += '</div>';
  }
  htmlText += "</div>";
}

htmlText += "</bod";
htmlText += "y></";
htmlText+= "html>";

document.documentElement.innerHTML = htmlText;

function getTitles(presets, indecies){
  let titles = []; 
  for (let i = 0; i < presets.length; i++){
    const preset = presets[indecies[i]];
    let title = "";
    let counter = 0; 

    for (let j = 0; j < preset.length; j++){
      if (preset[j] === 'p' && !title.includes("PPL")){
        if (counter > 0){
          title += " / ";
        }
        title += "PPL ";
      }
      if (preset[j] === 'b' && !title.includes("Bro")){
        if (counter > 0){
          title += " / ";
        }
        title += "Bro ";
      }
      if (preset[j] === 'a' && !title.includes("Arnold")){
        if (counter > 0){
          title += " / ";
        }
        title += "Arnold ";
      }
    }
    const duplicates = titles.filter(entry => entry.includes(title));

    title += (duplicates.length + 1);

    titles.push(title);
  }

  return titles;
}
}