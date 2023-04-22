const mapToJson = (map) => {
    return JSON.stringify([...map].map(([key, val]) =>
      [key, typeof val === 'object' ? mapToJson(val) : val]
    ));
  }
  
const jsonToMap = (jsonStr) => {
    return new Map(JSON.parse(jsonStr, (key, value) => {
        if (typeof value === 'object' && value !== null) {
        return new Map(value);
        }
        return value;
    }));
}
  

module.exports.jsonToMap = jsonToMap;
module.exports.mapToJson = mapToJson;