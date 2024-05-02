const extractCityNames = (areas) => {
    let cityNames = [];
    const traverse = (areas) => {
        for (let area of areas) {
            if (area.areas.length === 0) {
                cityNames.push(area.name);
            } else {
                traverse(area.areas);
            }
        }
    };

    traverse(areas);
    return cityNames;
};

export default extractCityNames;
