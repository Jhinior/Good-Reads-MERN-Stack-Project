module.exports = async function idGenerator(model){
    const lastModel = await model.findOne().sort({ id: -1 })
    const lastId = lastModel ? lastModel.id : 0;  
    const newId = lastId + 1;
    return newId;
}