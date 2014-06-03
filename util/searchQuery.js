var queryBit = 'HIV'
var query = 'MATCH n-[r]-x WHERE n.name=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n-[r]-x WHERE n.fullname=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n-[r]-x WHERE n.contractphone=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n-[r]-x WHERE n.mission=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n-[r]-x WHERE n.contractname=~{qString} RETURN n, labels(n), count(r) as relCount skip {skipnum} limit {retNum}' +
        'union all '+
        'MATCH n-[r]-x WHERE n.shortName=~{qString} RETURN n, labels(n), count(r) as relCount  skip {skipnum} limit {retNum}' +
        //'union all '+
        //'MATCH n-[r]-x WHERE n.purpose=~{qString} RETURN n, labels(n), count(r) as relCount order by n.name skip {skipnum} limit {retNum}' +
        //'union all '+
        //'MATCH n-[r]-x WHERE n.description=~{qString} RETURN n, labels(n), count(r) as relCount order by n.name skip {skipnum} limit {retNum}' +
        'union all '+
        'MATCH n WHERE n.name=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.fullname=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.contractphone=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.mission=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}'+
        'union all '+
        'MATCH n WHERE n.contractname=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}' +
        'union all '+
        'MATCH n WHERE n.shortName=~{qString} RETURN n, labels(n), 0 as relCount  skip {skipnum} limit {retNum}' 
        //+
        //'union all '+
        //'MATCH n WHERE n.purpose=~{qString} RETURN n, labels(n), 0 as relCount order by n.name skip {skipnum} limit {retNum}' +
        //'union all '+
        //'MATCH n WHERE n.description=~{qString} RETURN n, labels(n), 0 as relCount order by n.name skip {skipnum} limit {retNum}' 
    var params = {
        qString: '\'(?i).*' + queryBit + '.*\'',
        skipnum: 0,
        retNum: 500
    };
    function replaceAll(find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
        }
    
    query = replaceAll('{qString}', params.qString, query);
        query = replaceAll('{skipnum}', params.skipnum, query);
        query = replaceAll('{retNum}', params.retNum, query);

    console.log(query);