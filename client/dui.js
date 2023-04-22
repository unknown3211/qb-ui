let duiCounter = 0;
let availableDuis = {};
let duis = {};

function getDui(url, width, height) {
  width = width || 512;
  height = height || 512;

  let duiSize = `${width}x${height}`;

  if (availableDuis[duiSize] && availableDuis[duiSize].length > 0) {
    let id = availableDuis[duiSize].shift();
    let dictionary = duis[id].textureDictName;
    let texture = duis[id].textureName;

    SetDuiUrl(duis[id].duiObject, url);

    return { id: id, dictionary: dictionary, texture: texture };
  }

  duiCounter++;
  let generatedDictName = `${duiSize}-dict-${duiCounter}`;
  let generatedTxtName = `${duiSize}-txt-${duiCounter}`;
  let duiObject = CreateDui(url, width, height);
  let dictObject = CreateRuntimeTxd(generatedDictName);
  let duiHandle = GetDuiHandle(duiObject);
  let txdObject = CreateRuntimeTextureFromDuiHandle(dictObject, generatedTxtName, duiHandle);

  duis[duiCounter] = {
    duiSize: duiSize,
    duiObject: duiObject,
    duiHandle: duiHandle,
    dictionaryObject: dictObject,
    textureObject: txdObject,
    textureDictName: generatedDictName,
    textureName: generatedTxtName,
  };

  return { id: duiCounter, dictionary: generatedDictName, texture: generatedTxtName };
}

function changeDuiUrl(id, url) {
  if (!duis[id]) {
    return;
  }

  let settings = duis[id];
  SetDuiUrl(settings.duiObject, url);
}

function releaseDui(id) {
  if (!duis[id]) {
    return;
  }

  let settings = duis[id];
  let duiSize = settings.duiSize;

  SetDuiUrl(settings.duiObject, 'about:blank');
  if (!availableDuis[duiSize]) {
    availableDuis[duiSize] = [];
  }
  availableDuis[duiSize].push(id);
}

exports('getDui', getDui);
exports('changeDuiUrl', changeDuiUrl);
exports('releaseDui', releaseDui);
