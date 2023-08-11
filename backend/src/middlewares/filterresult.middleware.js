import express from 'express';
/* interface customResponse extends Response {
    filteredResults: object;
} */

const filteredResults = (Model, populateField, populateSelectField) => async (req, res, next) =>  {
    //console.log(Model);
        const filter = req.query;
        const queryObj = {...filter};
        //const ssssssdsf: Array<String> = [...filter]; 
        //console.log( filter, queryObj, 'file lists' );
        const removeFilters = ['select', 'sort', 'limit', 'page'];
        for(let filters of removeFilters){
            //console.log(filters);
            delete queryObj[filters];
        }
        //console.log(queryObj);    
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|neq|regex)\b/ig, match => `$${match}`);
        //console.log(JSON.parse(queryStr));
        let query = JSON.parse(queryStr);
        let queryData = Model.find(query);
        //console.log(filter.select);
        if(filter.select){
            const selectData = filter.select;
            const selectFields = selectData.replaceAll("," ," ");
            queryData.select(selectFields);
            
        }
        //console.log(filter.sort);
        if(filter.sort){
            let sorts = filter.sort;
            const sortFields = sorts.replaceAll(",", " ");
            queryData.sort(sortFields);
           //console.log(sortFields);
        } else {
            queryData.sort('-createdAt');
        }

        const total = await Model.countDocuments(query);

        const page = Number(filter.page) || 1;
        const limit = Number(filter.limit) || 2;
        const skipData = (page - 1) * limit;

        const endIndex = page * limit;

        queryData = queryData.skip(skipData).limit(limit);
        if(populateField && populateSelectField){
            queryData.populate(populateField, populateSelectField) 
        }
           
        const pagination = {};

        if(endIndex < total){
            pagination.next = {
                page: page+1,
                limit
            }
        }        
        
        if(skipData > 0){
            pagination.prev = {
                page: page-1,
                limit
            }
        }

        const models = await queryData;
        //console.log(models);

        if(models.length > 0){
            res.filteredResults = {
                status: true,
                data: models,
                pagination,
                total
            }

        } else {
            return res.status(400).json({
                status: false,
                message: `No ${Model.collection.collectionName} found.`
            })
        }
        next();
}

export default filteredResults;